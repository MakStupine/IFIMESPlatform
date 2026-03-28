import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ITEMS_PER_PAGE = 6;
const API_BASE = import.meta.env.VITE_ADMIN_API_URL || "http://localhost:5150";

interface Article {
  id: number;
  slug: string;
  category: string;
  author: string;
  publishDate: string;
  status: string;
  featuredImage: string | null;
  images: string[];
  title_en: string;
  content_en: string;
  title_bs: string;
  content_bs: string;
  title_sl: string;
  content_sl: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function ResearchPage() {
  const { t, i18n } = useTranslation();
  const [location] = useLocation();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const initialQuery = urlSearchParams.get("query") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [inputTerm, setInputTerm] = useState(initialQuery);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/articles/research`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch research articles.");
        return res.json();
      })
      .then((data) => {
        const sorted = data.sort(
          (a: Article, b: Article) =>
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
        );
        setArticles(sorted);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch research articles:", err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location, currentPage]);

  const getLocalizedField = (item: any, field: "title" | "content") => {
    const lang = i18n.language;
    return item[`${field}_${lang}`] || item[`${field}_en`] || "";
  };

  const getImageUrl = (image: string | null): string => {
    if (!image) return "/fallback.jpg";
    if (image.startsWith("data:image")) return image;
    if (image.startsWith("http")) return image;
    return `${import.meta.env.VITE_ADMIN_API_URL}/uploads/${image}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLoading(true);
      setTimeout(() => {
        setSearchTerm(inputTerm);
        setLoading(false);
      }, 300);
    }
  };

  const filteredArticles = articles.filter((item) =>
    getLocalizedField(item, "title")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-32 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            className="text-3xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {t("research.title")}
          </motion.h1>

          {/* 🔍 Search Bar */}
          <motion.div
            className="mb-8 relative"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <input
              type="text"
              value={inputTerm}
              onChange={(e) => setInputTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                i18n.language === "bs"
                  ? "Traži"
                  : i18n.language === "sl"
                  ? "Iskanje"
                  : "Search"
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="animate-spin h-5 w-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
              </div>
            )}
          </motion.div>

          {/* 📄 Articles */}
          <motion.div
            className="space-y-10 min-h-[900px]" // Ensures space even for short lists
            key={i18n.language}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {currentArticles.map((item) => (
              <Link
                key={item.slug}
                to={`/research/${item.slug}`}
                className="block"
              >
                <motion.div
                  className="bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-shadow duration-200 min-h-[280px]"
                  variants={fadeInUp}
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/3 h-full">
                      <img
                        src={getImageUrl(item.featuredImage)}
                        alt={getLocalizedField(item, "title")}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/fallback.jpg";
                        }}
                      />
                    </div>
                    <div className="md:w-2/3 p-6 flex flex-col justify-between min-h-[240px]">
                      <div>
                        <span className="text-sm text-primary-600 font-semibold">
                          {new Date(item.publishDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </span>
                        <h2 className="text-xl font-bold text-gray-900 mt-2">
                          {getLocalizedField(item, "title")}
                        </h2>
                        <p className="text-gray-600 mt-2 line-clamp-3 leading-relaxed text-base">
                          {getLocalizedField(item, "content")}
                        </p>
                      </div>
                      <span className="text-primary-600 font-medium mt-4 inline-block">
                        {t("research.readMore")} →
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}

            {currentArticles.length === 0 && (
              <p className="text-gray-500 text-center">
                {t("research.noResults") || "No articles found."}
              </p>
            )}
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center mt-10 pb-20 gap-6 text-sm font-medium text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("research.prev")}
              </button>

              <span className="text-base text-gray-700 font-semibold">
                {t("research.page")} {currentPage} {t("research.of")}{" "}
                {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("research.next")}
              </button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

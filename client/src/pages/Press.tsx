import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useTranslation } from "react-i18next";
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

export default function PressPage() {
  const { t, i18n } = useTranslation();
  const [location] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputTerm, setInputTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/articles/press`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch press articles.");
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
        console.error("❌ Failed to fetch press articles:", err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location, currentPage]);

  const getLocalized = (item: Article) => {
    switch (i18n.language) {
      case "bs":
        return { title: item.title_bs, content: item.content_bs };
      case "sl":
        return { title: item.title_sl, content: item.content_sl };
      default:
        return { title: item.title_en, content: item.content_en };
    }
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
    getLocalized(item).title.toLowerCase().includes(searchTerm.toLowerCase())
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

  const placeholderText =
    i18n.language === "bs"
      ? "Traži"
      : i18n.language === "sl"
      ? "Iskanje"
      : "Search";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-32 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t("press.title")}
          </h1>

          {/* 🔍 Search Bar */}
          <div className="mb-8 relative">
            <input
              type="text"
              value={inputTerm}
              onChange={(e) => setInputTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholderText}
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
          </div>

          {/* 📰 Articles List */}
          <div className="space-y-10 min-h-[900px]">
            {currentArticles.map((item) => {
              const { title, content } = getLocalized(item);

              return (
                <Link
                  key={item.slug}
                  to={`/press/${item.slug}`}
                  className="block"
                >
                  <div className="bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-shadow duration-200 min-h-[280px]">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-1/3 h-full">
                        <img
                          src={getImageUrl(item.featuredImage)}
                          alt={title}
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
                            {title}
                          </h2>
                          <p className="text-gray-600 mt-2 line-clamp-3 leading-relaxed text-base">
                            {content}
                          </p>
                        </div>
                        <span className="text-primary-600 font-medium mt-4 inline-block">
                          {t("press.readMore")} →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {currentArticles.length === 0 && (
              <p className="text-gray-500 text-center">
                {t("press.noResults") || "No articles found."}
              </p>
            )}
          </div>

          {/* 📄 Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 pb-20 gap-6 text-sm font-medium text-gray-600">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("press.prev")}
              </button>

              <span className="text-base text-gray-700 font-semibold">
                {t("press.page")} {currentPage} {t("press.of")} {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("press.next")}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

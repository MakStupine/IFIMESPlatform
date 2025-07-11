import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useTranslation } from "react-i18next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaViber,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_ADMIN_API_URL || "http://localhost:5150";

interface Article {
  id: number;
  slug: string;
  author?: string;
  publishDate: string;
  createdAt: string;
  featuredImage: string | null;
  title_en: string;
  content_en: string;
  title_bs: string;
  content_bs: string;
  title_sl: string;
  content_sl: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function TitleDescNewsletter() {
  const [, params] = useRoute("/:category/:slug");
  const { category, slug } = params || {};
  const { t, i18n } = useTranslation();

  const [article, setArticle] = useState<Article | null>(null);
  const [latestResearch, setLatestResearch] = useState<Article[]>([]);
  const [latestPress, setLatestPress] = useState<Article[]>([]);
  const [shareCounts, setShareCounts] = useState<Record<string, number>>({});

  const getImageUrl = (image: string | null): string => {
    if (!image) return "/fallback.jpg";
    if (image.startsWith("data:image")) return image;
    if (image.startsWith("http")) return image;
    return `${API_BASE}/uploads/${image}`;
  };

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!slug || !category) return;

    const dbTableName = category === "events" ? "event" : category;

    fetch(`${API_BASE}/api/articles/${dbTableName}`)
      .then((res) => res.json())
      .then((data) => {
        const match = data.find((item: any) => item.slug === slug);
        if (match) {
          setArticle({
            ...match,
            createdAt: match.createdAt ?? match.created_at ?? "",
          });
        }
      });

    fetch(`${API_BASE}/api/share/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        const counts: Record<string, number> = {};
        data.forEach((entry: any) => {
          counts[entry.platform] = entry.count;
        });
        setShareCounts(counts);
      });
  }, [category, slug]);

  useEffect(() => {
    fetch(`${API_BASE}/api/articles/research`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setLatestResearch(sorted.slice(0, 5));
      });

    fetch(`${API_BASE}/api/articles/press`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setLatestPress(sorted.slice(0, 5));
      });
  }, []);

  const handleShareClick = (platform: string, url: string) => {
    setShareCounts((prev) => ({
      ...prev,
      [platform]: (prev[platform] || 0) + 1,
    }));

    fetch(`${API_BASE}/api/share`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, platform }),
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!article) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mt-32 py-24 px-4 sm:px-10 lg:px-16 bg-white">
          <div className="text-center text-gray-600">
            {t("article.loading")}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { title, content } = getLocalized(article);
  const totalShares = Object.values(shareCounts).reduce(
    (acc, val) => acc + val,
    0
  );
  const currentUrl = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-32 py-24 px-4 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            className="hidden lg:flex lg:col-span-1 flex-col items-center text-sm text-gray-500 sticky top-32 gap-6"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center gap-2"
            >
              {article.author && (
                <div className="text-center font-semibold text-gray-700">
                  {article.author}
                </div>
              )}
              <div>
                <div>
                  {article.createdAt &&
                    new Date(
                      article.createdAt.replace(" ", "T")
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-lg font-bold text-black">
                  {totalShares}
                </div>
                <div className="uppercase text-xs tracking-wide">
                  {t("article.totalShares")}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4 items-center text-xl"
              variants={stagger}
            >
              {["facebook", "twitter", "email", "viber", "whatsapp"].map(
                (platform, idx) => {
                  const icons = [
                    <FaFacebookF />,
                    <FaTwitter />,
                    <FaEnvelope />,
                    <FaViber />,
                    <FaWhatsapp />,
                  ];
                  const colors = [
                    "text-blue-600 hover:text-blue-800",
                    "text-sky-500 hover:text-sky-700",
                    "text-gray-600 hover:text-gray-800",
                    "text-purple-600 hover:text-purple-800",
                    "text-green-600 hover:text-green-800",
                  ];
                  const urls = [
                    `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
                    `https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodedTitle}`,
                    `mailto:?subject=${encodedTitle}&body=${currentUrl}`,
                    `viber://forward?text=${encodedTitle}%20${currentUrl}`,
                    `https://wa.me/?text=${encodedTitle}%20${currentUrl}`,
                  ];

                  return (
                    <motion.button
                      key={platform}
                      onClick={() => handleShareClick(platform, urls[idx])}
                      className={colors[idx]}
                      variants={fadeIn}
                    >
                      {icons[idx]}
                    </motion.button>
                  );
                }
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
              {title}
            </h1>
            <motion.img
              src={getImageUrl(article.featuredImage)}
              alt={title}
              className="w-full h-[400px] object-cover rounded-lg shadow-md mb-10"
              onError={(e) => {
                e.currentTarget.src = "/fallback.jpg";
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.article
              className="text-gray-700 text-lg leading-relaxed space-y-6"
              variants={fadeIn}
            >
              <p>{content}</p>
            </motion.article>
          </motion.div>

          <motion.div
            className="lg:col-span-4 space-y-8"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {[
              {
                title: t("article.latestResearch"),
                data: latestResearch,
                path: "research",
              },
              {
                title: t("article.latestPress"),
                data: latestPress,
                path: "press",
              },
            ].map((section) => (
              <motion.div
                key={section.title}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm"
                variants={slideInRight}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  {section.title}
                </h2>
                <motion.ul className="space-y-4" variants={stagger}>
                  {section.data.map((item) => {
                    const { title } = getLocalized(item);
                    return (
                      <motion.li
                        key={item.id}
                        className="flex items-start gap-4"
                        variants={fadeIn}
                        whileHover={{ scale: 1.02 }}
                      >
                        <img
                          src={getImageUrl(item.featuredImage)}
                          alt={title}
                          className="w-16 h-16 object-cover rounded-md border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = "/fallback.jpg";
                          }}
                        />
                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            {item.createdAt &&
                              new Date(
                                item.createdAt.replace(" ", "T")
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                          </div>
                          <a
                            href={`/${section.path}/${item.slug}`}
                            className="text-sm font-semibold text-blue-900 hover:underline"
                          >
                            {title}
                          </a>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

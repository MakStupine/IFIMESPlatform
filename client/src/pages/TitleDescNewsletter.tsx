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
import { ARTICLE_PLACEHOLDER } from "@/lib/placeholder";

const API_BASE = import.meta.env.VITE_ADMIN_API_URL || "";

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

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr.replace(" ", "T"));
  if (isNaN(d.getTime())) return "";
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
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
    if (!image) return ARTICLE_PLACEHOLDER;
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

    // Fire ALL requests in parallel — article, shares, sidebar research, sidebar press
    const articleReq = fetch(`${API_BASE}/api/articles/${dbTableName}/by-slug/${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .catch(() =>
        // Fallback: search in paginated list
        fetch(`${API_BASE}/api/articles/${dbTableName}?page=1&limit=50`)
          .then((res) => res.json())
          .then((data) => {
            const list = Array.isArray(data) ? data : (data.articles || []);
            return list.find((item: any) => item.slug === slug || item.slug?.startsWith(slug)) || null;
          })
      );

    const sharesReq = fetch(`${API_BASE}/api/share/${slug}`)
      .then((res) => res.json())
      .catch(() => []);

    const researchReq = fetch(`${API_BASE}/api/articles/research?page=1&limit=5`)
      .then((res) => res.json())
      .catch(() => []);

    const pressReq = fetch(`${API_BASE}/api/articles/press?page=1&limit=5`)
      .then((res) => res.json())
      .catch(() => []);

    Promise.all([articleReq, sharesReq, researchReq, pressReq]).then(
      ([articleData, sharesData, researchData, pressData]) => {
        if (articleData) {
          setArticle({
            ...articleData,
            createdAt: articleData.createdAt ?? articleData.created_at ?? "",
          });
        }

        const counts: Record<string, number> = {};
        (Array.isArray(sharesData) ? sharesData : []).forEach((entry: any) => {
          counts[entry.platform] = entry.count;
        });
        setShareCounts(counts);

        const rArticles = Array.isArray(researchData) ? researchData.slice(0, 5) : (researchData.articles || []);
        setLatestResearch(rArticles);

        const pArticles = Array.isArray(pressData) ? pressData.slice(0, 5) : (pressData.articles || []);
        setLatestPress(pArticles);
      }
    );
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
            className="hidden lg:flex lg:col-span-1 flex-col items-center sticky top-32 gap-5"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Author & Date */}
            <motion.div variants={fadeIn} className="flex flex-col items-center gap-1.5 text-center">
              {article.author && (
                <span className="text-xs font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
                  {article.author}
                </span>
              )}
              {article.publishDate && (
                <span className="text-xs text-gray-400">
                  {formatDate(article.publishDate)}
                </span>
              )}
            </motion.div>

            {/* Divider */}
            <div className="w-8 h-px bg-gray-200" />

            {/* Share Count */}
            <motion.div variants={fadeIn} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900">{totalShares}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">shares</span>
            </motion.div>

            {/* Divider */}
            <div className="w-8 h-px bg-gray-200" />

            {/* Share Buttons */}
            <motion.div className="flex flex-col gap-2.5 items-center" variants={stagger}>
              {["facebook", "twitter", "email", "viber", "whatsapp"].map(
                (platform, idx) => {
                  const icons = [
                    <FaFacebookF />,
                    <FaTwitter />,
                    <FaEnvelope />,
                    <FaViber />,
                    <FaWhatsapp />,
                  ];
                  const bgColors = [
                    "bg-blue-50 text-blue-600 hover:bg-blue-100",
                    "bg-sky-50 text-sky-500 hover:bg-sky-100",
                    "bg-gray-50 text-gray-500 hover:bg-gray-100",
                    "bg-purple-50 text-purple-600 hover:bg-purple-100",
                    "bg-green-50 text-green-600 hover:bg-green-100",
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
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors ${bgColors[idx]}`}
                      variants={fadeIn}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
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
                e.currentTarget.src = ARTICLE_PLACEHOLDER;
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.article
              className="text-gray-700 text-lg leading-relaxed space-y-6 prose prose-lg max-w-none"
              variants={fadeIn}
              dangerouslySetInnerHTML={{ __html: content }}
            />
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
                <motion.ul className="space-y-4" variants={stagger} initial="hidden" animate="visible">
                  {section.data.map((item) => {
                    const { title } = getLocalized(item);
                    return (
                      <motion.li
                        key={item.id}
                        className="flex items-center gap-3 h-[72px]"
                        variants={fadeIn}
                        whileHover={{ scale: 1.02 }}
                      >
                        <img
                          src={getImageUrl(item.featuredImage)}
                          alt={title}
                          className="w-14 h-14 object-cover rounded-md border border-gray-200 flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = ARTICLE_PLACEHOLDER;
                          }}
                        />
                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            {(item.publishDate || item.createdAt) &&
                              (() => {
                                const raw = item.publishDate || item.createdAt || "";
                                return formatDate(raw);
                              })()}
                          </div>
                          <a
                            href={`/${section.path}/${item.slug}`}
                            className="text-sm font-semibold text-blue-900 hover:underline line-clamp-2"
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

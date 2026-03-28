import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";
import {
  Newspaper,
  Video,
  Radio,
  Mail,
  ArrowRight,
  Calendar,
  ExternalLink,
  Play,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

interface Article {
  id: number;
  slug: string;
  category: string;
  title_en: string;
  title_bs: string;
  title_sl: string;
  content_en: string;
  publishDate: string;
  featuredImage: string | null;
}

export default function MediaPage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<"press" | "news" | "video">("press");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch press releases
  const { data: pressReleases } = useQuery<Article[]>({
    queryKey: ["press-releases"],
    queryFn: async () => {
      const response = await fetch("/api/articles/press");
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
  });

  // Fetch news/media articles
  const { data: newsArticles } = useQuery<Article[]>({
    queryKey: ["news-articles"],
    queryFn: async () => {
      const response = await fetch("/api/articles/media");
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
  });

  const getLocalizedTitle = (article: Article) => {
    const lang = i18n.language;
    if (lang === "bs") return article.title_bs || article.title_en;
    if (lang === "sl") return article.title_sl || article.title_en;
    return article.title_en;
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/Ifimes/",
      color: "bg-blue-600 hover:bg-blue-700",
      followers: "12K+",
    },
    {
      name: "Twitter / X",
      icon: Twitter,
      href: "https://x.com/ifimes",
      color: "bg-gray-900 hover:bg-black",
      followers: "8K+",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ifimes-institute-232694138",
      color: "bg-blue-700 hover:bg-blue-800",
      followers: "5K+",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://www.youtube.com/user/Ifimes",
      color: "bg-red-600 hover:bg-red-700",
      followers: "3K+",
    },
  ];

  const featuredVideos = [
    {
      id: 1,
      title: "IFIMES International Conference 2024",
      embedId: "_y6wyFaQTC0",
      date: "2024-10-15",
    },
    {
      id: 2,
      title: "Balkans Security Summit",
      embedId: "_y6wyFaQTC0",
      date: "2024-09-20",
    },
    {
      id: 3,
      title: "Middle East Analysis Forum",
      embedId: "_y6wyFaQTC0",
      date: "2024-08-10",
    },
  ];

  const tabs = [
    { id: "press", label: t("nav.media.press", "Press Releases"), icon: Newspaper },
    { id: "news", label: t("nav.media.news", "News & Updates"), icon: Radio },
    { id: "video", label: t("nav.media.video", "Video & Multimedia"), icon: Video },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Radio className="h-6 w-6 text-blue-400" />
                </div>
                <span className="text-blue-400 font-medium">Media Centre</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t("nav.media", "Media Centre")}
              </h1>
              <p className="text-xl text-gray-300">
                {t("media.heroSubtitle", "Stay updated with the latest news, press releases, and multimedia content from IFIMES.")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("media.socialTitle", "Follow Us")}
              </h2>
              <p className="text-gray-600">
                {t("media.socialDesc", "Connect with IFIMES on social media")}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} text-white rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                >
                  <social.icon className="h-8 w-8 mx-auto mb-3" />
                  <p className="font-semibold">{social.name}</p>
                  <p className="text-sm opacity-80">{social.followers} followers</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Content Tabs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Press Releases Tab */}
            {activeTab === "press" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pressReleases && pressReleases.length > 0 ? (
                    pressReleases.slice(0, 9).map((article) => (
                      <Link key={article.id} href={`/press/${article.slug}`}>
                        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                          {article.featuredImage && (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={article.featuredImage}
                                alt={getLocalizedTitle(article)}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                              <Calendar className="h-4 w-4" />
                              {new Date(article.publishDate).toLocaleDateString(i18n.language, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {getLocalizedTitle(article)}
                            </h3>
                            <div className="mt-4 flex items-center text-blue-600 font-medium">
                              <span>Read more</span>
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <Newspaper className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No press releases available.</p>
                    </div>
                  )}
                </div>
                {pressReleases && pressReleases.length > 9 && (
                  <div className="text-center mt-8">
                    <Link
                      href="/press"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View All Press Releases
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </motion.div>
            )}

            {/* News Tab */}
            {activeTab === "news" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newsArticles && newsArticles.length > 0 ? (
                    newsArticles.slice(0, 9).map((article) => (
                      <Link key={article.id} href={`/media/${article.slug}`}>
                        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                          {article.featuredImage && (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={article.featuredImage}
                                alt={getLocalizedTitle(article)}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                              <Calendar className="h-4 w-4" />
                              {new Date(article.publishDate).toLocaleDateString(i18n.language, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {getLocalizedTitle(article)}
                            </h3>
                            <div className="mt-4 flex items-center text-blue-600 font-medium">
                              <span>Read more</span>
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <Radio className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No news articles available.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Video Tab */}
            {activeTab === "video" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Featured Video */}
                <div className="max-w-4xl mx-auto mb-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Play className="h-5 w-5 text-blue-600" />
                    Featured Video
                  </h3>
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/_y6wyFaQTC0"
                      title="IFIMES Featured Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* More Videos */}
                <div className="grid md:grid-cols-3 gap-6">
                  {featuredVideos.map((video) => (
                    <div
                      key={video.id}
                      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
                    >
                      <div className="relative aspect-video">
                        <img
                          src={`https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-blue-600 ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(video.date).toLocaleDateString(i18n.language, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* YouTube Channel Link */}
                <div className="text-center mt-8">
                  <a
                    href="https://www.youtube.com/user/Ifimes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                    Visit Our YouTube Channel
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-80" />
              <h2 className="text-3xl font-bold mb-4">
                {t("newsletter.title", "Subscribe to Our Newsletter")}
              </h2>
              <p className="text-blue-100 mb-8">
                {t("newsletter.subtitle", "Get the latest research, analysis, and updates delivered to your inbox.")}
              </p>
              {subscribed ? (
                <div className="bg-white/10 rounded-lg p-6">
                  <p className="text-lg font-medium">Thank you for subscribing!</p>
                  <p className="text-blue-100 mt-2">You'll receive our next newsletter soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("newsletter.placeholder", "Enter your email")}
                    required
                    className="flex-1 px-5 py-4 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {t("newsletter.button", "Subscribe")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Media Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Media Inquiries</h2>
              <p className="text-gray-600 mb-6">
                For press inquiries, interview requests, or media partnerships, please contact our communications team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:press@ifimes.org"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  press@ifimes.org
                </a>
                <Link
                  href="/get-involved"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

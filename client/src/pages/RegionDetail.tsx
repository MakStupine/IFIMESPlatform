import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { regionalFocus } from "@/lib/constants";
import { ArrowRight, MapPin, BookOpen, Calendar, ChevronLeft } from "lucide-react";

interface Article {
  id: number;
  slug: string;
  category: string;
  title_en: string;
  title_bs: string;
  title_sl: string;
  content_en: string;
  content_bs: string;
  content_sl: string;
  publishDate: string;
  featuredImage: string | null;
}

export default function RegionDetail() {
  const { region: regionSlug } = useParams<{ region: string }>();
  const { t, i18n } = useTranslation();

  const region = regionalFocus.find((r) => r.slug === regionSlug);

  // Fetch related research articles
  const { data: researchArticles } = useQuery<Article[]>({
    queryKey: ["region-research", regionSlug],
    queryFn: async () => {
      const response = await fetch("/api/articles/research");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      // Filter articles that might relate to this region (simple keyword matching)
      const regionKeywords = region?.countries.concat(region.topics) || [];
      return data.filter((article: Article) => {
        const title = article.title_en.toLowerCase();
        const content = article.content_en.toLowerCase();
        return regionKeywords.some(
          (keyword) =>
            title.includes(keyword.toLowerCase()) ||
            content.includes(keyword.toLowerCase())
        );
      }).slice(0, 6);
    },
    enabled: !!region,
  });

  // Fetch related events
  const { data: events } = useQuery<Article[]>({
    queryKey: ["region-events", regionSlug],
    queryFn: async () => {
      const response = await fetch("/api/articles/event");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      // Filter events that might relate to this region
      const regionKeywords = region?.countries.concat(region.topics) || [];
      return data.filter((event: Article) => {
        const title = event.title_en.toLowerCase();
        const content = event.content_en.toLowerCase();
        return regionKeywords.some(
          (keyword) =>
            title.includes(keyword.toLowerCase()) ||
            content.includes(keyword.toLowerCase())
        );
      }).slice(0, 4);
    },
    enabled: !!region,
  });

  const getLocalizedTitle = (article: Article) => {
    const lang = i18n.language;
    if (lang === "bs") return article.title_bs || article.title_en;
    if (lang === "sl") return article.title_sl || article.title_en;
    return article.title_en;
  };

  if (!region) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Region not found
            </h1>
            <Link
              href="/regions"
              className="text-blue-600 hover:text-blue-700"
            >
              Back to regions
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img
            src={region.image}
            alt={t(region.titleKey)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              {/* Breadcrumb */}
              <Link
                href="/regions"
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {t("nav.regions")}
              </Link>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                {t(region.titleKey)}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-white/90 max-w-2xl"
              >
                {t(region.descriptionKey)}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Topics & Countries */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Key Topics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Research Topics
                </h3>
                <div className="flex flex-wrap gap-3">
                  {region.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Countries */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  Countries & Areas Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {region.countries.map((country) => (
                    <span
                      key={country}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Research */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Related Research
              </h2>
              <Link
                href="/research"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {researchArticles && researchArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {researchArticles.map((article) => (
                  <Link key={article.id} href={`/research/${article.slug}`}>
                    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {article.featuredImage && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={article.featuredImage}
                            alt={getLocalizedTitle(article)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                          Research
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {getLocalizedTitle(article)}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(article.publishDate).toLocaleDateString(i18n.language, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No related research articles found.</p>
                <Link
                  href="/research"
                  className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
                >
                  Browse all research
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Events */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-blue-600" />
                Related Events
              </h2>
              <Link
                href="/events"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View All Events
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {events && events.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <Link key={event.id} href={`/events/${event.slug}`}>
                    <div className="group bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-colors">
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Event
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors">
                        {getLocalizedTitle(event)}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(event.publishDate).toLocaleDateString(i18n.language, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No related events found.</p>
                <Link
                  href="/events"
                  className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
                >
                  Browse all events
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

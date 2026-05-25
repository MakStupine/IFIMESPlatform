import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { regionalFocus } from "@/lib/constants";
import { ArrowRight, MapPin } from "lucide-react";

export default function Regions() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t("regions.title")}
              </h1>
              <p className="text-xl text-blue-100">
                {t("regions.subtitle")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Regions Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {regionalFocus.map((region, index) => (
                <motion.div
                  key={region.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/regions/${region.slug}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={region.image}
                          alt={t(region.titleKey)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white">
                            {t(region.titleKey)}
                          </h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-gray-600 mb-6">
                          {t(region.descriptionKey)}
                        </p>

                        {/* Countries */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>Countries & Areas</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {region.countries.slice(0, 4).map((country) => (
                              <span
                                key={country}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                              >
                                {country}
                              </span>
                            ))}
                            {region.countries.length > 4 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                +{region.countries.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Topics */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {region.topics.map((topic) => (
                              <span
                                key={topic}
                                className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                          <span>{t("regions.exploreBtn")}</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

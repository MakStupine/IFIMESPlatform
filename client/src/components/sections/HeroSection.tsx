import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/constants";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { BookOpen, Calendar, Globe, Award, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const { t } = useTranslation();

  const highlights = [
    { icon: Globe, label: "UN ECOSOC Status", color: "text-blue-300" },
    { icon: Award, label: "30+ Years of Research", color: "text-yellow-300" },
    { icon: BookOpen, label: "500+ Publications", color: "text-green-300" },
  ];

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2070"
          alt="Global diplomacy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/50" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl">
          {/* Accreditation Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 py-2 px-4 bg-white/10 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {t("hero.established", { year: companyInfo.founded })} • Ljubljana, Slovenia
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              <span className="block text-blue-400">IFIMES</span>
              <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl font-medium text-white/90">
                {t("hero.fullName")}
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl font-light"
          >
            {t("hero.tagline")}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-400 mb-10 max-w-xl"
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link href="/research">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-blue-500/25 hover:shadow-xl px-8 py-6 text-lg group"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                {t("hero.researchBtn")}
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/events">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-8 py-6 text-lg font-medium"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {t("hero.eventsBtn")}
              </Button>
            </Link>
          </motion.div>

          {/* Highlight Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10"
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="text-white/80 text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}

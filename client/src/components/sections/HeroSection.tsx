import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "@/lib/animations";
import { companyInfo, images } from "@/lib/constants";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();
  const [location, navigate] = useLocation();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = -80;
      const y = section.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleNavClick = (id: string) => {
    if (location !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <section
      id="home"
      className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-[#1952F3] overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px] pointer-events-none"></div>

      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-900/80 to-transparent opacity-70"></div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Text content */}
          <motion.div
            className="md:w-1/2 lg:w-3/5 mb-12 md:mb-0"
            variants={fadeInLeft}
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-block py-1 px-3 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-4">
                {t("hero.established", { year: companyInfo.founded })}
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              variants={fadeInUp}
            >
              {t("hero.fullName")}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-6 text-white font-light max-w-2xl"
              variants={fadeInUp}
            >
              {t("hero.tagline")}
            </motion.p>

            <motion.p
              className="text-lg mb-8 text-white opacity-90 max-w-xl"
              variants={fadeInUp}
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={fadeInUp}
            >
              <Button
                size="lg"
                className="bg-yellow-500 text-white hover:bg-yellow-400 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                onClick={() => handleNavClick("services")}
              >
                {t("hero.servicesBtn")}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-600 transition-all duration-300 backdrop-blur-sm"
                onClick={() => handleNavClick("contact")}
              >
                {t("hero.contactBtn")}
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            className="md:w-1/2 lg:w-2/5 flex justify-center md:justify-end"
            variants={fadeInRight}
          >
            <div className="relative">
              <img
                src={images.hero}
                alt="IFIMES Global Analysis"
                className="relative z-10 rounded-lg shadow-2xl border border-white/20 max-w-full h-auto object-cover"
                style={{ maxHeight: "450px", width: "500px" }}
              />
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-full blur-2xl z-0"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded-full blur-xl z-0"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom curved shape */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-12 md:h-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="#f7f8f9"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,51,82,341.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}

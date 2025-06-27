import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
}: ServiceCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 group"
      variants={fadeInUp}
      whileHover={{
        scale: 1.03,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="mb-6">
        <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-primary-100 transition-all duration-300 border border-primary-100">
          <i className={`bx ${icon} text-3xl text-primary-600`}></i>
        </div>
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-700 transition-colors duration-300">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 flex-grow mb-6 leading-relaxed">
        {description}
      </p>
      <div className="pt-4 border-t border-gray-100">
        <a
          href="#contact"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-all duration-300 group-hover:translate-x-1"
        >
          {t("servicesSection.learnMore")}
          <i className="bx bx-right-arrow-alt ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
        </a>
      </div>
    </motion.div>
  );
}

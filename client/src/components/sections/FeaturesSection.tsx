import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { features } from "@/lib/constants";
import SlidersSection from "@/components/ui/Sliders";
import { useTranslation } from "react-i18next";
import { Globe, TrendingUp, Users, Lightbulb } from "lucide-react";


const iconMap: Record<string, React.ReactNode> = {
  "bx-globe-alt": <Globe className="w-8 h-8" />,
  "bx-line-chart": <TrendingUp className="w-8 h-8" />,
  "bx-network-chart": <Users className="w-8 h-8" />,
  "bx-bulb": <Lightbulb className="w-8 h-8" />,
};

const gradients = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-500",
  "from-purple-500 to-pink-600",
];

export default function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
            Why Choose IFIMES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("featuresSection.heading")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("featuresSection.subheading")}
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradients[index % gradients.length]}`} />

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {iconMap[feature.icon] || <Globe className="w-8 h-8" />}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {t(`featuresSection.items.${index}.title`)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(`featuresSection.items.${index}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Slider Section */}
        <SlidersSection />
      </div>
    </section>
  );
}

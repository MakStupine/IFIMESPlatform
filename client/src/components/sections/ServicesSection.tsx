import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ServiceCard from "@/components/ui/service-card";
import { useTranslation } from "react-i18next";

export default function ServicesSection() {
  const { t } = useTranslation();

  const services = t("servicesSection.items", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <section id="services" className="py-20 bg-gray-50 relative">
      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-full h-20 bg-white"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-20 bg-white"
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="inline-block py-1 px-3 bg-primary-100 text-primary-800 text-sm font-medium rounded-full mb-3">
            {t("servicesSection.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("servicesSection.heading")}
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {t("servicesSection.subheading")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={`bx-${
                [
                  "analyse",
                  "file-find",
                  "building-house",
                  "conversation",
                  "calendar-event",
                  "chalkboard",
                ][index]
              }`}
              title={service.title}
              description={service.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

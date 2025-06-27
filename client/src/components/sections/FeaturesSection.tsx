import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import FeatureCard from "@/components/ui/feature-card";
import { features } from "@/lib/constants";
import SlidersSection from "@/components/ui/Sliders";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import profileImg from "@/assets/images/profile_10655118.png";
import contentImg from "@/assets/images/content_8468252.png";

export default function FeaturesSection() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-900 scroll-mt-12">
            {t("featuresSection.heading")}
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {t("featuresSection.subheading")}
          </p>
        </motion.div>

        <SlidersSection />

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-center"
            >
              {/* Stat 1 */}
              <div className="space-y-4">
                <img
                  src={profileImg}
                  alt="Subscribers"
                  className="mx-auto w-20 h-20 object-cover rounded-full shadow-md"
                />
                <h3 className="text-4xl font-bold text-indigo-600">
                  {inView && (
                    <CountUp
                      start={0}
                      end={400000}
                      duration={3}
                      separator=","
                    />
                  )}
                  +
                </h3>
                <p className="text-lg text-gray-700">
                  {t("featuresSection.stats.subscribers")}
                </p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-4">
                <img
                  src={contentImg}
                  alt="Articles"
                  className="mx-auto w-20 h-20 object-cover rounded-full shadow-md"
                />
                <h3 className="text-4xl font-bold text-green-600">
                  {inView && (
                    <CountUp start={0} end={500} duration={2.5} separator="," />
                  )}
                  +
                </h3>
                <p className="text-lg text-gray-700">
                  {t("featuresSection.stats.articles")}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={t(`featuresSection.items.${index}.title`)}
              description={t(`featuresSection.items.${index}.description`)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

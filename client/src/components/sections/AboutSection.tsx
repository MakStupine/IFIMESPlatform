import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, fadeInUp } from "@/lib/animations";
import { images, companyInfo } from "@/lib/constants";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();
  const features = t("about.features", { returnObjects: true }) as string[];

  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-50 z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="inline-block py-1 px-3 bg-primary-100 text-primary-800 text-sm font-medium rounded-full mb-3">
            {t("about.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("about.heading")}
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch gap-16">
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft}
          >
            <div className="relative">
              <img
                src={images.about}
                alt="IFIMES Research and Analysis"
                className="rounded-xl shadow-xl max-w-full h-auto border border-gray-100 z-10 relative"
              />

              <div className="absolute -bottom-6 -left-6 w-64 h-64 rounded-full bg-primary-100 -z-10"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 border-8 border-primary-200/40 rounded-xl -z-10"></div>

              <div className="absolute -right-10 bottom-10 bg-white p-6 rounded-lg shadow-xl border border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600">
                      {/* You can insert a stat here */}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-1"></div>
                    <div className="text-sm text-gray-600">
                      {/* Another stat line */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-16 pl-6 border-l-2 border-primary-100">
              <div className="relative mb-8">
                <div className="absolute -left-[29px] w-5 h-5 rounded-full bg-primary-500"></div>
                <div className="font-bold text-gray-900 mb-1">
                  {t("about.founded", { year: companyInfo.founded })}
                </div>
                <p className="text-gray-600">
                  {t("about.timeline.foundation")}
                </p>
              </div>
              <div className="relative mb-8">
                <div className="absolute -left-[29px] w-5 h-5 rounded-full bg-primary-500"></div>
                <div className="font-bold text-gray-900 mb-1">
                  2000s: {t("about.timeline.recognition").split(" ")[0]}
                </div>
                <p className="text-gray-600">
                  {t("about.timeline.recognition")}
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[29px] w-5 h-5 rounded-full bg-primary-500"></div>
                <div className="font-bold text-gray-900 mb-1">
                  {t("about.timeline.todayTitle", "Today")}
                </div>
                <p className="text-gray-600">{t("about.timeline.today")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight}
          >
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 md:ml-6 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t("about.leadershipTitle")}
              </h3>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t("about.leadershipText1")}
              </p>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t("about.leadershipText2")}
              </p>

              <div className="mb-8 p-6 bg-primary-50 rounded-lg border border-primary-100">
                <h4 className="font-bold text-gray-900 mb-4">
                  {t("about.missionTitle")}
                </h4>
                <p className="text-gray-700">{t("about.missionText")}</p>
              </div>

              <h4 className="font-bold text-gray-900 mb-4">
                {t("about.whyTitle")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-3 w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="bx bx-check text-sm text-primary-600"></i>
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center md:justify-start">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300"
                >
                  {t("about.contactBtn")}
                  <i className="bx bx-right-arrow-alt ml-2"></i>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

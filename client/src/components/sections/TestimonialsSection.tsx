import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import TestimonialCard from "@/components/ui/testimonial-card";
import { useTranslation } from "react-i18next";

export default function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonialItems = t("testimonialsSection.items", {
    returnObjects: true,
  }) as {
    text: string;
    organization: string;
    department: string;
  }[];

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-white to-blue-50 relative"
    >
      {/* Background SVG pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-75"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="inline-block py-1 px-3 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3">
            {t("testimonials.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("testimonials.heading")}
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {t("testimonials.subheading")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {testimonialItems.map((item, index) => (
            <TestimonialCard
              key={index}
              text={item.text}
              organization={item.organization}
              department={item.department}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className="bg-white py-12 px-6 md:px-12 rounded-xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <div className="mb-8">
              <i className="bx bxs-quote-alt-left text-5xl text-primary-300"></i>
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-700 italic font-light mb-8">
              “{t("testimonials.highlight.quote")}”
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl mr-4">
                EU
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">
                  {t("testimonials.highlight.organization")}
                </p>
                <p className="text-gray-600">
                  {t("testimonials.highlight.department")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/180px-Flag_of_Europe.svg.png"
              alt="European Union"
              className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/180px-Flag_of_the_United_Nations.svg.png"
              alt="United Nations"
              className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/OSCE_logo.svg/2560px-OSCE_logo.svg.png"
              alt="OSCE"
              className="h-10 w-auto grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { companyInfo } from "@/lib/constants";
import {
  Handshake,
  Mail,
  Briefcase,
  Send,
  Building,
  GraduationCap,
  Globe,
  FileText,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function GetInvolved() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    type: "partnership",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const opportunities = [
    {
      id: "partnership",
      icon: Handshake,
      title: t("getInvolved.partnership.title"),
      description: t("getInvolved.partnership.description"),
      benefits: [
        t("getInvolved.partnership.benefit1"),
        t("getInvolved.partnership.benefit2"),
        t("getInvolved.partnership.benefit3"),
      ],
    },
    {
      id: "research",
      icon: FileText,
      title: t("getInvolved.research.title"),
      description: t("getInvolved.research.description"),
      benefits: [
        t("getInvolved.research.benefit1"),
        t("getInvolved.research.benefit2"),
        t("getInvolved.research.benefit3"),
      ],
    },
    {
      id: "careers",
      icon: Briefcase,
      title: t("getInvolved.careers.title"),
      description: t("getInvolved.careers.description"),
      benefits: [
        t("getInvolved.careers.benefit1"),
        t("getInvolved.careers.benefit2"),
        t("getInvolved.careers.benefit3"),
      ],
    },
    {
      id: "internship",
      icon: GraduationCap,
      title: t("getInvolved.internship.title"),
      description: t("getInvolved.internship.description"),
      benefits: [
        t("getInvolved.internship.benefit1"),
        t("getInvolved.internship.benefit2"),
        t("getInvolved.internship.benefit3"),
      ],
    },
  ];

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
                {t("getInvolved.title")}
              </h1>
              <p className="text-xl text-blue-100">
                {t("getInvolved.subtitle")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Opportunities Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("getInvolved.opportunitiesTitle")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("getInvolved.opportunitiesSubtitle")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {opportunities.map((opp, index) => (
                <motion.div
                  key={opp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <opp.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {opp.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{opp.description}</p>
                      <ul className="space-y-2">
                        {opp.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {t("getInvolved.whyPartner.title")}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {t("getInvolved.whyPartner.content")}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Globe className="h-6 w-6 text-blue-600" />
                      <span className="text-gray-700">
                        {t("getInvolved.whyPartner.point1")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building className="h-6 w-6 text-blue-600" />
                      <span className="text-gray-700">
                        {t("getInvolved.whyPartner.point2")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <span className="text-gray-700">
                        {t("getInvolved.whyPartner.point3")}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
                >
                  <h3 className="text-2xl font-semibold mb-4">
                    {t("getInvolved.cta.title")}
                  </h3>
                  <p className="text-blue-100 mb-6">
                    {t("getInvolved.cta.description")}
                  </p>
                  <a
                    href="#contact-form"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    {t("getInvolved.cta.button")}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t("getInvolved.form.title")}
                </h2>
                <p className="text-lg text-gray-600">
                  {t("getInvolved.form.subtitle")}
                </p>
              </motion.div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 rounded-2xl p-12 text-center"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {t("getInvolved.form.successTitle")}
                  </h3>
                  <p className="text-gray-600">
                    {t("getInvolved.form.successMessage")}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onSubmit={handleSubmit}
                  className="bg-gray-50 rounded-2xl p-8"
                >
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("getInvolved.form.name")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("getInvolved.form.email")} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("getInvolved.form.organization")}
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organization: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("getInvolved.form.interestType")}
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) =>
                          setFormData({ ...formData, type: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      >
                        <option value="partnership">
                          {t("getInvolved.partnership.title")}
                        </option>
                        <option value="research">
                          {t("getInvolved.research.title")}
                        </option>
                        <option value="careers">
                          {t("getInvolved.careers.title")}
                        </option>
                        <option value="internship">
                          {t("getInvolved.internship.title")}
                        </option>
                        <option value="other">
                          {t("getInvolved.form.other")}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("getInvolved.form.message")} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
                    />
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t("getInvolved.form.sending")}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        {t("getInvolved.form.submit")}
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </div>
          </div>
        </section>

        {/* Direct Contact */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">
                {t("getInvolved.directContact.title")}
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-3 text-blue-300 hover:text-white transition-colors"
                >
                  <Mail className="h-6 w-6" />
                  <span>{companyInfo.email}</span>
                </a>
                <span className="hidden md:block text-gray-600">|</span>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center gap-3 text-blue-300 hover:text-white transition-colors"
                >
                  <span>{companyInfo.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

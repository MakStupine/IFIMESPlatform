import { useParams } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { companyInfo, partners, leadership } from "@/lib/constants";
import { Target, History, Users, Award, Building, Mail, MapPin, Phone, Globe } from "lucide-react";

export default function About() {
  const { section } = useParams<{ section?: string }>();
  const { t } = useTranslation();

  const sections = [
    { id: "mission", icon: Target, title: t("aboutPage.mission.title") },
    { id: "history", icon: History, title: t("aboutPage.history.title") },
    { id: "leadership", icon: Users, title: t("aboutPage.leadership.title") },
    { id: "accreditations", icon: Award, title: t("aboutPage.accreditations.title") },
    { id: "partners", icon: Building, title: t("aboutPage.partners.title") },
    { id: "contact", icon: Mail, title: t("nav.about.contact") },
  ];

  const accreditations = [
    { name: "United Nations ECOSOC", year: "2004", description: "Special Consultative Status" },
    { name: "OSCE", year: "2008", description: "Observer Status" },
    { name: "European Parliament", year: "2010", description: "Accredited Think Tank" },
  ];

  const timeline = [
    { year: "1995", event: t("aboutPage.history.timeline.1995") },
    { year: "2004", event: t("aboutPage.history.timeline.2004") },
    { year: "2010", event: t("aboutPage.history.timeline.2010") },
    { year: "2015", event: t("aboutPage.history.timeline.2015") },
    { year: "2020", event: t("aboutPage.history.timeline.2020") },
    { year: "2025", event: t("aboutPage.history.timeline.2025") },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t("aboutPage.title")}
              </h1>
              <p className="text-xl text-gray-300">
                {t("aboutPage.subtitle")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b sticky top-20 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto gap-1 py-2">
              {sections.map(({ id, icon: Icon, title }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                    section === id || (!section && id === "mission")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {t("aboutPage.mission.title")}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("aboutPage.mission.content")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mt-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("aboutPage.vision.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t("aboutPage.vision.content")}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section id="history" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <History className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {t("aboutPage.history.title")}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("aboutPage.history.content")}
                </p>
              </motion.div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200" />
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center mb-8 ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-5/12 ${
                        index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                      }`}
                    >
                      <div className="bg-white rounded-xl p-6 shadow-md">
                        <span className="text-2xl font-bold text-blue-600">
                          {item.year}
                        </span>
                        <p className="text-gray-600 mt-2">{item.event}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section id="leadership" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("aboutPage.leadership.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("aboutPage.leadership.content")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {leadership.map((person, index) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl overflow-hidden"
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-blue-600 font-medium">{person.role}</p>
                    <p className="text-gray-600 text-sm mt-2">{person.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Accreditations Section */}
        <section id="accreditations" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("aboutPage.accreditations.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("aboutPage.accreditations.content")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {accreditations.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 text-center shadow-md"
                >
                  <Award className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <p className="text-blue-600 font-medium mt-2">
                    Since {item.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("aboutPage.partners.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("aboutPage.partners.content")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {partners.filter((p) => p.type === "partner").map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {partner.location}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {partner.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Mail className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-6">{t("nav.about.contact")}</h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-blue-300 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-blue-100">{companyInfo.address}</p>
                </div>
                <div className="text-center">
                  <Phone className="h-8 w-8 text-blue-300 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    {companyInfo.phone}
                  </a>
                </div>
                <div className="text-center">
                  <Mail className="h-8 w-8 text-blue-300 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    {companyInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

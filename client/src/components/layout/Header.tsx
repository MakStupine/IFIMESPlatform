import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Globe, Search } from "lucide-react";
import { images } from "@/lib/constants";
import { useTranslation } from "react-i18next";

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -5,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

export default function Header() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("lang") || i18n.language;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onLanguageChanged = (lang: string) => {
      setCurrentLanguage(lang);
      localStorage.setItem("lang", lang);
    };
    i18n.on("languageChanged", onLanguageChanged);
    return () => i18n.off("languageChanged", onLanguageChanged);
  }, [i18n]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

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

  const headerClass = scrolled
    ? "fixed w-full bg-white shadow-md z-50 transition-all duration-300 border-b border-gray-100"
    : "fixed w-full bg-white z-50 transition-all duration-300";

  const navItems = [
    { label: "nav_home", id: "home" },
    { label: "nav_features", id: "features" },
    { label: "nav_services", id: "services" },
    { label: "nav_about", id: "about" },
    { label: "nav_testimonials", id: "testimonials" },
    { label: "nav_contact", id: "contact" },
  ];

  const languages = [
    { label: "en", native: "English", flag: "🇬🇧" },
    { label: "sl", native: "Slovenščina", flag: "🇸🇮" },
    { label: "bs", native: "Bosanski", flag: "🇧🇦" },
  ];

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center">
              <img
                src={images.logo}
                alt="IFIMES"
                className="h-20 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <motion.nav className="hidden md:flex space-x-4">
            {navItems.map(({ label, id }, index) => (
              <motion.button
                key={id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                onClick={() => handleNavClick(id)}
                className="relative px-4 py-2 text-gray-700 font-medium hover:text-primary-600 transition-colors duration-300 group"
              >
                {t(label)}
                <span className="absolute bottom-1 left-[30%] w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-[60%] group-hover:left-[20%]"></span>
              </motion.button>
            ))}
          </motion.nav>

          {/* Language & Contact */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Search Icon */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => console.log("Search clicked")}
              className="p-3 rounded-full text-yellow-500 hover:text-yellow-600 transition-colors duration-300 focus:outline-none"
              aria-label="Search"
            >
              <Search className="h-8 w-8 font-bold" />
            </motion.button>

            {/* Language Selector Icon */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-3 rounded-full text-yellow-500 hover:text-yellow-600 transition-colors duration-300 focus:outline-none"
                  aria-label="Select language"
                >
                  <Globe className="h-9 w-9" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.label}
                    onClick={() => i18n.changeLanguage(lang.label)}
                    className={
                      currentLanguage === lang.label ? "bg-yellow-100" : ""
                    }
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.native}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Contact Icon */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => handleNavClick("contact")}
              className="p-3 rounded-full text-yellow-500 hover:text-yellow-600 transition-colors duration-300 focus:outline-none"
              aria-label="Contact us"
            >
              <i className="bx bx-message-detail text-4xl translate-y-[2px]" />
              {/* Bigger icon */}
            </motion.button>
          </motion.div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <i className={`bx ${isOpen ? "bx-x" : "bx-menu"} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-4 py-4 space-y-2 bg-white shadow-lg border-t border-gray-100">
              {navItems.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => {
                    closeMenu();
                    handleNavClick(id);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md font-medium"
                >
                  {t(label)}
                </button>
              ))}
              <Link
                href="/events"
                onClick={closeMenu}
                className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md font-medium"
              >
                {t("nav_events")}
              </Link>

              {/* Language Selector */}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm font-medium text-center mb-2">
                  {t("select_language")}
                </div>
                <div className="flex justify-center gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.label}
                      onClick={() => {
                        i18n.changeLanguage(lang.label);
                        closeMenu();
                      }}
                      className={`px-4 py-1.5 rounded-md transition-all ${
                        currentLanguage === lang.label
                          ? "bg-yellow-100 font-semibold"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3 px-3">
                <Button
                  className="w-full bg-primary-600 text-white font-semibold transition-transform hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-lg"
                  onClick={() => {
                    closeMenu();
                    handleNavClick("contact");
                  }}
                >
                  {t("nav_getintouch")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

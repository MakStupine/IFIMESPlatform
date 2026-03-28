import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe, Search, X, Menu } from "lucide-react";
import { images } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("lang") || i18n.language;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate("/_temp");
      setTimeout(() => {
        navigate(`/articles?query=${encodeURIComponent(searchQuery.trim())}`);
      }, 0);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = -100;
      const y = section.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (location !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  };

  const languages = [
    { label: "en", native: "English", flag: "🇬🇧" },
    { label: "sl", native: "Slovenščina", flag: "🇸🇮" },
    { label: "bs", native: "Bosanski", flag: "🇧🇦" },
  ];

  const getCurrentLanguageDisplay = () => {
    const lang = languages.find((l) => l.label === currentLanguage);
    return lang ? lang.native : "English";
  };

  // Simple nav links
  const navLinks = [
    { label: t("nav_research", "Research"), href: "/research" },
    { label: t("nav_press", "Press"), href: "/press" },
    { label: t("nav_events", "Events"), href: "/events" },
    { label: t("nav_media", "Media Centre"), href: "/media" },
  ];

  // About dropdown items - scroll to sections on home page
  const aboutSections = [
    { label: t("nav.about.mission", "Mission & Vision"), id: "features" },
    { label: t("stats.title", "Our Impact"), id: "impact-stats" },
    { label: t("partnerMap.title", "Partners"), id: "partner-map" },
    { label: t("accreditations.title", "Accreditations"), id: "accreditations" },
  ];

  return (
    <header
      className={cn(
        "fixed w-full z-50 bg-white transition-shadow duration-300",
        scrolled ? "shadow-lg" : "shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <Link href="/" className="flex-shrink-0">
            <img
              src={images.logo}
              alt="IFIMES"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Simple Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-[14px] font-medium rounded-lg transition-colors",
                  location === link.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* About IFIMES Dropdown */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center px-4 py-2 text-[14px] font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
                  {t("nav.about", "About IFIMES")}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-52">
                {aboutSections.map((section) => (
                  <DropdownMenuItem
                    key={section.id}
                    onClick={() => handleNavClick(section.id)}
                    className="cursor-pointer"
                  >
                    {section.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Get Involved Button */}
            <Link
              href="/get-involved"
              className="ml-2 px-5 py-2 bg-blue-600 text-white text-[14px] font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("nav.getInvolved", "Get Involved")}
            </Link>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200 mx-3" />

            {/* Language Selector */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center px-3 py-2 text-[14px] text-gray-600 hover:text-blue-600 transition-colors">
                  <Globe className="h-4 w-4 mr-2" />
                  {getCurrentLanguageDisplay()}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.label}
                    onClick={() => i18n.changeLanguage(lang.label)}
                    className={cn(
                      "cursor-pointer",
                      currentLanguage === lang.label ? "bg-blue-50 text-blue-600" : ""
                    )}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.native}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center gap-4">
                  <Search className="h-6 w-6 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder={t("search_placeholder")}
                    className="flex-1 text-xl outline-none bg-transparent placeholder-gray-400"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {/* Mobile Search */}
              <div className="pb-4 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder={t("search_placeholder")}
                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* About Sections */}
              <div className="pt-2 pb-2 border-t border-gray-100 mt-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {t("nav.about", "About IFIMES")}
                </p>
                {aboutSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleNavClick(section.id)}
                    className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {section.label}
                  </button>
                ))}
              </div>

              {/* Get Involved CTA */}
              <Link
                href="/get-involved"
                className="block w-full text-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mt-4"
              >
                {t("nav.getInvolved", "Get Involved")}
              </Link>

              {/* Language */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {t("select_language")}
                </p>
                <div className="flex flex-wrap gap-2 px-4 pt-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.label}
                      onClick={() => i18n.changeLanguage(lang.label)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors",
                        currentLanguage === lang.label
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      <span>{lang.flag}</span>
                      {lang.native}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { navigationMenus, regionalFocus } from "@/lib/constants";

interface MegaMenuProps {
  onNavigate?: () => void;
}

export default function MegaMenu({ onNavigate }: MegaMenuProps) {
  const { t } = useTranslation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleLinkClick = () => {
    setActiveMenu(null);
    onNavigate?.();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const renderMenuContent = (menu: typeof navigationMenus[0]) => {
    if (menu.id === "regions") {
      return (
        <div className="grid grid-cols-3 gap-6">
          {regionalFocus.map((region) => (
            <Link
              key={region.id}
              href={`/regions/${region.slug}`}
              onClick={handleLinkClick}
              className="group block p-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="aspect-video mb-3 rounded-lg overflow-hidden">
                <img
                  src={region.image}
                  alt={t(region.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {t(region.titleKey)}
              </h4>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {t(region.descriptionKey)}
              </p>
            </Link>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        <div className="space-y-1">
          {menu.items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
            >
              <i className={`bx ${item.icon} text-xl text-gray-400 group-hover:text-blue-500`} />
              <span className="font-medium">{t(item.labelKey)}</span>
            </Link>
          ))}
        </div>
        {menu.featured && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5">
            <h4 className="text-sm font-semibold text-blue-900 mb-3">
              {menu.id === "research" && "Featured Publication"}
              {menu.id === "events" && "Next Event"}
              {menu.id === "media" && "Latest News"}
              {menu.id === "about" && "Quick Links"}
            </h4>
            <p className="text-sm text-gray-600">
              {menu.id === "research" && "Explore our latest research papers and policy briefs on regional developments."}
              {menu.id === "events" && "Join us at our upcoming conferences and seminars."}
              {menu.id === "media" && "Stay updated with our latest press releases and media coverage."}
              {menu.id === "about" && "Learn more about IFIMES, our mission, and our global impact."}
            </p>
            <Link
              href={menu.items[0]?.href || "/"}
              onClick={handleLinkClick}
              className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {t("regions.exploreBtn", "Explore")}
              <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav ref={menuRef} className="hidden lg:flex items-center">
      {navigationMenus.map((menu) => (
        <div
          key={menu.id}
          className="relative"
          onMouseEnter={() => handleMouseEnter(menu.id)}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={cn(
              "flex items-center gap-1 px-4 py-2 text-[15px] font-medium transition-colors",
              activeMenu === menu.id
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            )}
          >
            {t(menu.labelKey)}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                activeMenu === menu.id && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence>
            {activeMenu === menu.id && (
              <>
                {/* Invisible bridge to prevent menu closing */}
                <div className="absolute top-full left-0 right-0 h-2" />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "absolute top-full pt-2",
                    menu.id === "regions"
                      ? "left-1/2 -translate-x-1/2 w-[800px]"
                      : menu.id === "about"
                      ? "right-0 w-[500px]"
                      : "left-0 w-[500px]"
                  )}
                  onMouseEnter={() => handleMouseEnter(menu.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6">
                    <div className="mb-4 pb-3 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t(menu.labelKey)}
                      </h3>
                    </div>
                    {renderMenuContent(menu)}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Get Involved CTA */}
      <Link
        href="/get-involved"
        onClick={handleLinkClick}
        className="ml-4 px-5 py-2.5 bg-blue-600 text-white text-[14px] font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        {t("nav.getInvolved", "Get Involved")}
      </Link>
    </nav>
  );
}

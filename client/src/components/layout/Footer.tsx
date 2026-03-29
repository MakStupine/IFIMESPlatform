import { Link } from "wouter";
import { companyInfo, navigationMenus, regionalFocus } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import { Facebook, Twitter, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Facebook, href: companyInfo.socialLinks.facebook, label: "Facebook" },
    { icon: Twitter, href: companyInfo.socialLinks.twitter, label: "Twitter" },
    { icon: Linkedin, href: companyInfo.socialLinks.linkedin, label: "LinkedIn" },
    { icon: Youtube, href: companyInfo.socialLinks.youtube, label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Brand */}
          <Link href="/" className="inline-block mb-4">
            <h3 className="text-2xl font-bold text-white">{companyInfo.name}</h3>
          </Link>
          <p className="text-gray-400 mb-8 leading-relaxed">
            {companyInfo.fullName}
          </p>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
              <span className="text-sm">{companyInfo.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
              <a href={`tel:${companyInfo.phone}`} className="text-sm hover:text-white transition-colors">
                {companyInfo.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
              <a href={`mailto:${companyInfo.email}`} className="text-sm hover:text-white transition-colors">
                {companyInfo.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/research" className="hover:text-white transition-colors">{t("nav_research")}</Link>
            <Link href="/press" className="hover:text-white transition-colors">{t("nav_press")}</Link>
            <Link href="/events" className="hover:text-white transition-colors">{t("nav_events")}</Link>
            <Link href="/media" className="hover:text-white transition-colors">{t("nav_media")}</Link>
            <Link href="/about" className="hover:text-white transition-colors">{t("nav_about")}</Link>
            <Link href="/get-involved" className="hover:text-white transition-colors">{t("nav_getintouch")}</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {companyInfo.name}. {t("footer.rights")}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Accreditations */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>UN ECOSOC</span>
              <span>•</span>
              <span>OSCE</span>
              <span>•</span>
              <span>EU Parliament</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

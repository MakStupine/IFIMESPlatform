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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <h3 className="text-2xl font-bold text-white">{companyInfo.name}</h3>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {companyInfo.fullName}
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{companyInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href={`tel:${companyInfo.phone}`} className="text-sm hover:text-white transition-colors">
                  {companyInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="text-sm hover:text-white transition-colors">
                  {companyInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Research & Publications */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("nav.research")}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/research" className="text-sm hover:text-white transition-colors">
                  {t("nav.research.all")}
                </Link>
              </li>
              <li>
                <Link href="/research/papers" className="text-sm hover:text-white transition-colors">
                  {t("nav.research.papers")}
                </Link>
              </li>
              <li>
                <Link href="/research/policy-briefs" className="text-sm hover:text-white transition-colors">
                  {t("nav.research.policyBriefs")}
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm hover:text-white transition-colors">
                  {t("nav.media.press")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Focus */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("nav.regions")}</h4>
            <ul className="space-y-2.5">
              {regionalFocus.map((region) => (
                <li key={region.id}>
                  <Link href={`/regions/${region.slug}`} className="text-sm hover:text-white transition-colors">
                    {t(region.titleKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/events" className="text-sm hover:text-white transition-colors">
                  {t("nav.events")}
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("nav.about")}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm hover:text-white transition-colors">
                  {t("nav.about.mission")}
                </Link>
              </li>
              <li>
                <Link href="/about/history" className="text-sm hover:text-white transition-colors">
                  {t("nav.about.history")}
                </Link>
              </li>
              <li>
                <Link href="/about/leadership" className="text-sm hover:text-white transition-colors">
                  {t("nav.about.leadership")}
                </Link>
              </li>
              <li>
                <Link href="/about/partners" className="text-sm hover:text-white transition-colors">
                  {t("nav.about.partners")}
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="text-sm hover:text-white transition-colors">
                  {t("nav.getInvolved")}
                </Link>
              </li>
            </ul>
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

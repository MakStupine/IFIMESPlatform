import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function MediaPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-32 py-24 px-4 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            {t("media.socialTitle")}
          </h2>
          <p className="text-gray-600 mb-6">{t("media.socialDesc")}</p>
          <div className="flex justify-center gap-6 mb-16">
            <a
              href="https://www.facebook.com/Ifimes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-blue-600 w-7 h-7 hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.youtube.com/user/Ifimes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-blue-600 w-7 h-7 hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://x.com/ifimes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-blue-600 w-7 h-7 hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/ifimes-institute-232694138"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-blue-600 w-7 h-7 hover:scale-110 transition-transform" />
            </a>
          </div>

          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            {t("media.livestreamTitle")}
          </h2>
          <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/_y6wyFaQTC0"
              title="IFIMES livestream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

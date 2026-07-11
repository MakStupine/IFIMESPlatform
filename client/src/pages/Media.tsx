import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";
import {
  Radio,
  Mail,
  ArrowRight,
  ExternalLink,
  Play,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

interface YouTubeVideo {
  id: string;
  title: string;
}

export default function MediaPage() {
  const { t, i18n } = useTranslation();
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch latest 4 videos from YouTube channel via scraping the page
  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(`${import.meta.env.VITE_ADMIN_API_URL || ""}/api/youtube/latest`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setVideos(data.videos.slice(0, 4));
      } catch {
        // Fallback to known videos if API fails
        setVideos([
          { id: "_y6wyFaQTC0", title: "New challenges for Albania, region, Europe and the world — Lecture by H.E. Ilir Meta" },
          { id: "FfsXxQsrozU", title: "THE ESTABLISHMENT OF A NEW WORLD ORDER — Lecture by Blagoje Grahovac" },
          { id: "Ig7OD6jYs0k", title: "Dr. Mirko Pejanović: The Statehood of Bosnia and Herzegovina in the 20th and 21st Centuries" },
          { id: "DW6K0DNkAbs", title: "Ceremonija svečane dodjele priznanja za životno djelo akademiku prof. dr. Mirku Pejanoviću" },
        ]);
      } finally {
        setLoadingVideos(false);
      }
    }
    fetchVideos();
  }, []);

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/Ifimes/", color: "bg-blue-600 hover:bg-blue-700", followers: "12K+" },
    { name: "Twitter / X", icon: Twitter, href: "https://x.com/ifimes", color: "bg-gray-900 hover:bg-black", followers: "8K+" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/ifimes-institute-232694138", color: "bg-blue-700 hover:bg-blue-800", followers: "5K+" },
    { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@Ifimes", color: "bg-red-600 hover:bg-red-700", followers: "3K+" },
  ];

  const featuredVideo = videos[0];
  const moreVideos = videos.slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Radio className="h-6 w-6 text-blue-400" />
                </div>
                <span className="text-blue-400 font-medium">Media Centre</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t("nav.media", "Media Centre")}
              </h1>
              <p className="text-xl text-gray-300">
                {t("media.heroSubtitle", "Stay updated with the latest news, press releases, and multimedia content from IFIMES.")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("media.socialTitle", "Follow Us")}
              </h2>
              <p className="text-gray-600">
                {t("media.socialDesc", "Connect with IFIMES on social media")}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} text-white rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                >
                  <social.icon className="h-8 w-8 mx-auto mb-3" />
                  <p className="font-semibold">{social.name}</p>
                  <p className="text-sm opacity-80">{social.followers} followers</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Video & Multimedia Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
                <Play className="h-7 w-7 text-blue-600" />
                Video & Multimedia
              </h2>
              <p className="text-gray-600">Latest videos from the IFIMES YouTube channel</p>
            </div>

            {loadingVideos ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* Featured Video (latest) */}
                {featuredVideo && (
                  <div className="max-w-4xl mx-auto mb-12">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${featuredVideo.id}`}
                        title={featuredVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                    <p className="mt-3 text-gray-700 font-medium text-center">
                      {featuredVideo.title}
                    </p>
                  </div>
                )}

                {/* More Videos (next 3) */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {moreVideos.map((video) => (
                    <a
                      key={video.id}
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
                    >
                      <div className="relative aspect-video">
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-blue-600 ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {video.title}
                        </h4>
                      </div>
                    </a>
                  ))}
                </div>

                {/* YouTube Channel Link */}
                <div className="text-center mt-8">
                  <a
                    href="https://www.youtube.com/@Ifimes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                    Visit Our YouTube Channel
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Media Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Media Inquiries</h2>
              <p className="text-gray-600 mb-6">
                For press inquiries, interview requests, or media partnerships, please contact our communications team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:ifimes@ifimes.org"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  ifimes@ifimes.org
                </a>
                <Link
                  href="/get-involved"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

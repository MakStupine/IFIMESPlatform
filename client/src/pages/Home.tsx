import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ImpactStatsSection from "@/components/sections/ImpactStatsSection";
import PartnerMapSection from "@/components/sections/PartnerMapSection";
import UpcomingEventsSection from "@/components/sections/UpcomingEventsSection";
import AccreditationsSection from "@/components/sections/AccreditationsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="impact-stats">
          <ImpactStatsSection />
        </div>
        <div id="partner-map">
          <PartnerMapSection />
        </div>
        <UpcomingEventsSection />
        <div id="accreditations">
          <AccreditationsSection />
        </div>
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}

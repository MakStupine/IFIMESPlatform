import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Chatbot button */}
      {!isChatOpen && (
        <button
          className="fixed bottom-8 left-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
          aria-label="Open chatbot"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chatbot popup */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-8 w-80 h-[400px] bg-white shadow-lg rounded-lg flex flex-col overflow-hidden z-50">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-semibold">Chatbot</span>
            <button
              aria-label="Close chatbot"
              onClick={() => setIsChatOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Chatbot:</strong> Hello! How can I assist you today?
              </p>
              {/* More chat messages can be added here */}
            </div>
          </div>
          <div className="border-t p-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
      )}
    </div>
  );
}

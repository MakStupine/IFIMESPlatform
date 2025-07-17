import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import { MessageCircle, X } from "lucide-react";

export default function Home() {
  const [isChatOpen, setChatOpen] = useState(false);

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

      {isChatOpen && (
        <div className="fixed bottom-24 right-8 w-[22rem] h-[28rem] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden z-50">
          <div className="flex justify-between items-center bg-blue-600 text-white p-2">
            <span className="text-lg font-semibold">Chat with IFIMES</span>
            <button
              className="hover:bg-blue-700 p-6 rounded"
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
            >
              <X size={40} />
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {/* Your chat content goes here */}
            <p>Welcome to IFIMES chat!</p>
          </div>
        </div>
      )}

      {/* Fixed chatbot button with text */}
      {/* Chatbot button and conditional text */}
      <div className="fixed bottom-8 right-8 flex flex-col items-end z-50">
        {!isChatOpen && (
          <div className="mb-2 text-lg font-bold bg-white text-gray-800 shadow-md rounded-full py-2 px-4">
            Chat with IFIMES!
          </div>
        )}
        <button
          className="bg-blue-600 text-white p-5 rounded-full shadow-xl hover:bg-blue-700 transition-colors"
          aria-label="Chatbot"
          onClick={() => setChatOpen(true)}
        >
          <MessageCircle size={28} />
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
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
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        <div className="fixed bottom-24 right-6 w-[30rem] h-[36rem] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-3">
            <span className="text-lg font-semibold">Chat with IFIMES</span>
            <button
              className="hover:bg-blue-700 p-2 rounded-full"
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
            >
              <X size={28} />
            </button>
          </div>

          {/* Chat body */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`break-words whitespace-pre-wrap max-w-[80%] px-4 py-2 rounded-xl ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-right self-end ml-auto"
                    : "bg-gray-200 text-left self-start mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="border-t border-gray-200 p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  const newMsg = {
                    text: input.trim(),
                    sender: "user" as const,
                  };
                  setMessages((prev) => [...prev, newMsg]);
                  setInput("");

                  // Simulated bot response
                  setTimeout(() => {
                    setMessages((prev) => [
                      ...prev,
                      { text: "Hello world", sender: "bot" },
                    ]);
                  }, 300);
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Type a message..."
            />
          </div>
        </div>
      )}

      {/* Fixed chatbot button with text */}
      <div className="fixed bottom-8 right-8 flex flex-col items-end z-50">
        {!isChatOpen && (
          <div className="mb-2 text-lg font-bold bg-white text-gray-800 shadow-md rounded-full py-2 px-4">
            Chat with IFIMES!
          </div>
        )}
        <button
          className="bg-blue-600 text-white p-5 rounded-full shadow-xl hover:bg-blue-700 transition-colors"
          aria-label="Chatbot"
          onClick={() => setChatOpen((prev) => !prev)}
        >
          <MessageCircle size={28} />
        </button>
      </div>
    </div>
  );
}

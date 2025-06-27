import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { images } from "@/lib/constants";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

// Convert heading into a clean URL slug
const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const slides = [
  {
    title: "Researches",
    heading:
      "At IFIMES, research drives our understanding of complex global dynamics",
    description:
      "At IFIMES, research is at the core of our mission. Our team of analysts and scholars rigorously explores geopolitical, economic, and security developments across the Middle East, the Balkans, and beyond.",
    image: images.research,
    linkText: "Read Research",
    linkTo: "/research",
  },
  {
    title: "Press Releases",
    heading:
      "IFIMES issues statement on diplomatic efforts in Middle East crisis",
    description:
      "In response to ongoing tensions in the Middle East, IFIMES has issued a press release urging diplomatic dialogue and immediate de-escalation. The statement highlights the role of international institutions and think tanks in conflict prevention.",
    image: images.press,
    linkText: "Read Press",
    linkTo: "/press",
  },
  {
    title: "Events",
    heading:
      "IFIMES to host international forum on EU enlargement policy formation",
    description:
      "Scheduled for 20 May 2025 in Ljubljana, the forum will bring together leading scholars, policy makers, and diplomats to discuss the future of EU enlargement in the Western Balkans. IFIMES is honored to provide a platform for critical dialogue and exchange.",
    image: images.events,
    linkText: "Join Event",
    linkTo: "/events",
  },
  {
    title: "Media",
    heading:
      "IFIMES featured in global media outlets for latest geopolitical analysis",
    description:
      "Major international media have referenced IFIMES's latest geopolitical insights related to Eastern Europe and the Middle East. Our analysts continue to appear in interviews, shedding light on underreported yet critical developments shaping regional security.",
    image: images.media,
    linkText: "Explore Coverage",
    linkTo: "/media",
  },
];

export default function SlidersSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 20 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      instanceRef.current?.next();
    }, 6000);
    return () => clearInterval(timer);
  }, [instanceRef]);

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {slides.map((slide, idx) => (
              <motion.div
                key={idx}
                className="keen-slider__slide"
                animate="visible"
                initial="hidden"
                variants={fadeInUp}
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <span className="text-primary-600 font-semibold mb-2">
                        {slide.title}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        {slide.heading}
                      </h3>
                      <p className="text-gray-600 mb-6">{slide.description}</p>
                      <Link
                        to={slide.linkTo || `/events/${toSlug(slide.heading)}`}
                        className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors duration-300"
                      >
                        {slide.linkText}
                        <i className="bx bx-right-arrow-alt ml-2"></i>
                      </Link>
                    </div>
                    <div className="md:w-1/2">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        style={{ minHeight: "300px" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute top-1/2 -left-10 -translate-y-1/2 bg-white p-4 shadow-lg rounded-full z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute top-1/2 -right-10 -translate-y-1/2 bg-white p-4 shadow-lg rounded-full z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === idx ? "bg-gray-900" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

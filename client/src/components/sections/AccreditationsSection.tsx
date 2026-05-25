import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// UN ECOSOC Logo Component - UN Blue
const UNLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="48" fill="#009edb"/>
    <circle cx="50" cy="50" r="44" fill="none" stroke="white" strokeWidth="1.5"/>
    <path d="M50 10 L50 90 M10 50 L90 50" stroke="white" strokeWidth="1" opacity="0.5"/>
    <circle cx="50" cy="50" r="18" fill="none" stroke="white" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="32" fill="none" stroke="white" strokeWidth="1.5"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="white" strokeWidth="1" transform="rotate(66, 50, 50)"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="white" strokeWidth="1" transform="rotate(-66, 50, 50)"/>
    <path d="M25 70 Q50 82 75 70" fill="none" stroke="white" strokeWidth="2"/>
    {/* Olive branches */}
    <path d="M20 75 Q15 60 20 45 M20 65 Q25 63 28 58 M20 55 Q25 53 27 50" fill="none" stroke="white" strokeWidth="1.5"/>
    <path d="M80 75 Q85 60 80 45 M80 65 Q75 63 72 58 M80 55 Q75 53 73 50" fill="none" stroke="white" strokeWidth="1.5"/>
  </svg>
);

// OSCE Logo Component - Blue
const OSCELogo = () => (
  <svg viewBox="0 0 200 80" className="w-full h-full">
    <rect x="0" y="0" width="200" height="80" rx="8" fill="#005baa"/>
    <text x="100" y="52" textAnchor="middle" fontSize="36" fontWeight="bold" fontFamily="Arial, sans-serif" fill="white">
      OSCE
    </text>
    <line x1="15" y1="15" x2="15" y2="65" stroke="white" strokeWidth="2" opacity="0.7"/>
    <line x1="185" y1="15" x2="185" y2="65" stroke="white" strokeWidth="2" opacity="0.7"/>
  </svg>
);

// European Parliament Logo Component - EU Blue with Yellow Stars
const EUParliamentLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Blue circle background */}
    <circle cx="50" cy="50" r="48" fill="#003399"/>
    {/* 12 Yellow Stars */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
      const x = 50 + 35 * Math.cos((angle - 90) * Math.PI / 180);
      const y = 50 + 35 * Math.sin((angle - 90) * Math.PI / 180);
      return (
        <polygon
          key={i}
          points={`${x},${y-7} ${x+2.5},${y-2.5} ${x+7},${y-2.5} ${x+3.5},${y+1} ${x+5},${y+7} ${x},${y+3.5} ${x-5},${y+7} ${x-3.5},${y+1} ${x-7},${y-2.5} ${x-2.5},${y-2.5}`}
          fill="#FFCC00"
        />
      );
    })}
  </svg>
);

const accreditations = [
  {
    id: "un",
    name: "United Nations ECOSOC",
    description: "Special Consultative Status",
    Logo: UNLogo,
    year: "2004",
  },
  {
    id: "osce",
    name: "OSCE",
    description: "Observer Status",
    Logo: OSCELogo,
    year: "2008",
  },
  {
    id: "eu",
    name: "European Parliament",
    description: "Accredited Think Tank",
    Logo: EUParliamentLogo,
    year: "2010",
  },
];

export default function AccreditationsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {t("accreditations.title")}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t("accreditations.subtitle")}
          </p>
        </motion.div>

        {/* Accreditation Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {accreditations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 flex items-center justify-center bg-white rounded-2xl shadow-md p-3 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <item.Logo />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                {item.name}
              </h4>
              <p className="text-xs md:text-sm text-gray-500">
                {item.description}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Since {item.year}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, DivIcon } from "leaflet";
import { partners } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in React-Leaflet
const createCustomIcon = (type: string) => {
  const colors: Record<string, string> = {
    office: "#2563eb", // blue
    accreditation: "#059669", // green
    partner: "#7c3aed", // purple
  };

  return new DivIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background-color: ${colors[type] || colors.partner};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

export default function PartnerMapSection() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const legend = [
    { type: "office", label: t("partnerMap.legend.office"), color: "#2563eb" },
    { type: "accreditation", label: t("partnerMap.legend.accreditation"), color: "#059669" },
    { type: "partner", label: t("partnerMap.legend.partner"), color: "#7c3aed" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("partnerMap.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("partnerMap.subtitle")}
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-xl border border-gray-200"
        >
          {isClient && (
            <MapContainer
              center={[35, 20]}
              zoom={2}
              minZoom={2}
              maxZoom={10}
              style={{ height: "500px", width: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {partners.map((partner) => (
                <Marker
                  key={partner.id}
                  position={[partner.coordinates[0], partner.coordinates[1]]}
                  icon={createCustomIcon(partner.type)}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {partner.name}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        {partner.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        {partner.description}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}

          {/* Legend */}
          <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-6">
              {legend.map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
            <Link
              href="/about/partners"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
            >
              {t("partnerMap.viewAll")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

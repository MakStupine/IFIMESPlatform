import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react";

interface Event {
  id: number;
  slug: string;
  title_en: string;
  title_bs: string;
  title_sl: string;
  eventDate: string;
  featuredImage: string | null;
  content_en: string;
  content_bs: string;
  content_sl: string;
}

export default function UpcomingEventsSection() {
  const { t, i18n } = useTranslation();

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_ADMIN_API_URL || ""}/api/articles/event`);
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      // Filter for future events and sort by date
      const now = new Date();
      return data
        .filter((event: Event) => new Date(event.eventDate) >= now)
        .sort((a: Event, b: Event) =>
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        )
        .slice(0, 3);
    },
  });

  const getLocalizedTitle = (event: Event) => {
    const lang = i18n.language;
    if (lang === "bs") return event.title_bs || event.title_en;
    if (lang === "sl") return event.title_sl || event.title_en;
    return event.title_en;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(String(dateString).replace(" ", "T"));
    return {
      day: date.getDate(),
      month: date.toLocaleDateString(i18n.language, { month: "short" }),
      year: date.getFullYear(),
      full: date.toLocaleDateString(i18n.language, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  return (
    <section className="py-20 bg-gray-50">
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
            {t("upcomingEvents.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("upcomingEvents.subtitle")}
          </p>
        </motion.div>

        {/* Events List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 animate-pulse"
              >
                <div className="flex gap-6">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : events && events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event, index) => {
              const date = formatDate(event.eventDate);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/events/${event.slug}`}>
                    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {/* Date Badge */}
                        <div className="md:w-32 bg-blue-600 text-white p-6 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold">{date.day}</span>
                          <span className="text-sm uppercase tracking-wider">
                            {date.month}
                          </span>
                          <span className="text-xs opacity-80">{date.year}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                            {getLocalizedTitle(event)}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {date.full}
                            </span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="hidden md:flex items-center px-6">
                          <ArrowRight className="h-6 w-6 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t("upcomingEvents.noEvents")}</p>
          </div>
        )}

        {/* View Calendar Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("upcomingEvents.viewCalendar")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

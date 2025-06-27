import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface EventItem {
  id: number;
  slug: string;
  createdAt: string;
  eventDate: Date;
  featuredImage: string | null;
  title_en: string;
  content_en: string;
  title_bs: string;
  content_bs: string;
  title_sl: string;
  content_sl: string;
}

export default function EventPage() {
  const [view, setView] = useState<"future" | "past">("future");
  const [futureEvents, setFutureEvents] = useState<EventItem[]>([]);
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
  const { t, i18n } = useTranslation();

  const getLocalized = (item: EventItem) => {
    switch (i18n.language) {
      case "bs":
        return { title: item.title_bs, content: item.content_bs };
      case "sl":
        return { title: item.title_sl, content: item.content_sl };
      default:
        return { title: item.title_en, content: item.content_en };
    }
  };

  useEffect(() => {
    fetch("http://localhost:5150/api/articles/event")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch event articles.");
        return res.json();
      })
      .then((data) => {
        const normalized: EventItem[] = data
          .filter(
            (item: any) =>
              item.eventDate !== null && item.status === "published"
          )
          .map(
            (item: any): EventItem => ({
              id: item.id,
              slug: item.slug,
              eventDate: new Date(
                typeof item.eventDate === "string" &&
                !item.eventDate.includes("T")
                  ? `${item.eventDate}T00:00:00`
                  : item.eventDate
              ),
              createdAt: item.createdAt ?? item.created_at ?? "",
              featuredImage: item.featuredImage ?? item.featured_image ?? null,
              title_en: item.title_en,
              content_en: item.content_en,
              title_bs: item.title_bs,
              content_bs: item.content_bs,
              title_sl: item.title_sl,
              content_sl: item.content_sl,
            })
          );

        const now = new Date().getTime();

        const sortByEventDateDesc = (a: EventItem, b: EventItem) =>
          new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();

        const future = normalized
          .filter((item) => new Date(item.eventDate).getTime() > now)
          .sort(sortByEventDateDesc);

        const past = normalized
          .filter((item) => new Date(item.eventDate).getTime() <= now)
          .sort(sortByEventDateDesc);

        setFutureEvents(future);
        setPastEvents(past);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch event articles:", err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const events = view === "future" ? futureEvents : pastEvents;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-32 py-16 px-4 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-md overflow-hidden border border-gray-200">
              <button
                className={`px-6 py-2 text-sm font-medium transition-colors ${
                  view === "future"
                    ? "bg-white text-blue-600 font-bold"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setView("future")}
              >
                {t("events.futureBtn")}
              </button>
              <button
                className={`px-6 py-2 text-sm font-medium transition-colors ${
                  view === "past"
                    ? "bg-white text-blue-600 font-bold"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setView("past")}
              >
                {t("events.pastBtn")}
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {events.length === 0 ? (
              <p className="text-center text-lg font-semibold text-gray-600">
                {t("events.none")}
              </p>
            ) : (
              events.map((event) => {
                const { title, content } = getLocalized(event);
                return (
                  <Link
                    to={`/events/${event.slug}`}
                    key={event.id}
                    className="block"
                  >
                    <div className="flex items-start space-x-4 bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                      <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full flex-shrink-0" />
                      <div>
                        <p className="text-sm text-blue-600 font-semibold mb-1">
                          {event.eventDate &&
                            new Date(event.eventDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                        </p>
                        <h3 className="text-lg font-bold text-gray-900">
                          {title}
                        </h3>
                        <p className="text-gray-700 mt-1">{content}</p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

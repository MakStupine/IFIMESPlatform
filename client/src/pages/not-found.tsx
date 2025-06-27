import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ResearchPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-32 py-24 px-4 sm:px-10 lg:px-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Error 404</h1>
          <p className="text-lg text-gray-600">
            Page not found.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { companyInfo } from "@/lib/constants";
import { useTranslation } from "react-i18next"; // <-- import i18n hook

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export default function Footer() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(); // <-- initialize hook

  return (
    <footer className="bg-[#1952F3] text-white relative">
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-white-400 text-sm">
            © {new Date().getFullYear()} {companyInfo.name}.{" "}
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

// <div className="absolute top-0 left-0 w-full overflow-hidden">
//   <svg
//     className="relative block w-full h-8 md:h-12"
//     viewBox="0 0 1200 120"
//     preserveAspectRatio="none"
//     style={{ transform: "rotate(180deg)" }}
//     fill="#f7f8f9"
//   >
//     <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,51,82,341.39,56.44Z"></path>
//   </svg>
// </div>

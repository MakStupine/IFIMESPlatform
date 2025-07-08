import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { companyInfo } from "@/lib/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fadeInRight } from "@/lib/animations";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const contactFormSchema = z.object({
    name: z.string().min(1, { message: t("contact.validation.name") }),
    surname: z.string().min(1, { message: t("contact.validation.surname") }),
    email: z.string().email({ message: t("contact.validation.email") }),
    language: z.enum(["en", "sl", "bs"], {
      errorMap: () => ({ message: t("contact.validation.language") }),
    }),
  });

  const API_BASE_URL = import.meta.env.VITE_ADMIN_API_URL;

  type ContactFormValues = z.infer<typeof contactFormSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      language: "en",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      // inside contactMutation
      const res = await apiRequest(
        "POST",
        `${import.meta.env.VITE_ADMIN_API_URL}/api/mailchimp/contact`, // ✅ FIXED
        {
          email: data.email,
          language: data.language,
          name: data.name,
          surname: data.surname,
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw error; // 👈 throw the full object
      }

      const result = await res.json();
      return { message: result.message };
    },

    onSuccess: (response) => {
      toast({
        title: t("contact.success"),
        description: response.message,
      });
      form.reset();
    },

    onError: (error: any) => {
      let message = t("contact.error");

      if (error?.messageCode === "already_subscribed") {
        message = t("contact.alreadySubscribed");
      } else if (error?.messageCode === "permanently_deleted") {
        message = t("contact.permanentlyDeleted"); // add this key to your translations
      } else if (error?.message) {
        message = error.message;
      }

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },

    onSettled: () => setLoading(false),
  });

  const onSubmit = (data: ContactFormValues) => {
    setLoading(true);
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{t("contact.heading")}</h2>
          <p className="mt-4 text-xl text-gray-600">
            {t("contact.subheading")}
          </p>
        </div>

        {/* --- FORM FIRST --- */}
        <div className="max-w-2xl mx-auto mb-16">
          <motion.div
            className="p-6 md:p-8 bg-white shadow-xl rounded-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInRight}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name Input */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.nameLabel")}</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md px-3">
                          <i className="bx bx-user text-gray-500 mr-2"></i>
                          <Input
                            type="text"
                            {...field}
                            disabled={loading}
                            placeholder={t("contact.namePlaceholder")}
                            className="border-0 focus:ring-0 w-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Surname Input */}
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.surnameLabel")}</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md px-3">
                          <i className="bx bx-user-pin text-gray-500 mr-2"></i>
                          <Input
                            type="text"
                            {...field}
                            disabled={loading}
                            placeholder={t("contact.surnamePlaceholder")}
                            className="border-0 focus:ring-0 w-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Input */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.emailLabel")}</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md px-3">
                          <i className="bx bx-envelope text-gray-500 mr-2"></i>
                          <Input
                            type="email"
                            {...field}
                            disabled={loading}
                            placeholder={t("contact.emailPlaceholder")}
                            className="border-0 focus:ring-0 w-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Language Select */}
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.languageLabel")}</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md px-3">
                          <i className="bx bx-world text-gray-500 mr-2"></i>
                          <select
                            {...field}
                            disabled={loading}
                            className="border-0 focus:ring-0 focus:outline-none w-full py-2 bg-transparent"
                          >
                            <option value="en">
                              {t("contact.languageOptions.en")}
                            </option>
                            <option value="bs">
                              {t("contact.languageOptions.bs")}
                            </option>
                            <option value="sl">
                              {t("contact.languageOptions.sl")}
                            </option>
                          </select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-3 bg-[#1952F3] text-white hover:bg-[#143fcc]"
                  disabled={loading}
                >
                  {loading ? t("contact.submitting") : t("contact.submit")}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>

        {/* --- CONTACT INFO AFTER FORM --- */}
        <div className="text-gray-700 max-w-2xl mx-auto space-y-6 text-center">
          <div className="flex items-center justify-center">
            <i className="bx bx-map text-xl text-primary-500 mr-3"></i>
            <span>{companyInfo.address}</span>
          </div>
          <div className="flex items-center justify-center">
            <i className="bx bx-phone text-xl text-primary-500 mr-3"></i>
            <span>{companyInfo.phone}</span>
          </div>
          <div className="flex items-center justify-center">
            <i className="bx bx-envelope text-xl text-primary-500 mr-3"></i>
            <a
              href={`mailto:${companyInfo.email}`}
              className="text-primary-700 underline hover:text-primary-900 transition-colors duration-200"
            >
              {companyInfo.email}
            </a>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
            {Object.entries(companyInfo.socialLinks).map(([key, link]) => (
              <a
                key={key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 text-gray-800 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
              >
                <i className={`bx bxl-${key} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

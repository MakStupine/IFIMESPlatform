import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import sl from "./locales/sl.json";
import bs from "./locales/bs.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    sl: { translation: sl },
    bs: { translation: bs },
  },
  lng: localStorage.getItem("lang") || "en", // 🔧 Fix here
  fallbackLng: "en", // 🔧 And here
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

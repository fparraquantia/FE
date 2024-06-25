import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import en from "./en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
  },
  debug: false,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

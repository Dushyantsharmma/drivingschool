import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Basic translation resources example
const resources = {
  en: {
    translation: {
      "Raj Ann Raj": "Raj Ann Raj",
      // Add more keys as needed
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

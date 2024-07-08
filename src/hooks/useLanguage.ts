import { useEffect } from "react";
import i18n from "i18next";

export const useLanguage = () => {
  const LANG_KEY = "appLang";

  useEffect(() => {
    const storedLang = localStorage.getItem(LANG_KEY);
    const currentLang = storedLang || i18n.language;

    i18n.changeLanguage(currentLang);
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem(LANG_KEY, lang);
  };

  return { changeLanguage };
};

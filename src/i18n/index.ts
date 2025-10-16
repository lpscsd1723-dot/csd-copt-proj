import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import zh from './zh.json';
import en from './en.json';
import ja from './ja.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zh },
      en: { translation: en },
      ja: { translation: ja },
    },
    lng: 'zh', // 設定預設語言
    fallbackLng: 'zh',
    supportedLngs: ['zh', 'en', 'ja'],
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'cookie', 'path', 'subdomain'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: { escapeValue: false },
    returnNull: false,
    debug: true, // 開啟 debug 模式來檢查問題
    react: {
      useSuspense: false, // 避免 Suspense 問題
    },
  });

export default i18n;



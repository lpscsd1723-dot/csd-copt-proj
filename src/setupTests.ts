// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock i18next for testing
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18next for testing
i18n
  .use(initReactI18next)
  .init({
    lng: 'zh-TW',
    fallbackLng: 'zh-TW',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      'zh-TW': {
        translation: {
          // Add minimal translations for testing
          'nav.home': '首頁',
          'nav.about': '關於我們',
          'nav.services': '服務項目',
          'nav.contact': '聯絡我們'
        }
      }
    }
  });

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-http-backend';
import en from '@/configs/localization/trans.en';
import ko from '@/configs/localization/trans.ko';
import { supportedLngs } from '@/configs/localization/lang-availables';

i18n.use(XHR)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug: false,
        detection: { order: ['path', 'navigator'] },
        resources: {
            ko,
            en,
        },
        fallbackLng: 'en',
        supportedLngs,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
        keySeparator: false,
    });

export default i18n;

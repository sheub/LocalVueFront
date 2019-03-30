import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

let baseDataUrl;
if (process.env.NODE_ENV === "production") {
    baseDataUrl = process.env.PUBLIC_URL;
} else { // Dev server runs on port 3000
    baseDataUrl = "http://localhost:3000/";
}

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        debug: false,


        interpolation: {
            escapeValue: false // react already safes from xss
        },

        backend: {
            loadPath: baseDataUrl + "locales/{{lng}}/{{ns}}.json"
        },

        react: {
            wait: true,
            bindI18n: "languageChanged loaded",
            bindStore: "added removed",
            nsMode: "default"
        }
    });

// // load additional namespaces after initialization
// i18n.loadNamespaces("about");
// i18n.loadNamespaces("legal");


export default i18n;
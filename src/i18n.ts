import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: {
        translation: {
          "wizard_title": "Bewertungswizard",
          "risk_check": "Risikocheck",
          "next": "Weiter",
          "ja": "Ja",
          "nein": "Nein",
          "not_answered": "Nicht beantwortet",
          "complete": "Bewertung abgeschlossen",
          "export_json": "Als JSON exportieren",
          "submit_crm": "An CRM senden"
        }
      },
      en: {
        translation: {
          "wizard_title": "Assessment Wizard",
          "risk_check": "Risk Check",
          "next": "Next",
          "ja": "Yes",
          "nein": "No",
          "not_answered": "Not answered",
          "complete": "Assessment complete",
          "export_json": "Export as JSON",
          "submit_crm": "Send to CRM"
        }
      }
    },
    lng: "de",
    fallbackLng: "de",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

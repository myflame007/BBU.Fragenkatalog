# Fragenkatalog Beurteilungsassistent - Claude Instructions

React/TypeScript/Vite Power Apps Code App zur Beurteilung besonderer Bedürfnisse
bei BBU-Klient*innen. Läuft direkt im Power Platform Kontext (kein separates
Hosting, Auth über Power Apps Security Roles), Anbindung an Dataverse.
Ist KEIN eigenständig gehostetes Web-Frontend und hat KEIN eigenes Auth-System.

## Architektur / Dateien

- `src/data/` - `config.json` (Sprachen/Gruppen/Kategorien), `questionCatalog.json`
  (Fragen, Flow-Gruppen), `mockCrmData.json` (lokale Mock-Daten)
- `src/services/` - `flowEngine.ts` (Navigation), `assessmentEngine.ts`
  (Bewertungsregeln), `progressService.ts`, `crmService.ts` (Dataverse-Anbindung),
  `exportService.ts`
- `src/components/` - Wizard-UI (QuestionRenderer, AssessmentSidebar,
  WizardHeader, AssessmentComplete, AdminControlCenter, ManualStartForm)
- `src/generated/` - von `pac code add-data-source` erzeugt, nicht manuell editieren
- `power.config.json` - aktive Zielumgebung; `power.config.dev.json` /
  `power.config.live.json` sind die vorbereiteten Varianten dafür
- Details zu Deployment: `README.md`, `DEV-DEPLOYMENT-ANLEITUNG.md` (deckt
  Dev **und** Live ab, inkl. Troubleshooting zu `pac auth` - u.a. dass
  `--deviceCode` vom BBU-Tenant per Conditional-Access-Policy blockiert wird)
- Dataverse-Integrationsplan: `DATAVERSE-INTEGRATION.md`

## Arbeitsweise / Git

- Branch: `master`, kein etabliertes Feature-Branch-Muster bisher - vor dem
  Anlegen neuer Branches beim Nutzer nachfragen.
- Nie ungefragt `pac code push` oder Deployment-Schritte gegen Live
  (`d626b5f0-...`) ausführen - nur nach expliziter Freigabe.
- `src/generated/` nicht manuell bearbeiten (Codegen-Output).

# Fragenkatalog Beurteilungsassistent - Power Apps Code App

React/TypeScript/Vite App zur Beurteilung besonderer Beduerfnisse.
Basis: vom Kunden bereitgestellter Wizard-Code, erweitert um Anbindung an Dataverse via Power Apps Code App.
Laeuft direkt im Power Platform Kontext - kein separates Hosting, keine manuelle Auth.

## Voraussetzungen

- Node.js LTS
- bun (`npm install -g bun`)
- Power Platform CLI (`npm install -g @microsoft/power-platform-cli`)
- Power Apps Premium Lizenz fuer alle Endnutzer
- Power Platform Dev-Environment (kein Prod!)

## Manuell einmalig - Admin-Schritte

### 1. Code Apps in Power Platform aktivieren

```
Admin Center
  -> Environments -> [Dev-Environment] auswaehlen
  -> Settings -> Product -> Features
  -> "Enable code apps" = ON
```

### 2. pac auth einrichten

```bash
cd .\Avanade.BBU.CSM.Fragenkatalog

pac auth create
# Browser-Login mit BBU-Account

pac auth list
# Gewuenschtes Profil auswaehlen
pac auth select --index <index>

pac org list
# Verfuegbare Environments:
#   BBUD365CEDev1    0a2b9fd0-e368-4fdf-a94a-8d86dec6c051  <- BBU Dev
#   Avanade PROD     cf36141c-ddd7-45a7-b073-111f66d0b30c  <- NICHT verwenden

pac env select --environment 0a2b9fd0-e368-4fdf-a94a-8d86dec6c051

# Wenn AADSTS50076 / MFA erforderlich erscheint:
pac auth create --deviceCode --name "BBU-ADM" --environment 0a2b9fd0-e368-4fdf-a94a-8d86dec6c051
pac auth list
pac auth select --index <neuer-index-von-BBU-ADM>

# Wenn ein altes ADM-Profil weiter mit AADSTS50076 haengen bleibt:
pac auth clear
pac auth create --name "BBU-ADM" --environment 0a2b9fd0-e368-4fdf-a94a-8d86dec6c051
pac auth list
pac auth select --index <neuer-index-von-BBU-ADM>
```

### 3. Code App registrieren (einmalig pro Environment)

```bash
cd .\Avanade.BBU.CSM.Fragenkatalog
# Init: legt nur lokale power.config.json an (appId noch leer)
pac code init --displayName "Fragenkatalog Beurteilungsassistent" `
              --description "Avanade BBU CSM Fragenkatalog zur Erfassung besonderer Beduerfnisse" `
              --buildPath "./dist" `
              --fileEntryPoint "index.html" `
              --appUrl "http://localhost:5173/"

# Beim ersten Push wird die App in Power Platform tatsaechlich erzeugt
# und die appId in power.config.json eingetragen.
bun run build
pac code push
```

**Status (bereits ausgefuehrt):**

- App-ID: `b97305a0-10c4-48e3-a62c-d95fc7eec44b`
- Display Name: `Fragenkatalog Beurteilungsassistent`
- Environment: `BBUD365CEDev1` (`0a2b9fd0-e368-4fdf-a94a-8d86dec6c051`)
- **App-URL**: https://apps.powerapps.com/play/e/0a2b9fd0-e368-4fdf-a94a-8d86dec6c051/app/b97305a0-10c4-48e3-a62c-d95fc7eec44b

## Lokale Entwicklung

```bash
cd .\Avanade.BBU.CSM.Fragenkatalog
bun install
bun run dev --host 127.0.0.1 --port 5173
```

Oeffnet automatisch im Browser. Browser muss mit BBU-Account im selben Tenant eingeloggt sein.

Fuer lokales Testen ohne echtes Dataverse: URL-Parameter `?mock=1` (sobald in `crmService.ts` der Mock-Fallback verdrahtet ist).

## Deployment nach Power Platform

Das Tooling liest immer `power.config.json`. Es gibt zwei vorbereitete Varianten,
die je nach Zielumgebung darueber kopiert werden:

- `power.config.dev.json`  -> BBUD365CEDev1 (`0a2b9fd0-...`, App `b97305a0-...`)
- `power.config.live.json` -> BBU Live (`d626b5f0-...`, App `0924c4bd-...`)

```bash
cd .\Avanade.BBU.CSM.Fragenkatalog

# Zielumgebung waehlen (eine der beiden Varianten aktiv setzen):
copy /Y power.config.live.json power.config.json   # Live (bbu.crm4.dynamics.com)
# bzw.
copy /Y power.config.dev.json power.config.json    # Dev

pac auth list
pac auth select --index <index>
# env muss zur appId/environmentId in power.config.json passen, sonst:
#   "The environment config does not match the current environment."
pac env select --environment d626b5f0-2ca0-40d8-8a08-a2117bf579b7   # Live
pac org who
bun run build
pac code push --environment d626b5f0-2ca0-40d8-8a08-a2117bf579b7
```

App-URL Live:  https://apps.powerapps.com/play/e/d626b5f0-2ca0-40d8-8a08-a2117bf579b7/app/0924c4bd-2dca-46ae-b5eb-7a3f2e4ee58a
App-URL Dev:   https://apps.powerapps.com/play/e/0a2b9fd0-e368-4fdf-a94a-8d86dec6c051/app/b97305a0-10c4-48e3-a62c-d95fc7eec44b

### App mit Endnutzern teilen (einmalig nach erstem Deployment)

```
make.powerapps.com
  -> Apps -> "Fragenkatalog Beurteilungsassistent" -> ... -> Share
  -> Endnutzer-Gruppe oder einzelne User hinzufuegen
```

### Zugriff fuer User

- Direkt per URL (Link weiterschicken)
- Fuer Deeplinks kann die Contact-ID als `?contactId=<guid>` oder `?id=<guid>` mitgegeben werden
- Ueber https://apps.powerapps.com (alle geteilten Apps sichtbar)
- Optional: als IFrame in D365-Formular einbetten

**Voraussetzung:** Jeder User braucht eine Power Apps Premium Lizenz.

## Dataverse anbinden

```bash
cd .\Avanade.BBU.CSM.Fragenkatalog
pac code add-data-source -a dataverse -t contact
# weitere Tabellen je nach Schema, z.B.:
# pac code add-data-source -a dataverse -t ava_family
# pac code add-data-source -a dataverse -t ava_assessment
```

Generiert TypeScript-Services unter `src/generated/`. Anschliessend in `src/services/crmService.ts` die `fetch`-Calls gegen Beeceptor durch echte `ContactsService.get(...)` ersetzen.

Siehe [DATAVERSE-INTEGRATION.md](./DATAVERSE-INTEGRATION.md) fuer den vollstaendigen Anpassungsplan.

## Projektstruktur

```
src/
  data/
    config.json          <- Sprachen, Gruppen, Kategorien
    questionCatalog.json <- 155 Fragen, 6 Flow-Gruppen
    mockCrmData.json     <- Mock-Daten fuer lokale Entwicklung
  services/
    flowEngine.ts        <- Navigation (ja/nein Verzweigung)
    assessmentEngine.ts  <- Bewertungs-Regeln
    progressService.ts   <- Fortschrittsanzeige
    crmService.ts        <- Dataverse-Anbindung (umzubauen)
    exportService.ts     <- JSON-Export
  components/
    AdminControlCenter.tsx
    AdminLogin.tsx       <- wird entfernt (Auth via Power Apps Roles)
    AssessmentComplete.tsx
    AssessmentSidebar.tsx
    ManualStartForm.tsx  <- wird zu Auto-Start aus Context umgebaut
    QuestionRenderer.tsx
    WizardHeader.tsx
  hooks/
    useWizard.ts
  utils/
    dateUtils.ts
    validateCatalog.ts
  App.tsx
  main.tsx
  i18n.ts
  index.css
  generated/             <- wird von pac code add-data-source erzeugt (nicht committen)
```

## Offene TODOs (Dataverse-Integration)

- [x] Code App in Power Platform angelegt (App-ID b97305a0-10c4-48e3-a62c-d95fc7eec44b)
- [ ] `pac code add-data-source -a dataverse -t contact` - generiert ContactsService
- [ ] `crmService.ts`: Beeceptor-Mock raus, ContactsService rein
- [ ] `AdminLogin` entfernen, Admin-Zugriff via Power Apps Security Roles
- [ ] `ManualStartForm`: Auto-Start aus `getContext().app.queryParams`
- [ ] `submitAssessment` implementieren (Zieltabelle wird vom Kunden bereitgestellt)
- [ ] Mehrsprachigkeit aus `ava_mothertongue` ableiten (statt hardcoded `de`)
- [ ] Familien-Schema klaeren (Lookup vs. String-Feld)
- [ ] `src/generated/` zu `.gitignore` hinzufuegen

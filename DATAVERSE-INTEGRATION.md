# Dataverse-Integration: Anpassungsplan

Stand: 2026-05-19
Ziel: Diese App in Power Apps (Dataverse-Backend, Avanade BBU CSM) einbinden und anschliessend an den Kunden zur Weiterpflege zurueckgeben.

---

## Strategie

Es gibt zwei Wege, die App mit Dataverse zu verheiraten:

| Variante | Beschreibung | Geeignet, wenn... |
|---|---|---|
| **A** | Diese Kunden-App als Basis nehmen, Power-Apps-Plumbing reinbauen | ...der Kunde die App weiter pflegt |
| **B** | Wizard-Logik in eine bereits Power-Apps-faehige App migrieren | ...Avanade die App weiter pflegt |

**Empfehlung: Variante A**, weil der Kunde die App nach der Integration weiterentwickeln soll. Sein Code-Stand bleibt die Quelle der Wahrheit. Wir bauen nur die Anbindung an Dataverse rein und uebergeben.

---

## Was muss geaendert werden

### 1. Build-Setup

| Datei | Aenderung |
|---|---|
| `package.json` | Dependencies ergaenzen: `@microsoft/power-apps`, `@microsoft/power-apps-vite`. Optional: Zod fuer Schema-Validierung |
| `vite.config.ts` | `powerApps()` Plugin in `plugins[]` einbinden |
| `power.config.json` | NEU: Environment-GUID + App-ID + Schema-Pfade konfigurieren |
| `.dataverse-gen.json` | NEU: Entity-Auswahl fuer Code-Generation (mind. `contact`, `ava_family`, `ava_assessment` falls vorhanden) |
| `scripts/generate-datasources.ps1` | Optional: PowerShell-Skript fuer `dvkit generate` |

### 2. Authentifizierung

| Datei | Aenderung |
|---|---|
| `src/components/AdminLogin.tsx` | **Loeschen.** Frontend-Passwort ist unsicher. Power Apps regelt Auth via Session-Cookie/Token. Admin-Zugriff stattdessen ueber Rollen-Check (Security Role in Dataverse) oder URL-Parameter mit Server-Check |
| `src/App.tsx` | `isAuthorized` State raus, AdminControlCenter nur fuer User mit entsprechender Security Role anzeigen |

### 3. Datenzugriff: Read

| Datei | Aenderung |
|---|---|
| `src/services/crmService.ts` | **Komplett ersetzen.** Beeceptor-Mock raus. Statt eigenem `fetch`: `ContactsService.get(id, { select: [...] })` vom generierten SDK. Fallback auf `Xrm.WebApi.retrieveRecord` fuer Modell-driven Apps. Mock-Daten als `?mock=1` Fallback behalten fuer lokale Entwicklung. `credentials: 'include'` raus (im Iframe unzuverlaessig) |
| `src/services/crmService.ts` (Field-Mapping) | `ava_clientgroup` ist Dataverse OptionSet (100000002 = ARF, 100000003 = ARF_Kind_, etc.). Mapping in eine eigene Funktion auslagern und gegen `Contactsava_clientgroup` Enum aus Generated Code validieren |
| `src/services/crmService.ts` (Family) | Aktuell wird `ava_familienmitglieder` als String mit Klammern geparst. Mit Dataverse: Lookup ueber `_ava_familyid_value` zur Family-Entity, dann relationale Abfrage der zugehoerigen Contacts. **Schema beim Kunden klaeren:** wo liegen die Familienmitglieder? Eigene Entity, String-Feld am Contact, oder ueber Relationship? |

### 4. Datenzugriff: Write (Submit)

| Datei | Aenderung |
|---|---|
| `src/services/crmService.ts` -> `submitAssessment` | Aktuell `return { success: true }`. Echter Submit: zwei Schreibvorgaenge: (1) Antworten als JSON in einem Multiline-Text-Feld am Contact (z.B. `ava_assessment_json`), (2) Bewertungsergebnisse als eigener Datensatz in der Zieltabelle (steht beim Kunden noch im Bau, Schema noch nicht final). Implementierung in eigene Funktionen `saveAnswersJson(contactId, answers)` und `createAssessmentRecord(payload)` trennen |
| `src/components/AssessmentComplete.tsx` | Aktuell wird `assessment_*_*`-Felder mit dem Punkt-in-Unterstrich-Pattern befuellt. Anpassen an die tatsaechliche Feldstruktur der Zieltabelle |

### 5. URL- und Kontext-Aufloesung

| Datei | Aenderung |
|---|---|
| `src/App.tsx` | Auto-Start: `getContext().app.queryParams` parsen, ContactID extrahieren, automatisch laden. ManualStartForm nur als Fallback wenn keine ContactID kommt |
| `src/components/ManualStartForm.tsx` | Kann bleiben als Fallback fuer manuelle IFA-Suche. Aber `handleCrmFetch` muss `ContactsService` benutzen statt `fetch` |

### 6. Sprache und Lokalisierung

| Datei | Aenderung |
|---|---|
| `src/i18n.ts` | Initial `lng` aus `ava_mothertongue` des Contacts ableiten statt hardcoded `"de"`. Mapping bleibt wie es ist (`config.json` -> `languages[]`) |
| `src/App.tsx` | Bei Start: `i18n.changeLanguage(clientData.language)` aufrufen |

### 7. Sicherheit und Iframe-Verhalten

- localStorage: funktioniert in Power-Apps-Iframe, aber sensible Daten (Antworten zu Folter, Vergewaltigung, schwere Gewalt) sollten **nicht persistent im Browser** liegen. Optionen:
  - Beim Abschluss / Submit: `localStorage.removeItem("wizard_state")` (passiert bereits in `handleRestart`)
  - Alternative: Draft in einer eigenen Dataverse-Entity (`ava_assessment_draft`) speichern statt im Browser
- CSP: externe Domains aus dem Code entfernen (Beeceptor `test-555.free.beeceptor.com` muss raus)
- `credentials: 'include'` raus, weil im Power-Apps-Iframe nicht zuverlaessig

### 8. Build-Output und Deployment

- `vite build` -> `dist/` -> ZIP -> Solution Import in Power Apps Environment
- Bundle-Groesse ist okay (~330KB JS heute), bleibt nach Umbau in dem Bereich
- Code-Splitting nicht zwingend, Vite warnt aber bei > 500KB

### 9. Local Development

| Datei | Aenderung |
|---|---|
| `package.json` -> `scripts.dev` | `vite` weiter benutzen, Power-Apps-Vite-Plugin gibt automatisch einen lokalen URL aus, der gegen ein Cloud-Environment authentifiziert |
| `.env.development` | NEU: lokale Environment-Variablen, `VITE_CRM_URL` raus |
| `mockCrmData.json` | bleibt fuer `?mock=1` Modus |

---

## Konkrete Reihenfolge

```
1. Repo klonen, Branch erstellen
2. dependencies installieren (bun add @microsoft/power-apps @microsoft/power-apps-vite)
3. vite.config.ts mit powerApps() Plugin
4. power.config.json + .dataverse-gen.json aufsetzen
5. dvkit generate (oder PowerShell-Skript)            -> verify: src/generated/* existiert
6. crmService.ts ersetzen (Read + Field-Mapping)      -> verify: lokaler Test mit ?mock=1 + echte ContactID laedt durch
7. AdminLogin entfernen, Rollen-Check anbauen         -> verify: User ohne Admin-Rolle sieht den Admin-Button nicht
8. submitAssessment implementieren (sobald Schema da) -> verify: Datensatz erscheint in Dataverse-Zieltabelle
9. Sprach-Init aus ava_mothertongue                   -> verify: User mit motherTongue=Arabisch startet auf Arabisch
10. localStorage: pruefen ob Persistenz gewuenscht ist, ggf. raus oder durch Dataverse-Draft ersetzen
11. End-to-End: durch verschiedene Gruppen (ARF, UMF, Kind_14plus) klicken
12. Build + Solution Import + Test in Cloud-Environment
13. Uebergabe an Kunde (mit Readme: dev-Workflow, dvkit, Deployment)
```

---

## Aufwandsschaetzung

| Block | Stunden |
|---|---|
| Build-Setup (1.) | 2-3 |
| Auth-Cleanup (2.) | 1-2 |
| Datenzugriff Read (3.) | 4-6 |
| Datenzugriff Write (4.) | 4-6 |
| URL-Context (5.) | 1-2 |
| Sprache (6.) | 1 |
| Sicherheit (7.) | 2-3 |
| Testing + Deployment (10.-13.) | 4-6 |
| **Gesamt** | **19-29h** |

Plus die Klaerungspunkte beim Kunden, die unabhaengig vom Code geloest werden muessen.

---

## Was beim Kunden geklaert werden muss

1. **Family-Schema**: Wo liegen Familienmitglieder im Datenmodell?
2. **Zieltabelle Bewertungen**: Welche Entity, welche Felder?
3. **Antworten-Storage**: JSON-Feld am Contact oder eigene Entity?
4. **Admin-Rollen**: Welche Security Role darf AdminControlCenter sehen?
5. **Sprach-Quelle**: Aus `ava_mothertongue` ableiten, oder eigenes Feld fuer UI-Sprache?
6. **Drafts**: Sollen halbfertige Assessments persistiert werden (Dataverse oder localStorage)?
7. **Hosting**: Code App, Custom Page, oder PCF Component?

---

## Was beim Kunden gleich bleibt

- Komplettes UI / UX (One-Question-per-Screen, Animationen, Dark Mode, Font-Size)
- Flow-Engine, Assessment-Engine, Progress-Service
- Fragenkatalog (questionCatalog.json, config.json)
- Mehrsprachigkeit, Risiko-Sidebar, Abbruch-Modal, 14-18 Modal
- AdminControlCenter (Visual Rule + Flow Editor)
- Familien-Bucket (sofern Daten-Schema klaerbar)

Damit ist die Uebergabe sauber: der Kunde bekommt seinen Code zurueck, plus eine duenne Power-Apps-Anbindungs-Schicht im `crmService` und ein Auth-/Rollen-Modell.

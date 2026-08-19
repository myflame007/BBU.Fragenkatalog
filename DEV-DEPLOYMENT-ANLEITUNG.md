# Anleitung: Fragenkatalog Beurteilungsassistent auf Dev und Live deployen

Diese Anleitung beschreibt, wie eine neue Version der Code App in die
Dev-Umgebung (`BBUD365CEDev1`) und die Live-Umgebung (`BBU`,
`bbu.crm4.dynamics.com`) hochgeladen wird. Die App wurde dort bereits
einmalig registriert - es geht hier um das **Aktualisieren** einer
bestehenden Version.

**Wichtig:** Live ist die Produktivumgebung, die von echten Betreuer*innen
mit echten Klient*innendaten genutzt wird. Ein Deployment nach Live nur nach
ausdrücklicher Freigabe durchführen, nicht auf Verdacht.

## 1. Voraussetzungen

Einmalig auf dem verwendeten Rechner zu installieren:

- **Node.js** (LTS-Version) - https://nodejs.org
- **bun** als Paketmanager:
  ```powershell
  npm install -g bun
  ```
- **Power Platform CLI** (`pac`):
  ```powershell
  npm install -g @microsoft/power-platform-cli
  ```
- Ein Microsoft-Konto (BBU-Account) mit Zugriff auf die Dev-Umgebung
  `BBUD365CEDev1` und die Live-Umgebung `BBU`

## 2. Projekt vorbereiten

Repository lokal klonen bzw. auf den aktuellen Stand bringen, dann im
Projektordner (dort, wo `package.json` und `power.config.json` liegen):

```powershell
bun install
```

## 3. Zugang zur Power Platform einrichten (einmalig pro Rechner)

Für Dev und Live wird je ein eigenes Auth-Profil angelegt:

```powershell
pac auth create --name "BBU-ADM-Dev" --environment 0a2b9fd0-e368-4fdf-a94a-8d86dec6c051
pac auth create --name "BBU-ADM-Live" --environment d626b5f0-2ca0-40d8-8a08-a2117bf579b7
```

Bei jedem der beiden Befehle öffnet sich ein Browserfenster (bzw. läuft die
Anmeldung automatisch per Windows-SSO durch, falls am Rechner bereits mit dem
BBU-Account angemeldet) - mit dem BBU-Account anmelden.

Danach prüfen, ob beide Profile da sind:

```powershell
pac auth list
```

Vor jedem Deployment-Schritt das passende Profil aktivieren:

```powershell
pac auth select --index <Index-von-BBU-ADM-Dev-oder-Live>
pac org who
```

Die Ausgabe von `pac org who` muss `BBUD365CEDev1` (Dev) bzw. `BBU` (Live)
zeigen - **unbedingt kontrollieren, bevor deployed wird**, sonst landet der
Push in der falschen Umgebung.

**Falls eine MFA-Fehlermeldung erscheint (Code `AADSTS50076`) oder der
Token abgelaufen ist (Code `AADSTS70043`):** einfach den `pac auth create`-
Befehl von oben erneut ausführen (ggf. mit neuem `--name`, z.B.
`BBU-ADM-Dev2`) - das legt ein frisches, gültiges Profil an.

**Wichtig zu `--deviceCode`:** Die Option `pac auth create --deviceCode ...`
(zeigt einen Code + Link statt direkt einen Browser zu öffnen) wird vom
BBU-Tenant per Conditional-Access-Policy blockiert
(Fehlermeldung: *"Your sign-in was successful but does not meet the criteria
to access this resource"*). Das ist kein Berechtigungsproblem auf die
Zielumgebung, sondern eine bewusste Sperre der Anmeldeart (Device-Code-Flow
ist ein bekannter Phishing-Vektor). **Immer den normalen
`pac auth create` ohne `--deviceCode` verwenden** - das funktioniert
zuverlässig, meist sogar ganz ohne Klicks per Windows-SSO.

Hängt ein altes Profil weiter mit einem Auth-Fehler fest:

```powershell
pac auth clear
pac auth create --name "BBU-ADM-Dev" --environment 0a2b9fd0-e368-4fdf-a94a-8d86dec6c051
pac auth create --name "BBU-ADM-Live" --environment d626b5f0-2ca0-40d8-8a08-a2117bf579b7
```

## 4. Dev deployen

Dev-Profil aktivieren, Dev-Konfiguration aktivieren, bauen, pushen:

```powershell
pac auth select --index <Index-von-BBU-ADM-Dev>
copy /Y power.config.dev.json power.config.json
bun run build
pac code push --environment 0a2b9fd0-e368-4fdf-a94a-8d86dec6c051
```

- `bun run build` erstellt die aktuelle Version im Ordner `dist/`
- `pac code push` lädt diese Version in die bestehende Code App in Dev hoch

Bei Erfolg meldet `pac code push` die aktualisierte App-URL.

**Ergebnis prüfen:**
https://apps.powerapps.com/play/e/0a2b9fd0-e368-4fdf-a94a-8d86dec6c051/app/b97305a0-10c4-48e3-a62c-d95fc7eec44b

Im Browser öffnen (mit BBU-Account im selben Tenant angemeldet) und prüfen,
ob die neue Version geladen wird und wie erwartet funktioniert.

## 5. Live deployen (erst nach ausdrücklicher Freigabe, und erst wenn Dev geprüft ist)

Gleicher Ablauf wie Dev, aber mit dem Live-Profil und der Live-Konfiguration:

```powershell
pac auth select --index <Index-von-BBU-ADM-Live>
copy /Y power.config.live.json power.config.json
bun run build
pac code push --environment d626b5f0-2ca0-40d8-8a08-a2117bf579b7
```

**Ergebnis prüfen:**
https://apps.powerapps.com/play/e/d626b5f0-2ca0-40d8-8a08-a2117bf579b7/app/0924c4bd-2dca-46ae-b5eb-7a3f2e4ee58a

## 6. Danach: lokale Konfiguration wieder auf Dev zurückstellen

Damit kein versehentlicher künftiger Push gegen Live geht, nach dem
Live-Deployment lokal wieder auf Dev zurückschalten:

```powershell
pac auth select --index <Index-von-BBU-ADM-Dev>
copy /Y power.config.dev.json power.config.json
```

## Kurzfassung (wenn Zugang bereits eingerichtet ist)

```powershell
# Dev
pac auth select --index <Index-von-BBU-ADM-Dev>
copy /Y power.config.dev.json power.config.json
bun install
bun run build
pac code push --environment 0a2b9fd0-e368-4fdf-a94a-8d86dec6c051

# Live (nur nach Freigabe, erst nachdem Dev geprüft wurde)
pac auth select --index <Index-von-BBU-ADM-Live>
copy /Y power.config.live.json power.config.json
bun run build
pac code push --environment d626b5f0-2ca0-40d8-8a08-a2117bf579b7

# danach wieder auf Dev zurueckstellen
pac auth select --index <Index-von-BBU-ADM-Dev>
copy /Y power.config.dev.json power.config.json
```

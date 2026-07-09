# Troubleshooting: Klient wird nicht geladen ("konnte nicht geladen werden")

Stand: 2026-07-08

## 1. Symptom

Beim Aufruf der Code App mit `?contactId=...&beurteilungId=...` erscheint:

> Klient*in mit der ID "9BB18098-CA7A-F111-AB0E-0022489A5D9C" konnte nicht
> geladen werden. Bitte pruefen Sie die Verbindung oder erfassen Sie die Daten
> manuell.

Der Klient existiert nachweislich in Dev (BBUD365CEDev1) und ist ueber die
Model-driven App normal aufrufbar:
`https://bbud365dev1.crm4.dynamics.com/main.aspx?...&etn=contact&id=9bb18098-ca7a-f111-ab0e-0022489a5d9c`

Getestet wird im Standalone Player:
`https://apps.powerapps.com/play/e/0a2b9fd0-.../app/b97305a0-...`

## 2. Ursache (bestaetigt)

Der Fetch `fetchClientById()` in `src/services/crmService.ts` ruft
`ContactsService.get(id, { select: [...] })` auf. In der Select-Liste steht das
Feld `ava_nationalitystateid` in **roher Form**.

`ava_nationalitystateid` ist laut Datenquellen-Schema
(`.power/schemas/dataverse/klienten.Schema.json`) ein **LookupType**
(`"x-ms-dataverse-type": "LookupType"`, Titel "Nationalitaet").

In der Dataverse Web API muessen Lookup-Felder im `$select` als
`_<feldname>_value` angegeben werden (also `_ava_nationalitystateid_value`),
nicht als roher Lookup-Name. Der rohe Name fuehrt zu:

```
code:   0x80060888
status: 400
message: Could not find a property named 'ava_nationalitystateid'
         on type 'Microsoft.Dynamics.CRM.contact'.
```

Weil `ContactsService.get` in diesem Fall **keine Exception** wirft, sondern nur
`result.success === false` liefert, wurde der Fehler frueher gar nicht geloggt.
Das Feld `ava_nationalitystateid` steckt in **allen** Select-Varianten, deshalb
scheitert auch der (spaeter eingebaute) Fallback ohne Standort-Feld mit exakt
demselben Fehler.

Belegende Konsolenausgabe (Player):

```
ContactsService.get erfolglos (success=false) mit select [12 Felder]:
  {code: 0x80060888, status: 400, "Could not find a property named
   'ava_nationalitystateid' on type 'Microsoft.Dynamics.CRM.contact'."}
ContactsService.get erfolglos (success=false) mit select [11 Felder]:
  {code: 0x80060888, status: 400, ... gleiche Meldung ...}
Xrm.WebApi ist in diesem Kontext nicht verfuegbar (Standalone Code App Player)
Klient mit Kontakt-ID 9BB18098-... konnte nicht geladen werden.
```

## 3. Was sich heute frueh geaendert hat (vs. gestern)

Zwischen dem letzten funktionierenden Stand und heute liegt genau **ein**
Commit im Fragenkatalog:

| Commit | Zeit | Beschreibung |
|--------|------|--------------|
| `ef8d5b00` | 2026-06-25 14:31 | dataverse gen (Stand "gestern"/vorher) |
| `c2cf87a7` | 2026-07-08 09:47 | UX-Ueberarbeitung und CRM-Sync aus BBU.Fragenkatalog PR #1 uebernommen |

Der Commit `c2cf87a7` hat in `fetchClientById()` die Select-Liste erweitert:

- vorher (funktionierend): endete bei `_ava_familyid_value`
- nachher (fehlerhaft): zusaetzlich `familystatuscode` **und**
  `ava_nationalitystateid`

`familystatuscode` ist ein Optionset und im `$select` unproblematisch.
`ava_nationalitystateid` ist ein Lookup und in roher Form **ungueltig** ->
genau das ist die Regression.

Wichtig zum Verstaendnis "gestern lief es doch":
Bis heute frueh war `ava_nationalitystateid` nicht im Select, deshalb lief der
Fetch. Zusaetzlich gab es frueher einen **stillen Mock-Fallback**: schlug der
echte Fetch fehl, wurde ohne sichtbaren Fehler auf feste Testdaten
zurueckgefallen (Mock-Klient, 16 Jahre). Dieser Fallback konnte einen
kaputten Fetch als "funktioniert" kaschieren.

## 4. Was wir bereits probiert haben

1. **Besseres Logging bei `success=false`** eingebaut.
   - Ergebnis: hat den echten Fehler `0x80060888` sichtbar gemacht. War der
     entscheidende Schritt zur Diagnose. Vorher stand im Log nichts Brauchbares.

2. **Stillen Mock-Fallback entfernt** und stattdessen eine sprechende
   Fehlermeldung (`clientLoadError`) angezeigt.
   - Ergebnis: Der bisher versteckte Fehler wurde sichtbar. Loest das Problem
     nicht, verhindert aber, dass faelschlich Testdaten als echter Klient
     angezeigt werden.

3. **Fetch robuster gemacht**: erst Select mit `_ava_currentsiteid_value`,
   bei Misserfolg automatischer Retry mit der kleineren Basis-Select-Liste.
   - Ergebnis: hat **nicht** geholfen, weil `ava_nationalitystateid` in
     **beiden** Listen steht. Beide Versuche scheitern am selben Lookup-Fehler.

4. **Standort-Check von blockierend auf nur-warnend** umgestellt.
   - Ergebnis: entfernt einen moeglichen zweiten Stolperstein, ist aber nicht
     die Ursache des aktuellen Problems.

5. **Direkte Web-API-Abfrage per `az` Token** versucht, um den Datensatz von
   aussen zu pruefen.
   - Ergebnis: fehlgeschlagen mit "The user is not a member of the
     organization" (az-Login ist ein anderer Account als der Dev-Org-Benutzer).
     Kein verwertbares Ergebnis. `pac` ist zwar an Dev angemeldet, bietet aber
     keinen generischen Web-API-Query-Befehl.

## 5. Fix (umgesetzt am 2026-07-08)

In `src/services/crmService.ts` wurde:

- das Lookup-Feld korrekt als `_value` angegeben:
  `ava_nationalitystateid` -> `_ava_nationalitystateid_value` (SDK und Xrm).
- `normalizeContactToClientData` liest die Nationalitaet jetzt aus
  `_ava_nationalitystateid_value` bzw. `ava_nationalitystateidname`.
- der Select in zwei Gruppen aufgeteilt:
  - `CONTACT_CORE_SELECT`: nur skalare Felder + Optionsets, IMMER gueltig.
  - `CONTACT_LOOKUP_SELECT`: alle Lookups als `_..._value`.
  - `CONTACT_FULL_SELECT = CORE + LOOKUP`.
- der Fetch versucht erst `CONTACT_FULL_SELECT`, bei Misserfolg
  `CONTACT_CORE_SELECT`. Dadurch kann ein einzelnes falsch geschriebenes
  Lookup-Feld die Abfrage nie mehr komplett brechen: der Klient laedt dann
  weiterhin (nur ohne Familie/Nationalitaet/Standort), statt ganz zu scheitern.

Grundregel fuer alle kuenftigen Selects: alle Lookup-Felder gehoeren als
`_..._value` in den Select, nur Optionsets/Strings/Dates duerfen roh
selektiert werden. Bereits korrekt sind `_ava_familyid_value` und
`_ava_currentsiteid_value`.

## 6. Was man sonst noch pruefen/probieren koennte

- **Alle Selects im gesamten Service auf rohe Lookups pruefen** (nicht nur
  `fetchClientById`): auch `fetchFamilyMembers`, `getLatestAssessmentForContact`,
  `getSiteIdForSubmit` etc. Jeder rohe Lookup im `$select` kann dieselbe
  400-Fehlerklasse ausloesen.
- **Schema-Abgleich**: `.power/schemas/dataverse/klienten.Schema.json` je Feld
  auf `"x-ms-dataverse-type": "LookupType"` pruefen; solche Felder immer als
  `_..._value` selektieren.
- **Regressionstest**: einen echten Dev-Klienten ohne Mock (`?contactId=...`)
  laden und in der Browser-Konsole auf `ContactsService.get erfolglos`
  bzw. `0x8006...` achten.
- **Feld `ava_currentsiteid`** (ebenfalls Lookup) ist bereits korrekt als
  `_ava_currentsiteid_value` im Select; hier ist nichts weiter zu tun, solange
  die `_value`-Form verwendet wird.

## 7. Nuetzliche Referenzwerte

- Dev-Environment: `0a2b9fd0-e368-4fdf-a94a-8d86dec6c051` (BBUD365CEDev1)
- App-ID: `b97305a0-10c4-48e3-a62c-d95fc7eec44b`
- Beispiel-Kontakt (Dev): `9BB18098-CA7A-F111-AB0E-0022489A5D9C`
- Fehlercode Dataverse: `0x80060888` (Property not found) / HTTP 400

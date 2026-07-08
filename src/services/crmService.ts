import { isMinor as isMinorCheck } from '../utils/dateUtils';
import mockCrmData from '../data/mockCrmData.json';
import config from '../data/config.json';
import { ContactsService, Ava_bbu_beurteilungbesondererbedurfnissesService, Ava_bbu_bedurfniskategoriesService, SystemusersService } from '../generated';
import type { Ava_bbu_beurteilungbesondererbedurfnisses } from '../generated/models/Ava_bbu_beurteilungbesondererbedurfnissesModel';
import { contactMetadata } from '../dataverse-gen/entities/Contact';
import { ava_bbu_bedurfniskategorieMetadata } from '../dataverse-gen/entities/ava_bbu_Bedurfniskategorie';
import { ava_bbu_beurteilungbesondererbedurfnisseMetadata } from '../dataverse-gen/entities/ava_bbu_BeurteilungBesondererBedurfnisse';
import { ava_bbu_kategoriebedurfniskategorie } from '../dataverse-gen/enums/ava_bbu_kategoriebedurfniskategorie';
import { ava_bbu_typbedurfniskategorie } from '../dataverse-gen/enums/ava_bbu_typbedurfniskategorie';
import {
  Contactsava_clientgroup,
  Contactsava_mothertongue,
  Contactsgendercode,
  Contactsfamilystatuscode,
  type Contacts,
} from '../generated/models/ContactsModel';

export interface FamilyMember {
  ifaNumber: string;
  name: string;
  sex?: string;
  birthDate?: string;
  isMinor?: boolean;
}

export interface UserData {
  id: string;
  fullName: string;
  email?: string;
}

export interface ClientData {
  id: string;
  ifaNumber: string;
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: string;
  age: number;
  nationality: string;
  familyStatus: string;
  motherTongue: string;
  groupId: string;
  clientGroupCode?: string;
  language: string;
  familyId?: string;
  familyMembers?: FamilyMember[];
  numFamilyMembers?: number;
}

// --- Helpers ---

type XrmRecord = Record<string, unknown>;

interface XrmRetrieveMultipleResponse {
  entities: XrmRecord[];
}

interface XrmCreateResponse {
  id: string;
}

interface XrmWebApi {
  retrieveRecord(entityLogicalName: string, id: string, options?: string): Promise<XrmRecord>;
  retrieveMultipleRecords(entityLogicalName: string, options?: string): Promise<XrmRetrieveMultipleResponse>;
  createRecord(entityLogicalName: string, data: XrmRecord): Promise<XrmCreateResponse>;
  updateRecord(entityLogicalName: string, id: string, data: XrmRecord): Promise<unknown>;
  deleteRecord(entityLogicalName: string, id: string): Promise<unknown>;
}

const FORMATTED_VALUE_SUFFIX = '@OData.Community.Display.V1.FormattedValue';

function getXrmWebApi(): XrmWebApi | undefined {
  const hostWindow = window as unknown as { Xrm?: { WebApi?: XrmWebApi } };
  try {
    const parentWindow = window.parent as unknown as { Xrm?: { WebApi?: XrmWebApi } };
    return hostWindow.Xrm?.WebApi ?? parentWindow.Xrm?.WebApi;
  } catch {
    return hostWindow.Xrm?.WebApi;
  }
}

function getStringValue(record: XrmRecord, fieldName: string): string {
  const value = record[fieldName];
  return typeof value === 'string' ? value : '';
}

function getFormattedValue(record: XrmRecord, fieldName: string): string {
  return getStringValue(record, `${fieldName}${FORMATTED_VALUE_SUFFIX}`);
}

export function getOptionSetLabel(
  optionSet: Record<string | number, string>,
  value: string | number | null | undefined,
): string {
  if (value === null || value === undefined) return '';
  return (optionSet as any)[value] ?? (optionSet as any)[String(value)] ?? '';
}

function normalizeContactId(contactId: string): string {
  return contactId.replace(/[{}]/g, '');
}

function calculateAgeFromDate(rawDate: string): number {
  if (!rawDate) return 0;
  const birthdate = new Date(rawDate);
  if (Number.isNaN(birthdate.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const birthdayReached =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate());
  if (!birthdayReached) age -= 1;
  return age >= 0 ? age : 0;
}

function formatDateForInput(dateStr: string): string {
  if (!dateStr) return '';
  // Handle DD.MM.YYYY format
  if (dateStr.includes('.')) {
    const parts = dateStr.split('.');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  return dateStr;
}

export function mapSex(raw: string | number | null | undefined): string {
  if (typeof raw === 'string') {
    const s = raw.toLowerCase();
    if (s.startsWith('m') || s === '1') return 'm';
    if (s.startsWith('w') || s.startsWith('f') || s === '2') return 'w';
  }
  if (raw === 1) return 'm';
  if (raw === 2) return 'w';
  return 'd';
}

// Mappt verschiedene Schreibweisen (Mock 'ARF (Kind)', Dataverse-Enum 'ARF_Kind_')
// auf eine gueltige Flow-Gruppe basierend auf den neuen Anforderungen.
export function mapClientGroup(avaClientGroup: string, age: number): string {
  const isAdult = age >= 18;
  const isUnder14 = age < 14;

  if (config.groups.some(g => g.id === avaClientGroup)) return avaClientGroup;

  const normalized = (avaClientGroup || '').toLowerCase();

  // ARF = 100000002 -> flows "ARF_ARM"
  if (normalized === 'arf' || normalized === '100000002') {
    return 'ARF_ARM';
  }

  // ARFKind = 100000003
  if (normalized.includes('arf_kind') || normalized === '100000003') {
    if (isUnder14) return 'Kind_FAM_ARM_K_ARF_K_UMF_K';
    if (isAdult) return 'ARF_K_ARM_K_Erwachsene';
    // 14-18 logic is handled in App.tsx via modal, default to child flow
    return 'Kind_FAM_ARM_K_ARF_K_UMF_K';
  }

  // ARM = 100000004 -> flows "ARF_ARM"
  if (normalized === 'arm' || normalized === '100000004') {
    return 'ARF_ARM';
  }

  // ARMKind = 100000007
  if (normalized.includes('arm_kind') || normalized === '100000007') {
    if (isUnder14) return 'Kind_FAM_ARM_K_ARF_K_UMF_K';
    if (isAdult) return 'ARF_K_ARM_K_Erwachsene';
    return 'Kind_FAM_ARM_K_ARF_K_UMF_K';
  }

  // Familie = 100000005
  if (normalized === 'familie' || normalized === '100000005') {
    if (isUnder14) return 'Kind_FAM_ARM_K_ARF_K_UMF_K';
    if (isAdult) return 'FAM_Erwachsene';
    return 'Kind_FAM_ARM_K_ARF_K_UMF_K';
  }

  // UMF = 100000000 -> flows UMF_Kind
  if (normalized === 'umf' || normalized === '100000000') {
    return 'UMF_Kind';
  }

  // UMFKind = 100000006
  if (normalized.includes('umf_kind') || normalized === '100000006') {
    if (age >= 14) return 'UMF_Kind';
    return 'Kind_FAM_ARM_K_ARF_K_UMF_K';
  }

  // uUMF = 100000001 -> flows uUMF_Kind
  if (normalized === 'uumf' || normalized === '100000001') {
    return 'uUMF_Kind';
  }

  // Fallback
  return isAdult ? 'ARF_ARM' : 'Kind_FAM_ARM_K_ARF_K_UMF_K';
}

export function mapMotherTongueToLanguage(motherTongue: string): string {
  if (!motherTongue) return 'de';
  const mt = motherTongue.toLowerCase();
  const found = config.languages.find(l => l.label.toLowerCase() === mt || l.id === mt);
  return found ? found.id : 'de';
}

// --- Family parsing (legacy Mock-Format) ---

export function parseSingleMember(part: string): FamilyMember {
  const match = part.match(/^(.*?)\s*\((.*?)\)$/);
  if (!match) return { name: part.trim(), ifaNumber: '' };
  const name = match[1].trim();
  const details = match[2].split(',').map(s => s.trim());
  let ifaNumber = '', sex = '', birthDate = '';
  if (details.length === 2) {
    [ifaNumber, birthDate] = details;
  } else if (details.length === 3) {
    [ifaNumber, sex, birthDate] = details;
  } else if (details.length === 1) {
    ifaNumber = details[0];
  }
  const isMinor = birthDate ? isMinorCheck(birthDate) : false;
  return { name, ifaNumber, sex, birthDate, isMinor };
}

function parseFamilyMembers(str: string): FamilyMember[] {
  if (!str) return [];
  const parts = str.split(/,(?![^(]*\))/);
  return parts
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(parseSingleMember);
}

/**
 * Zentralisierte Normalisierung von Kontakt-Daten (Dataverse/Mock) zu ClientData.
 */
export function normalizeContactToClientData(record: Partial<Contacts>): ClientData {
  const contactId = record.contactid || '';
  const rawBirthdate = typeof record.ava_birthdate === 'string' ? record.ava_birthdate : '';
  const birthDate = formatDateForInput(rawBirthdate);

  // Alter: Prioritaet auf explizites Feld, sonst berechnen
  let age = 0;
  if (record.ava_age !== undefined && record.ava_age !== null) {
    age = parseInt(String(record.ava_age));
  } else {
    age = calculateAgeFromDate(birthDate);
  }

  const clientGroupRaw =
    record.ava_clientgroupname ||
    getOptionSetLabel(Contactsava_clientgroup, record.ava_clientgroup);

  const motherTongue =
    record.ava_mothertonguename ||
    getOptionSetLabel(Contactsava_mothertongue, record.ava_mothertongue);

  const sexLabel =
    record.gendercodename ||
    getOptionSetLabel(Contactsgendercode, record.gendercode);

  const familyStatus =
    record.familystatuscodename ||
    getOptionSetLabel(Contactsfamilystatuscode, record.familystatuscode);

  const clientData: ClientData = {
    id: contactId,
    ifaNumber: String(record.ava_ifanumbertext || ''),
    firstName: record.firstname || '',
    lastName: record.lastname || '',
    sex: mapSex(record.gendercode || sexLabel),
    birthDate: birthDate,
    age,
    nationality: record.ava_nationalitystateidname || (typeof record.ava_nationalitystateid === 'string' ? record.ava_nationalitystateid : ''),
    familyStatus,
    motherTongue,
    groupId: mapClientGroup(clientGroupRaw || String(record.ava_clientgroup || ''), age),
    clientGroupCode: record.ava_clientgroup !== undefined && record.ava_clientgroup !== null ? String(record.ava_clientgroup) : undefined,
    language: mapMotherTongueToLanguage(motherTongue),
    familyId: record._ava_familyid_value,
  };

  // Optionale Familieninfos (oft in Mock-Daten enthalten)
  const anyRecord = record as any;
  if (anyRecord.ava_familienmitglieder) {
    clientData.familyMembers = parseFamilyMembers(anyRecord.ava_familienmitglieder);
  }
  if (anyRecord.ava_anzahlfamilienmitglieder !== undefined) {
    clientData.numFamilyMembers = parseInt(anyRecord.ava_anzahlfamilienmitglieder);
  }

  return clientData;
}

// --- Echter Dataverse-Fetch ---

export async function fetchClientById(contactId: string): Promise<ClientData | null> {
  const id = normalizeContactId(contactId);
  if (!id) return null;

  // 1. Power Apps SDK
  try {
    const result = await ContactsService.get(id, {
      select: [
        'contactid',
        'ava_ifanumbertext',
        'firstname',
        'lastname',
        'gendercode',
        'ava_birthdate',
        'ava_mothertongue',
        'ava_clientgroup',
        '_ava_familyid_value',
        'familystatuscode',
        'ava_nationalitystateid'
      ],
    });
    if (result.success && result.data) {
      return normalizeContactToClientData(result.data as Partial<Contacts>);
    }
  } catch (err) {
    console.warn('ContactsService.get failed', err);
  }

  // 2. Xrm.WebApi Fallback (Modell-driven Apps)
  const xrm = getXrmWebApi();
  if (xrm) {
    try {
      const record = await xrm.retrieveRecord(
        'contact',
        id,
        '?$select=ava_ifanumbertext,firstname,lastname,gendercode,ava_birthdate,ava_mothertongue,ava_clientgroup,_ava_familyid_value,familystatuscode,ava_nationalitystateid',
      );
      // Xrm.WebApi returns formatted values in @OData.Community.Display.V1.FormattedValue
      // normalizeContactToClientData handles this via getOptionSetLabel fallback if names are missing
      return normalizeContactToClientData(record as unknown as Partial<Contacts>);
    } catch (err) {
      console.warn('Xrm.WebApi.retrieveRecord failed', err);
    }
  }

  return null;
}

export async function fetchFamilyMembers(familyId: string, excludeContactId: string): Promise<ClientData[]> {
  const normalizedExclude = excludeContactId.replace(/[{}]/g, '').toLowerCase();

  // Mock handling
  if (familyId === 'FAMILY1' || (typeof window !== 'undefined' && window.location.search.includes('mock=1'))) {
    const data = mockCrmData;
    return data.value
      .filter(c => c._ava_familyid_value === familyId && c.contactid?.toLowerCase() !== normalizedExclude)
      .map(c => normalizeContactToClientData(c as unknown as Partial<Contacts>));
  }

  const select = '$select=contactid,ava_ifanumbertext,firstname,lastname,gendercode,ava_birthdate,ava_mothertongue,ava_clientgroup,_ava_familyid_value,familystatuscode';
  const filter = `$filter=_ava_familyid_value eq ${familyId} and statecode eq 0`;

  // 1. Xrm.WebApi (bevorzugt, da kein SDK-Batch-Support fuer Filter)
  const xrm = getXrmWebApi();
  if (xrm) {
    try {
      const result = await xrm.retrieveMultipleRecords('contact', `?${select}&${filter}`);
      const records: XrmRecord[] = (result as any).entities ?? [];
      return records
        .map(r => {
          const id = String(r['contactid'] ?? '').replace(/[{}]/g, '').toLowerCase();
          return { id, record: r };
        })
        .filter(({ id }) => id && id !== normalizedExclude)
        .map(({ record }) => normalizeContactToClientData(record as unknown as Partial<Contacts>));
    } catch (err) {
      console.warn('fetchFamilyMembers Xrm.WebApi failed', err);
    }
  }

  // 2. Power Apps SDK Fallback
  try {
    const result = await ContactsService.getAll({
      select: ['contactid', 'ava_ifanumbertext', 'firstname', 'lastname', 'gendercode', 'ava_birthdate', 'ava_mothertongue', 'ava_clientgroup', '_ava_familyid_value', 'familystatuscode'],
      filter: `_ava_familyid_value eq ${familyId} and statecode eq 0`,
    });
    if (result.success && result.data) {
      return (result.data as Partial<Contacts>[])
        .filter(r => {
          const id = String(r.contactid ?? '').replace(/[{}]/g, '').toLowerCase();
          return id && id !== normalizedExclude;
        })
        .map(r => normalizeContactToClientData(r));
    }
  } catch (err) {
    console.warn('fetchFamilyMembers ContactsService.getAll failed', err);
  }

  return [];
}

// --- Mock-Lookup (fuer ?mock=1 oder ManualStartForm-IFA-Suche) ---

export async function fetchClientByIfa(ifaNumber: string): Promise<ClientData> {
  const data = mockCrmData;
  if (!data.value || data.value.length === 0) {
    throw new Error(`Kein Klient mit IFA-Nummer ${ifaNumber} gefunden.`);
  }

  const contact = data.value.find(c => String(c.ava_ifanumbertext) === String(ifaNumber));
  if (!contact) {
    throw new Error(`Kein Klient mit IFA-Nummer ${ifaNumber} in Testdaten gefunden.`);
  }

  return normalizeContactToClientData(contact as unknown as Partial<Contacts>);
}

export interface AssessmentSubmitPayload {
  contactId?: string;
  beurteilungId?: string;
  answers: Record<string, any>;
  assessments: Record<string, boolean>;
  qualities?: Record<string, number[]>;
  clientData?: ClientData;
  exportData: {
    metadata: {
      timestamp: string;
      client?: {
        name: string;
        ifa: string;
        ava_clientgroup: string;
      };
    };
    evaluations: Record<string, any>;
  };
}

const CATEGORY_ID_MAP: Record<string, ava_bbu_kategoriebedurfniskategorie> = {
  cat_1a: ava_bbu_kategoriebedurfniskategorie.BegleiteterMinderjhriger,
  cat_1b: ava_bbu_kategoriebedurfniskategorie.UnbegleitetervonElterngetrenntlebenderMinderjhriger,
  cat_5: ava_bbu_kategoriebedurfniskategorie.HomosexuellebisexuelleinterodertransgeschlechtlichePersonen,
  cat_6: ava_bbu_kategoriebedurfniskategorie.AlleinerziehendermitminderjhrigeminKindern,
  cat_7: ava_bbu_kategoriebedurfniskategorie.PotenziellesOpfervonMenschenoderKinderhandel,
  cat_9: ava_bbu_kategoriebedurfniskategorie.PersondieaneinerkrankheitswertigenbelastungsabhngigenStrungeinerpsychischenErkrankungvonvergleichbaremGewichtodereinersonstigenschwerenErkrankungleidet,
  cat_10a: ava_bbu_kategoriebedurfniskategorie.PotenziellesOpfervonFolter,
  cat_10c: ava_bbu_kategoriebedurfniskategorie.PersondieVergewaltigungerlittenhat,
  cat_10d: ava_bbu_kategoriebedurfniskategorie.PotenziellesOpfervonZwangseheoderKinderheirat,
  cat_10e: ava_bbu_kategoriebedurfniskategorie.PersondieanderenschwerenFormenvonpsychischerphysischerundsexuellerGewaltausgesetztwar,
  sonstiges: ava_bbu_kategoriebedurfniskategorie.Sonstiges,
};

function getDateOnlyValue(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function buildAssessmentName(clientData?: ClientData): string {
  if (clientData) {
    return `Bedürfnisbeurteilung ${clientData.firstName} ${clientData.lastName}`.trim();
  }

  return 'Bedürfnisbeurteilung';
}

function getCurrentUserId(): string {
  const hostWindow = window as unknown as { Xrm?: { Utility?: { getGlobalContext?: () => { userSettings?: { userId?: string } } } } };

  try {
    const parentWindow = window.parent as typeof hostWindow;
    const userId =
      hostWindow.Xrm?.Utility?.getGlobalContext?.().userSettings?.userId ??
      parentWindow.Xrm?.Utility?.getGlobalContext?.().userSettings?.userId;

    return typeof userId === 'string' ? userId.replace(/[{}]/g, '') : '';
  } catch {
    const userId = hostWindow.Xrm?.Utility?.getGlobalContext?.().userSettings?.userId;
    return typeof userId === 'string' ? userId.replace(/[{}]/g, '') : '';
  }
}

async function getLatestAssessmentForContact(
  contactId: string,
): Promise<Ava_bbu_beurteilungbesondererbedurfnisses | null> {
  console.log('[CRM] Suche aktuelle Beurteilung fuer Kontakt:', contactId);

  const result = await Ava_bbu_beurteilungbesondererbedurfnissesService.getAll({
    select: [
      ava_bbu_beurteilungbesondererbedurfnisseMetadata.primaryIdAttribute,
      '_ava_bbu_standort_value',
      'createdon',
    ],
    filter: `_ava_bbu_klient_value eq ${contactId}`,
    orderBy: ['createdon desc'],
    top: 1,
  });

  if (!result.success || !result.data?.length) {
    console.log('[CRM] Keine bestehende Beurteilung gefunden (Neuanlage).');
    return null;
  }

  const found = result.data[0];
  console.log('[CRM] Bestehende Beurteilung gefunden:', found.ava_bbu_beurteilungbesondererbedurfnisseid, '| Standort-ID:', found._ava_bbu_standort_value ?? '(leer)');
  return found;
}

async function getSiteIdForSubmit(
  contactId: string,
  latestAssessment: Ava_bbu_beurteilungbesondererbedurfnisses | null,
): Promise<string> {
  const siteIdFromAssessment = latestAssessment?._ava_bbu_standort_value ?? '';
  if (siteIdFromAssessment) {
    return siteIdFromAssessment;
  }

  const contactResult = await ContactsService.get(contactId, { select: ['_ava_currentsiteid_value'] });
  const siteIdFromContact =
    contactResult.success && contactResult.data
      ? String((contactResult.data as unknown as Record<string, unknown>)._ava_currentsiteid_value ?? '')
      : '';
  if (siteIdFromContact) {
    return siteIdFromContact;
  }

  const userId = getCurrentUserId();
  if (!userId) {
    return '';
  }

  const userResult = await SystemusersService.get(userId, { select: ['_ava_siteid_value'] });
  return userResult.success && userResult.data
    ? String((userResult.data as unknown as Record<string, unknown>)._ava_siteid_value ?? '')
    : '';
}

type AssessmentUpsertData = {
  ava_name: string;
  ava_bbu_allgemeinebeurteilungdurchgefuhrtam: string;
  ava_bbu_medbeurteilungnotwendig?: string;
  ava_bbu_psycheinschatzungsbedarffestgestell?: string;
  'ava_bbu_Klient@odata.bind'?: string;
  'ava_bbu_Standort@odata.bind'?: string;
  'ava_bbu_Gesprachsteilnehmerin@odata.bind'?: string;
};

function buildAssessmentUpdate(
  payload: AssessmentSubmitPayload,
  siteId: string,
  isCreate: boolean,
): AssessmentUpsertData {
  const today = getDateOnlyValue();
  const update: AssessmentUpsertData = {
    ava_name: buildAssessmentName(payload.clientData),
    ava_bbu_allgemeinebeurteilungdurchgefuhrtam: today,
  };

  if (payload.assessments['5.9'] || payload.assessments['10a.9']) {
    update.ava_bbu_medbeurteilungnotwendig = today;
  }

  if (
    payload.assessments['9b.10'] ||
    payload.assessments['10a.8'] ||
    payload.assessments['10c.8'] ||
    payload.assessments['10e.13']
  ) {
    update.ava_bbu_psycheinschatzungsbedarffestgestell = today;
  }

  // Question 0.1a selection -> lookup to contact
  const attendeeId = payload.answers['0.1a']?.selection; // stores member ID from dropdown
  if (attendeeId && attendeeId.length > 5) {
     update['ava_bbu_Gesprachsteilnehmerin@odata.bind'] = `/${contactMetadata.collectionName}(${normalizeContactId(attendeeId)})`;
  }

  if (isCreate) {
    update['ava_bbu_Klient@odata.bind'] = `/${contactMetadata.collectionName}(${payload.contactId})`;
    update['ava_bbu_Standort@odata.bind'] = `/msdyn_operationalsites(${siteId})`;
  }

  return update;
}

async function replaceGeneralCategories(
  assessmentId: string,
  payload: AssessmentSubmitPayload,
): Promise<void> {
  const existingResult = await Ava_bbu_bedurfniskategoriesService.getAll({
    select: [ava_bbu_bedurfniskategorieMetadata.primaryIdAttribute],
    filter:
      `_ava_beurteilungbesondererbedurfnisseid_value eq ${assessmentId}` +
      ` and ava_bbu_typ eq ${ava_bbu_typbedurfniskategorie.AllgemeineBeurteilung}`,
  });

  if (existingResult.success && existingResult.data?.length) {
    await Promise.all(
      existingResult.data.map(entity =>
        entity.ava_bbu_bedurfniskategorieid
          ? Ava_bbu_bedurfniskategoriesService.delete(entity.ava_bbu_bedurfniskategorieid)
          : Promise.resolve(),
      ),
    );
  }

  const activeCategories = config.categories.filter((c: any) =>
    payload.assessments[c.id] || (c.riskAssessmentId && payload.assessments[c.riskAssessmentId])
  );

  console.log(
    '[CRM] Aktive Kategorien (%d/%d):',
    activeCategories.length,
    config.categories.length,
    activeCategories.map((c: any) => `${c.id}=${c.name}`),
  );

  const relativesInAustriaNotes = payload.answers['1b.8']?.notes || '';
  const relativesInEuNotes = payload.answers['1b.9.1']?.notes || '';
  const relativesNotes = [relativesInAustriaNotes, relativesInEuNotes].filter(Boolean).join('\n').trim();

  // Logic for Category 5: only fill pronouns if 5.3-5.7 has at least one "Ja"
  const hasJaInCat5Range = ['5.3', '5.3.1', '5.4', '5.5', '5.6', '5.7', '5.7.1'].some(id => payload.answers[id]?.answer === 'Ja');
  const pronounsValue = hasJaInCat5Range ? (payload.answers['5.7']?.notes || payload.answers['5.7.1']?.notes || '') : '';

  for (const catConf of activeCategories) {
    const crmEnum = CATEGORY_ID_MAP[catConf.id];
    if (crmEnum === undefined) {
       console.warn(`[CRM] Keine Mapping-ID für Kategorie ${catConf.id} gefunden.`);
       continue;
    }

    let qualityValues = payload.qualities?.[catConf.id] || [];
    // Merge qualities from sub-assessments (e.g. 6.6 qualities merged into cat_6 record)
    if (catConf.riskAssessmentId && payload.qualities?.[catConf.riskAssessmentId]) {
      const subQualities = payload.qualities[catConf.riskAssessmentId];
      qualityValues = Array.from(new Set([...qualityValues, ...subQualities]));
    }

    const isAnalphabetismus = payload.assessments['11.3'] === true || payload.assessments['11.3.1'] === true;

    const base = {
      ava_name: catConf.name,
      ava_bbu_typ: ava_bbu_typbedurfniskategorie.AllgemeineBeurteilung,
      ava_bbu_kategorie: crmEnum,
      // Only write "other fields" (risk factors, relatives info, etc.) if they are actually TRUE
      ava_bbu_risikofaktorenliegenvor: (catConf.riskAssessmentId && payload.assessments[catConf.riskAssessmentId]) ? true : undefined,
      ava_bbu_angabeverwandtebezugspersoneninoste: (catConf.id === 'cat_1b' && payload.assessments['1b.15']) ? true : undefined,
      ava_bbu_angabeverwandtebezugspersonineu: (catConf.id === 'cat_1b' && payload.assessments['1b.16']) ? true : undefined,
      ava_bbu_infozuverwandtenbezugspersonen: catConf.id === 'cat_1b' && relativesNotes ? relativesNotes : undefined,
      ava_bbu_pronomen: catConf.id === 'cat_5' && pronounsValue ? pronounsValue : undefined,
      ava_qualitatcode: qualityValues.length > 0 ? qualityValues : undefined,
      ava_sonstigebesonderebedurfnisse: (catConf.id === 'sonstiges' && isAnalphabetismus) ? [100000004] : undefined, // Analphabetismus
      'ava_BeurteilungbesondererBedurfnisseId@odata.bind':
        `/${ava_bbu_beurteilungbesondererbedurfnisseMetadata.collectionName}(${assessmentId})`,
      'ava_bbu_Klient@odata.bind': `/${contactMetadata.collectionName}(${payload.contactId})`,
    };

    const createCategory = base as unknown as Parameters<typeof Ava_bbu_bedurfniskategoriesService.create>[0];

    console.log('[CRM] Erstelle Kategorie:', catConf.name, '| assessmentId:', catConf.id, '| crmEnum:', crmEnum);
    const createResult = await Ava_bbu_bedurfniskategoriesService.create(createCategory);
    if (!createResult.success) {
      const details =
        createResult.error instanceof Error
          ? createResult.error.message
          : typeof createResult.error === 'string'
            ? createResult.error
            : JSON.stringify(createResult.error ?? '');
      throw new Error(`Bedurfniskategorie "${catConf.name}" konnte nicht erstellt werden${details ? `: ${details}` : ''}.`);
    }
  }
}

export async function submitAssessment(payload: AssessmentSubmitPayload): Promise<{ success: boolean; id?: string }> {
  if (!payload.contactId) {
    throw new Error('Fur den CRM-Submit fehlt die Kontakt-ID.');
  }

  const contactId = normalizeContactId(payload.contactId);

  let assessmentId = payload.beurteilungId ? normalizeContactId(payload.beurteilungId) : '';

  if (assessmentId) {
    console.log('[CRM] Verwende uebergebene Beurteilungs-ID:', assessmentId);
    const latestAssessment = await getLatestAssessmentForContact(contactId);
    const siteId = await getSiteIdForSubmit(contactId, latestAssessment);
    if (!siteId) {
      throw new Error('Kein Standort fur die Bedurfnisbeurteilung gefunden.');
    }
    const updateResult = await Ava_bbu_beurteilungbesondererbedurfnissesService.update(
      assessmentId,
      buildAssessmentUpdate(payload, siteId, false) as Parameters<typeof Ava_bbu_beurteilungbesondererbedurfnissesService.update>[1],
    );
    if (!updateResult.success) {
      throw new Error('Beurteilung konnte nicht aktualisiert werden.');
    }
  } else {
    const latestAssessment = await getLatestAssessmentForContact(contactId);
    const siteId = await getSiteIdForSubmit(contactId, latestAssessment);
    if (!siteId) {
      throw new Error('Kein Standort fur die Bedurfnisbeurteilung gefunden.');
    }
    assessmentId = latestAssessment?.ava_bbu_beurteilungbesondererbedurfnisseid ?? '';

    if (assessmentId) {
      const updateResult = await Ava_bbu_beurteilungbesondererbedurfnissesService.update(
        assessmentId,
        buildAssessmentUpdate(payload, siteId, false) as Parameters<typeof Ava_bbu_beurteilungbesondererbedurfnissesService.update>[1],
      );
      if (!updateResult.success) {
        throw new Error('Beurteilung konnte nicht aktualisiert werden.');
      }
    } else {
      const createResult = await Ava_bbu_beurteilungbesondererbedurfnissesService.create(
        buildAssessmentUpdate(payload, siteId, true) as Parameters<typeof Ava_bbu_beurteilungbesondererbedurfnissesService.create>[0],
      );
      if (!createResult.success || !createResult.data?.ava_bbu_beurteilungbesondererbedurfnisseid) {
        throw new Error('Beurteilung konnte nicht erstellt werden.');
      }
      assessmentId = normalizeContactId(createResult.data.ava_bbu_beurteilungbesondererbedurfnisseid);
    }
  }

  await replaceGeneralCategories(assessmentId, payload);

  return { success: true, id: assessmentId };
}

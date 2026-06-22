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

function getOptionSetLabel(
  optionSet: Record<string | number, string>,
  value: string | number | null | undefined,
): string {
  if (value === null || value === undefined) return '';
  return optionSet[value] ?? optionSet[String(value)] ?? '';
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
  if (dateStr.includes('.')) {
    const parts = dateStr.split('.');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  return dateStr;
}

function mapSex(raw: string | number | null | undefined): string {
  if (typeof raw === 'string') {
    const s = raw.toLowerCase();
    if (s.startsWith('m')) return 'm';
    if (s.startsWith('w') || s.startsWith('f')) return 'w';
  }
  if (raw === 1) return 'm';
  if (raw === 2) return 'w';
  return 'd';
}

// Mappt verschiedene Schreibweisen (Mock 'ARF (Kind)', Dataverse-Enum 'ARF_Kind_')
// auf eine gueltige Flow-Gruppe.
export function mapClientGroup(avaClientGroup: string, age: number): string {
  const isAdult = age >= 18;
  if (config.groups.some(g => g.id === avaClientGroup)) return avaClientGroup;

  const normalized = (avaClientGroup || '').toLowerCase();
  const isKindVariant = normalized.includes('kind') || normalized.includes('(kind)');

  if (normalized.startsWith('arf') || normalized.startsWith('arm')) {
    if (isKindVariant) {
      return isAdult ? 'ARF_K_ARM_K_Erwachsene' : 'Kind_FAM_ARM_K_ARF_K_UMF_K';
    }
    return isAdult ? 'ARF_ARM' : 'Kind_FAM_ARM_K_ARF_K_UMF_K';
  }
  if (normalized.startsWith('familie') || normalized === 'fam_erwachsene') {
    return isAdult ? 'FAM_Erwachsene' : 'Kind_FAM_ARM_K_ARF_K_UMF_K';
  }
  if (normalized.startsWith('umf') || normalized.startsWith('uumf')) {
    return 'uUMF_Kind';
  }
  return isAdult ? 'ARF_ARM' : 'Kind_FAM_ARM_K_ARF_K_UMF_K';
}

function mapMotherTongueToLanguage(motherTongue: string): string {
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

// --- Echter Dataverse-Fetch ---

function buildClientDataFromContact(contactId: string, record: Partial<Contacts>): ClientData {
  const rawBirthdate = typeof record.ava_birthdate === 'string' ? record.ava_birthdate : '';
  const age = calculateAgeFromDate(rawBirthdate);

  const clientGroupRaw =
    typeof record.ava_clientgroupname === 'string' && record.ava_clientgroupname
      ? record.ava_clientgroupname
      : getOptionSetLabel(Contactsava_clientgroup, record.ava_clientgroup);

  const motherTongue =
    typeof record.ava_mothertonguename === 'string' && record.ava_mothertonguename
      ? record.ava_mothertonguename
      : getOptionSetLabel(Contactsava_mothertongue, record.ava_mothertongue);

  const sexLabel =
    typeof record.gendercodename === 'string' && record.gendercodename
      ? record.gendercodename
      : getOptionSetLabel(Contactsgendercode, record.gendercode);

  return {
    id: contactId,
    ifaNumber: typeof record.ava_ifanumbertext === 'string' ? record.ava_ifanumbertext : '',
    firstName: typeof record.firstname === 'string' ? record.firstname : '',
    lastName: typeof record.lastname === 'string' ? record.lastname : '',
    sex: mapSex(sexLabel),
    birthDate: rawBirthdate,
    age,
    nationality: '',
    familyStatus: '',
    motherTongue,
    groupId: mapClientGroup(clientGroupRaw, age),
    language: mapMotherTongueToLanguage(motherTongue),
    familyId: typeof record._ava_familyid_value === 'string' ? record._ava_familyid_value : undefined,
  };
}

function buildClientDataFromXrm(contactId: string, record: XrmRecord): ClientData {
  const rawBirthdate = getStringValue(record, 'ava_birthdate');
  const age = calculateAgeFromDate(rawBirthdate);
  const clientGroupRaw = getFormattedValue(record, 'ava_clientgroup');
  const motherTongue = getFormattedValue(record, 'ava_mothertongue');
  const sexLabel = getFormattedValue(record, 'gendercode');

  return {
    id: contactId,
    ifaNumber: getStringValue(record, 'ava_ifanumbertext'),
    firstName: getStringValue(record, 'firstname'),
    lastName: getStringValue(record, 'lastname'),
    sex: mapSex(sexLabel),
    birthDate: rawBirthdate,
    age,
    nationality: '',
    familyStatus: '',
    motherTongue,
    groupId: mapClientGroup(clientGroupRaw, age),
    language: mapMotherTongueToLanguage(motherTongue),
    familyId: getStringValue(record, '_ava_familyid_value') || undefined,
  };
}

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
      ],
    });
    if (result.success && result.data) {
      return buildClientDataFromContact(id, result.data as Partial<Contacts>);
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
        '?$select=ava_ifanumbertext,firstname,lastname,gendercode,ava_birthdate,ava_mothertongue,ava_clientgroup,_ava_familyid_value',
      );
      return buildClientDataFromXrm(id, record);
    } catch (err) {
      console.warn('Xrm.WebApi.retrieveRecord failed', err);
    }
  }

  return null;
}

export async function fetchFamilyMembers(familyId: string, excludeContactId: string): Promise<ClientData[]> {
  const normalizedExclude = excludeContactId.replace(/[{}]/g, '').toLowerCase();
  const select = '$select=contactid,ava_ifanumbertext,firstname,lastname,gendercode,ava_birthdate,ava_mothertongue,ava_clientgroup,_ava_familyid_value';
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
        .map(({ id, record }) => buildClientDataFromXrm(id, record));
    } catch (err) {
      console.warn('fetchFamilyMembers Xrm.WebApi failed', err);
    }
  }

  // 2. Power Apps SDK Fallback
  try {
    const result = await ContactsService.getAll({
      select: ['contactid', 'ava_ifanumbertext', 'firstname', 'lastname', 'gendercode', 'ava_birthdate', 'ava_mothertongue', 'ava_clientgroup', '_ava_familyid_value'],
      filter: `_ava_familyid_value eq ${familyId} and statecode eq 0`,
    });
    if (result.success && result.data) {
      return (result.data as Partial<Contacts>[])
        .filter(r => {
          const id = String(r.contactid ?? '').replace(/[{}]/g, '').toLowerCase();
          return id && id !== normalizedExclude;
        })
        .map(r => buildClientDataFromContact(String(r.contactid ?? '').replace(/[{}]/g, ''), r));
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

  const birthDateRaw = contact.ava_birthdate || '';
  const age = contact.ava_age || calculateAgeFromDate(formatDateForInput(birthDateRaw));
  const groupRaw = contact.ava_clientgroup || '';

  const clientData: ClientData = {
    id: contact.contactid || `manual_${contact.ava_ifanumbertext}`,
    ifaNumber: String(contact.ava_ifanumbertext),
    firstName: contact.firstname || '',
    lastName: contact.lastname || '',
    sex: mapSex(contact.gendercode),
    birthDate: formatDateForInput(birthDateRaw),
    age,
    nationality: contact.ava_nationalitystateid || '',
    familyStatus: contact.familystatuscode || '',
    motherTongue: contact.ava_mothertongue || '',
    groupId: mapClientGroup(groupRaw, age),
    language: mapMotherTongueToLanguage(contact.ava_mothertongue || ''),
    familyId: contact._ava_familyid_value,
  };

  const membersString = (contact as any).ava_familienmitglieder || '';
  const count = (contact as any).ava_anzahlfamilienmitglieder || 0;
  clientData.familyMembers = parseFamilyMembers(membersString);
  clientData.numFamilyMembers = count;

  return clientData;
}

export interface AssessmentSubmitPayload {
  contactId?: string;
  beurteilungId?: string;
  answers: Record<string, any>;
  assessments: Record<string, boolean>;
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

const GENERAL_CATEGORY_MAPPINGS: Array<{
  assessmentId: string;
  category: ava_bbu_kategoriebedurfniskategorie;
  name: string;
}> = [
  {
    assessmentId: '1a.13',
    category: ava_bbu_kategoriebedurfniskategorie.BegleiteterMinderjhriger,
    name: 'Begleitete*r Minderjährige*r',
  },
  {
    assessmentId: '1b.14',
    category: ava_bbu_kategoriebedurfniskategorie.UnbegleitetervonElterngetrenntlebenderMinderjhriger,
    name: 'Unbegleitete*r von Eltern getrennt lebende*r Minderjährige*r',
  },
  {
    assessmentId: '5.8',
    category: ava_bbu_kategoriebedurfniskategorie.HomosexuellebisexuelleinterodertransgeschlechtlichePersonen,
    name: 'Homosexuelle, bisexuelle, inter- oder transgeschlechtliche Personen',
  },
  {
    assessmentId: '6.6',
    category: ava_bbu_kategoriebedurfniskategorie.AlleinerziehendermitminderjhrigeminKindern,
    name: 'Alleinerziehende*r mit minderjährigen Kindern',
  },
  {
    assessmentId: '7.23',
    category: ava_bbu_kategoriebedurfniskategorie.PotenziellesOpfervonMenschenoderKinderhandel,
    name: 'Potenzielles Opfer von Menschen- oder Kinderhandel',
  },
  {
    assessmentId: '10d.7',
    category: ava_bbu_kategoriebedurfniskategorie.PotenziellesOpfervonZwangseheoderKinderheirat,
    name: 'Potenzielles Opfer von Zwangsehe oder Kinderheirat',
  },
  {
    assessmentId: '10c.7',
    category: ava_bbu_kategoriebedurfniskategorie.PersondieVergewaltigungerlittenhat,
    name: 'Person, die Vergewaltigung erlitten hat',
  },
  {
    assessmentId: '10a.7',
    category: ava_bbu_kategoriebedurfniskategorie.PotenziellesOpfervonFolter,
    name: 'Potenzielles Opfer von Folter',
  },
];

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

  const activeGeneralCategories = GENERAL_CATEGORY_MAPPINGS.filter(mapping => payload.assessments[mapping.assessmentId]);

  console.log(
    '[CRM] Aktive Kategorien (%d/%d):',
    activeGeneralCategories.length,
    GENERAL_CATEGORY_MAPPINGS.length,
    activeGeneralCategories.map(c => `${c.assessmentId}=${c.name}`),
  );

  if (activeGeneralCategories.length === 0) {
    console.log('[CRM] Keine aktiven Kategorien -> assessments-Schluessel:', Object.keys(payload.assessments).filter(k => payload.assessments[k]));
  }
  const relativesInAustriaNotes = payload.answers['1b.8']?.notes || '';
  const relativesInEuNotes = payload.answers['1b.9.1']?.notes || '';
  const relativesNotes = [relativesInAustriaNotes, relativesInEuNotes].filter(Boolean).join('\n').trim();

  for (const category of activeGeneralCategories) {
    const base = {
      ava_name: category.name,
      ava_bbu_typ: ava_bbu_typbedurfniskategorie.AllgemeineBeurteilung,
      ava_bbu_kategorie: category.category,
      ava_bbu_angabeverwandtebezugspersoneninoste: category.assessmentId === '1b.14' ? payload.assessments['1b.15'] === true : undefined,
      ava_bbu_angabeverwandtebezugspersonineu: category.assessmentId === '1b.14' ? payload.assessments['1b.16'] === true : undefined,
      ava_bbu_infozuverwandtenbezugspersonen: category.assessmentId === '1b.14' && relativesNotes ? relativesNotes : undefined,
      'ava_BeurteilungbesondererBedurfnisseId@odata.bind':
        `/${ava_bbu_beurteilungbesondererbedurfnisseMetadata.collectionName}(${assessmentId})`,
      'ava_bbu_Klient@odata.bind': `/${contactMetadata.collectionName}(${payload.contactId})`,
    };

    const createCategory = base as Parameters<typeof Ava_bbu_bedurfniskategoriesService.create>[0];

    console.log('[CRM] Erstelle Kategorie:', category.name, '| assessmentId:', category.assessmentId, '| kategorie-Enum:', category.category);
    const createResult = await Ava_bbu_bedurfniskategoriesService.create(createCategory);
    if (!createResult.success) {
      const details =
        createResult.error instanceof Error
          ? createResult.error.message
          : typeof createResult.error === 'string'
            ? createResult.error
            : JSON.stringify(createResult.error ?? '');
      throw new Error(`Bedurfniskategorie "${category.name}" konnte nicht erstellt werden${details ? `: ${details}` : ''}.`);
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

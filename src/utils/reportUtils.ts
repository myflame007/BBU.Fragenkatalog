import catalogData from '../data/questionCatalog.json';
import config from '../data/config.json';
import { ClientData } from '../services/crmService';
import { contactMetadata } from '../dataverse-gen/entities/Contact';
import { ava_bbu_beurteilungbesondererbedurfnisseMetadata } from '../dataverse-gen/entities/ava_bbu_BeurteilungBesondererBedurfnisse';
import { ava_bbu_kategoriebedurfniskategorie } from '../dataverse-gen/enums/ava_bbu_kategoriebedurfniskategorie';
import { ava_bbu_typbedurfniskategorie } from '../dataverse-gen/enums/ava_bbu_typbedurfniskategorie';

const catalog = catalogData as any;

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

export const prepareExportData = (
  answers: Record<string, any>,
  assessments: Record<string, boolean>,
  clientData?: ClientData | null
) => {
  const medicalIds = ['5.9', '10a.9'];
  const psychologicalIds = ['9b.10', '10a.8', '10c.8', '10e.13'];

  const isMedicalNecessary = medicalIds.some(id => assessments[id]);
  const isPsychologicalNecessary = psychologicalIds.some(id => assessments[id]);

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const evaluations: Record<string, any> = {};

  // 1. Special fields for CRM Export (aggregated fields)
  if (isMedicalNecessary) {
    evaluations.ava_medizinische_einschaetzung_notwendig = {
      id: 'ava_medizinische_einschaetzung_notwendig',
      text: 'Medizinische Einschätzung notwendig',
      result: formattedDate,
      isAggregatedField: true
    };
  }
  if (isPsychologicalNecessary) {
    evaluations.ava_psychologische_einschaetzung_notwendig = {
      id: 'ava_psychologische_einschaetzung_notwendig',
      text: 'Psychologische Einschätzung notwendig',
      result: formattedDate,
      isAggregatedField: true
    };
  }

  // 2. Special items 1b.15 and 1b.16
  evaluations['1b.15'] = {
    id: '1b.15',
    text: 'Verwandte/Bezugspersonen in Österreich',
    result: assessments['1b.15'] ? 'Ja' : 'Nein',
    anmerkung: answers['1b.8']?.notes || ''
  };
  evaluations['1b.16'] = {
    id: '1b.16',
    text: 'Verwandte/Bezugspersonen in EU',
    result: assessments['1b.16'] ? 'Ja' : 'Nein',
    anmerkung: answers['1b.9.1']?.notes || ''
  };

  // 2.1 Pronomen 5.7 / 5.7.1
  const pronouns = answers['5.7']?.notes || answers['5.7.1']?.notes || '';
  if (pronouns) {
    evaluations['cat_5_pronouns'] = {
      id: 'cat_5_pronouns',
      text: 'Pronomen/Name',
      result: 'Ja',
      anmerkung: pronouns
    };
  }

  // 3. Other assessments (standard)
  Object.keys(catalog.questions).forEach(id => {
    const q = catalog.questions[id];
    if (q.type === 'Bewertung' &&
        id !== '1b.15' &&
        id !== '1b.16') {

      evaluations[id] = {
        id,
        text: q.text.de,
        result: assessments[id] ? "Ja" : "Nein"
      };
    }
  });

  // Add explicit illiteracy if triggered
  if (assessments['11.3'] || assessments['11.3.1']) {
    evaluations['risk_illiteracy'] = {
      id: 'risk_illiteracy',
      text: 'Analphabetismus',
      result: 'Ja',
      category: 'Sonstige Besondere Bedürfnisse'
    };
  }

  // 4. Base categories (Immediate)
  const baseCategoryIds = ['cat_1a', 'cat_1b', 'cat_5', 'cat_6'];
  baseCategoryIds.forEach(id => {
    if (assessments[id]) {
      const category = config.categories.find((c: any) => c.id === id.replace('cat_', '')) ||
                       config.categories.find((c: any) => c.id === id);
      evaluations[id] = {
        id,
        text: category?.name || id,
        result: "Ja"
      };
    }
  });

  return {
    metadata: {
      timestamp: new Date().toISOString(),
      client: clientData ? {
        name: `${clientData.firstName} ${clientData.lastName}`,
        ifa: clientData.ifaNumber,
        ava_clientgroup: clientData.groupId
      } : undefined
    },
    evaluations
  };
};

export const prepareCrmPayloadPreview = (
  answers: Record<string, any>,
  assessments: Record<string, boolean>,
  qualities: Record<string, number[]>,
  clientData?: ClientData | null
) => {
  const today = new Date().toISOString().slice(0, 10);
  const parentId = "MOCK_ASSESSMENT_ID";
  const contactId = clientData?.id || "MOCK_CONTACT_ID";

  const buildAssessmentName = () => {
    if (clientData) {
      return `Bedürfnisbeurteilung ${clientData.firstName} ${clientData.lastName}`.trim();
    }
    return 'Bedürfnisbeurteilung';
  };

  // 1. Parent Record: ava_bbu_beurteilungbesondererbedurfnisse
  const beurteilungUpdate: Record<string, any> = {
    ava_name: buildAssessmentName(),
    ava_bbu_allgemeinebeurteilungdurchgefuhrtam: today,
  };

  if (assessments['5.9'] || assessments['10a.9']) {
    beurteilungUpdate.ava_bbu_medbeurteilungnotwendig = today;
  }

  if (
    assessments['9b.10'] ||
    assessments['10a.8'] ||
    assessments['10c.8'] ||
    assessments['10e.13']
  ) {
    beurteilungUpdate.ava_bbu_psycheinschatzungsbedarffestgestell = today;
  }

  const attendeeId = answers['0.1a']?.selection;
  if (attendeeId && attendeeId.length > 5) {
    beurteilungUpdate['ava_bbu_Gesprachsteilnehmerin@odata.bind'] = `/${contactMetadata.collectionName}(${attendeeId})`;
  }

  beurteilungUpdate['ava_bbu_Klient@odata.bind'] = `/${contactMetadata.collectionName}(${contactId})`;
  beurteilungUpdate['ava_bbu_Standort@odata.bind'] = `/msdyn_operationalsites(MOCK_SITE_ID)`;

  // 2. Child Records: active categories mapping to ava_bbu_bedurfniskategorie
  const activeCategories = config.categories.filter((c: any) =>
    c.id !== 'cat_9' && (assessments[c.id] || (c.riskAssessmentId && assessments[c.riskAssessmentId]))
  );

  const relativesInAustriaNotes = answers['1b.8']?.notes || '';
  const relativesInEuNotes = answers['1b.9.1']?.notes || '';
  const relativesNotes = [relativesInAustriaNotes, relativesInEuNotes].filter(Boolean).join('\n').trim();
  const pronounsValue = answers['5.7']?.notes || answers['5.7.1']?.notes || '';

  const categoriesPayloads = activeCategories.map((catConf: any) => {
    const crmEnum = CATEGORY_ID_MAP[catConf.id];

    let qualityValues = qualities?.[catConf.id] || [];
    if (catConf.riskAssessmentId && qualities?.[catConf.riskAssessmentId]) {
      const subQualities = qualities[catConf.riskAssessmentId];
      qualityValues = Array.from(new Set([...qualityValues, ...subQualities]));
    }

    const isAnalphabetismus = assessments['11.3'] === true || assessments['11.3.1'] === true;

    const coreFields: Record<string, any> = {
      ava_name: catConf.name,
      ava_bbu_typ: ava_bbu_typbedurfniskategorie.AllgemeineBeurteilung,
      ava_bbu_kategorie: crmEnum,
      ava_qualitatcode: qualityValues.length > 0 ? qualityValues.join(',') : undefined,
      'ava_BeurteilungbesondererBedurfnisseId@odata.bind':
        `/${ava_bbu_beurteilungbesondererbedurfnisseMetadata.collectionName}(${parentId})`,
      'ava_bbu_Klient@odata.bind': `/${contactMetadata.collectionName}(${contactId})`,
    };

    const isRiskPresent = catConf.riskAssessmentId && assessments[catConf.riskAssessmentId];

    const optionalFields: Record<string, any> = {
      // ava_bbu_risikofaktorenliegenvor1: isRiskPresent ? 100000000 : undefined,
      ava_risikofaktorenliegenvor: isRiskPresent ? true : undefined,
      ava_bbu_angabeverwandtebezugspersoneninoste: (catConf.id === 'cat_1b' && assessments['1b.15']) ? true : undefined,
      ava_bbu_angabeverwandtebezugspersonineu: (catConf.id === 'cat_1b' && assessments['1b.16']) ? true : undefined,
      ava_bbu_infozuverwandtenbezugspersonen: catConf.id === 'cat_1b' && relativesNotes ? relativesNotes : undefined,
      ava_bbu_pronomen: catConf.id === 'cat_5' && pronounsValue ? pronounsValue : undefined,
      ava_sonstigebesonderebedurfnisse: (catConf.id === 'sonstiges' && isAnalphabetismus) ? '100000004' : undefined,
      ava_bbu_unterstutzungnotwendig: (catConf.id === 'cat_6' && assessments['6.6']) ? true : undefined,
      ava_bbu_medizinischehinweiseliegenvor: (
        catConf.id === 'cat_10a' && assessments['10a.9']
      ) ? true : undefined,
      ava_bbu_psychologischehinweiseliegenvor: (
        catConf.id === 'cat_10a' && assessments['10a.8']
      ) ? true : undefined,
    };

    const cleanOptional = Object.fromEntries(
      Object.entries(optionalFields).filter(([, value]) => value !== undefined)
    );

    return {
      entity: "ava_bbu_bedurfniskategorie",
      payload: { ...coreFields, ...cleanOptional }
    };
  });

  return {
    parent: {
      entity: "ava_bbu_beurteilungbesondererbedurfnisse",
      payload: beurteilungUpdate
    },
    children: categoriesPayloads
  };
};

import catalogData from '../data/questionCatalog.json';
import configData from '../data/config.json';
import { ClientData } from './crmService';
import { ava_bbu_qualitat } from '../dataverse-gen/enums/ava_bbu_qualitat';

const catalog = catalogData as any;
const config = configData as any;

const getAnswerValue = (answers: Record<string, any>, questionId: string): string => {
  const ans = answers[questionId]?.answer || '';
  // Treat "Nicht beantwortet" (n.b.) as "Nein" for assessment logic
  if (ans === 'Nicht beantwortet') return 'Nein';
  return ans;
};

const countJaInRange = (answers: Record<string, any>, range: string[]): number => {
  return range.filter(id => getAnswerValue(answers, id) === 'Ja').length;
};

const countNeinInRange = (answers: Record<string, any>, range: string[]): number => {
  return range.filter(id => getAnswerValue(answers, id) === 'Nein').length;
};

const generateIdRange = (prefix: string, start: number, end: number): string[] => {
  const range: string[] = [];
  for (let i = start; i <= end; i++) {
    range.push(`${prefix}${i}`);
  }
  return range;
};

export interface Rule {
  type: 'age_min' | 'count' | 'answer' | 'or' | 'and';
  value?: number;
  range?: { prefix: string, start: number, end: number };
  ids?: string[];
  threshold?: number;
  answer?: string;
  id?: string;
  rules?: Rule[];
}

const evaluateRule = (rule: Rule, answers: Record<string, any>, clientData?: ClientData | null): boolean => {
  switch (rule.type) {
    case 'age_min':
      return clientData ? clientData.age >= (rule.value || 0) : false;
    case 'count': {
      const ids = rule.ids || (rule.range ? generateIdRange(rule.range.prefix, rule.range.start, rule.range.end) : []);
      const count = rule.answer === 'Nein' ? countNeinInRange(answers, ids) : countJaInRange(answers, ids);
      return count >= (rule.threshold || 0);
    }
    case 'answer':
      return getAnswerValue(answers, rule.id || '') === rule.answer;
    case 'or':
      return (rule.rules || []).some(r => evaluateRule(r, answers, clientData));
    case 'and':
      return (rule.rules || []).every(r => evaluateRule(r, answers, clientData));
    default:
      return false;
  }
};

/**
 * Calculates the quality codes (Selbstaussage, Beobachtung, Screening) for each category.
 */
export const calculateQualities = (answers: Record<string, any>, assessments: Record<string, boolean>) => {
  const qualities: Record<string, ava_bbu_qualitat[]> = {};

  // Define categories that use screening by default
  const screeningCategories = ['cat_1a', 'cat_1b', 'cat_6'];

  screeningCategories.forEach(catId => {
    const configCat = config.categories.find((c: any) => c.id === catId);
    const isActive = assessments[catId] || (configCat?.riskAssessmentId && assessments[configCat.riskAssessmentId]);
    if (isActive) {
      qualities[catId] = [ava_bbu_qualitat.Screening];
    }
  });

  // Special case for category 5: always Selbstaussage
  const cat5Config = config.categories.find((c: any) => c.id === 'cat_5');
  if (assessments['cat_5'] || (cat5Config?.riskAssessmentId && assessments[cat5Config.riskAssessmentId])) {
    qualities['cat_5'] = [ava_bbu_qualitat.Selbstaussage];
  }

  // Special case for sonstiges triggered by literacy: always Selbstaussage
  if (assessments['sonstiges']) {
    if (!qualities['sonstiges']) qualities['sonstiges'] = [];
    if (!qualities['sonstiges'].includes(ava_bbu_qualitat.Selbstaussage)) {
      qualities['sonstiges'].push(ava_bbu_qualitat.Selbstaussage);
    }
  }

  const medicalIds = ['5.9', '10a.9'];
  const psychologicalIds = ['9b.10', '10a.8', '10c.8', '10e.13'];
  const excludedIds = [...medicalIds, ...psychologicalIds];

  // Group answers by category
  Object.keys(answers).forEach(qId => {
    const answer = answers[qId];
    // For 11.3/11.3.1, "Nein" is the positive finding
    const isPositive = answer.answer === 'Ja' || (['11.3', '11.3.1'].includes(qId) && answer.answer === 'Nein');
    if (!isPositive) return;
    if (excludedIds.includes(qId)) return;

    const question = catalog.questions[qId];
    if (!question || !question.category) return;

    // Map internal category ID to our assessment category keys from config.json
    let configCat = config.categories.find((c: any) =>
      c.id === question.category ||
      c.id === `cat_${question.category}` ||
      c.name === question.category
    );

    // Fallback: check if question ID starts with category prefix (e.g. "10a.1" starts with "10a")
    if (!configCat) {
      configCat = config.categories.find((c: any) => {
        const prefix = c.id.replace('cat_', '');
        if (qId === prefix) return true;
        if (qId.startsWith(prefix + '.')) return true;
        // Special case for 9a, 9b -> cat_9
        if (prefix === '9' && (qId.startsWith('9a.') || qId.startsWith('9b.'))) return true;
        return false;
      });
    }

    if (!configCat) return;
    const assessmentCatId = configCat.id;

    // A category is "active" if its manual cat_ key is true OR its riskAssessmentId is true OR the question itself is the trigger
    const isActive = assessments[assessmentCatId] ||
                     (configCat.riskAssessmentId && assessments[configCat.riskAssessmentId]) ||
                     assessments[qId];
    if (!isActive) return;

    if (!qualities[assessmentCatId]) qualities[assessmentCatId] = [];

    const type = question.type?.toLowerCase();
    let qQuality: ava_bbu_qualitat | null = null;

    if (type === 'beobachtung') {
      qQuality = ava_bbu_qualitat.Beobachtung;
    } else if (type === 'direkte fragen' || type === 'direkte frage') {
      qQuality = ava_bbu_qualitat.Selbstaussage;
    }

    if (qQuality && !qualities[assessmentCatId].includes(qQuality)) {
      qualities[assessmentCatId].push(qQuality);
    }

    // Explicitly map specific assessment findings to also receive these quality labels
    const assessmentMappings: Record<string, string[]> = {
      '6.6': ['cat_6'],
      '7.23': ['cat_7'],
      '10a.7': ['cat_10a'],
      '10c.7': ['cat_10c'],
      '10d.7': ['cat_10d'],
      '10e.12': ['cat_10e'],
    };

    Object.entries(assessmentMappings).forEach(([assessmentId, categories]) => {
      if (categories.includes(assessmentCatId) && assessments[assessmentId]) {
        if (!qualities[assessmentId]) qualities[assessmentId] = [];
        if (qQuality && !qualities[assessmentId].includes(qQuality)) {
          qualities[assessmentId].push(qQuality);
        }
      }
    });
  });

  // Ensure that if a category has Screening, its mapped findings also show Screening if they are active
  const assessmentMappingsForScreening: Record<string, string> = {
    '6.6': 'cat_6',
  };

  Object.entries(assessmentMappingsForScreening).forEach(([assessmentId, catId]) => {
    if (assessments[assessmentId] && qualities[catId]?.includes(ava_bbu_qualitat.Screening)) {
      if (!qualities[assessmentId]) qualities[assessmentId] = [];
      if (!qualities[assessmentId].includes(ava_bbu_qualitat.Screening)) {
        qualities[assessmentId].push(ava_bbu_qualitat.Screening);
      }
    }
  });

  return qualities;
};

export const calculateAssessments = (answers: Record<string, any>, clientData?: ClientData | null) => {
  const assessments: Record<string, boolean> = {};

  // Special "Immediate" categories creation based on consent/trigger questions
  // 1a: Accompanied Minor (Kind_FAM_ARM_K_ARF_K_UMF_K triggered by 0.4, or Kind_14plus triggered by 01.1)
  if (clientData?.groupId === "Kind_FAM_ARM_K_ARF_K_UMF_K") {
    if (getAnswerValue(answers, "0.4")) assessments["cat_1a"] = true;
  }
  if (clientData?.groupId === "Kind_14plus") {
    if (getAnswerValue(answers, "01.1") === "Ja") assessments["cat_1a"] = true;
  }

  // 1b: Unaccompanied Minor (UMF_Kind, uUMF_Kind triggered by 01.1)
  if (clientData?.groupId === "UMF_Kind" || clientData?.groupId === "uUMF_Kind") {
    if (getAnswerValue(answers, "01.1") === "Ja") assessments["cat_1b"] = true;
  }

  // 6: Single Parent (ARF_K_ARM_K_Erwachsene triggered by 0.1)
  if (clientData?.groupId === "ARF_K_ARM_K_Erwachsene") {
    if (getAnswerValue(answers, "0.1") === "Ja") assessments["cat_6"] = true;
  }

  // 5: LGBTI (Triggered by 5.2 or 5.2.1)
  if (getAnswerValue(answers, "5.2") === "Ja" || getAnswerValue(answers, "5.2.1") === "Ja") {
    assessments["cat_5"] = true;
  }

  const allQuestions = Object.values(catalog.questions) as any[];
  const bewertungen = allQuestions.filter(q => q.type && q.type.toLowerCase() === 'bewertung');

  bewertungen.forEach(q => {
    if (q.rule) {
      assessments[q.id] = evaluateRule(q.rule, answers, clientData);
    } else {
      // Fallback to legacy hardcoded logic if no rule is defined in JSON
      let result = false;
      switch (q.id) {
        case "1a.13":
          result = countJaInRange(answers, generateIdRange("1a.", 1, 11)) >= 3;
          break;
        case "1b.14": {
          const jaCount1b = countJaInRange(answers, generateIdRange("1b.", 1, 5));
          const neinCount1b = countNeinInRange(answers, generateIdRange("1b.", 7, 13));
          result = jaCount1b >= 2 || neinCount1b >= 2;
          break;
        }
        case "5.8":
          result = countJaInRange(answers, ["5.3", "5.4", "5.5"]) >= 1;
          break;
        case "5.9":
          result = getAnswerValue(answers, "5.5") === "Ja";
          break;
        case "6.6":
          result = ["6.1", "6.3", "6.5"].some(id => getAnswerValue(answers, id) === "Ja");
          break;
        case "7.23": {
          const jaCount7 = countJaInRange(answers, generateIdRange("7.", 10, 21));
          const ja7_22 = getAnswerValue(answers, "7.22") === "Ja";
          result = jaCount7 >= 3 || ja7_22;
          break;
        }
        case "9b.10": {
          const ja9a_1_14 = countJaInRange(answers, generateIdRange("9a.", 1, 14)) >= 3;
          const ja9a_16_21 = countJaInRange(answers, generateIdRange("9a.", 16, 21)) >= 3;
          const ja9b_1_6 = countJaInRange(answers, generateIdRange("9b.", 1, 6)) >= 1;
          const ja9b_7_9 = countJaInRange(answers, generateIdRange("9b.", 7, 9)) >= 1;
          result = ja9a_1_14 || ja9a_16_21 || ja9b_1_6 || ja9b_7_9;
          break;
        }
        case "10a.7":
          result = getAnswerValue(answers, "10a.2") === "Ja" || getAnswerValue(answers, "10a.3") === "Ja";
          break;
        case "10a.8":
          result = getAnswerValue(answers, "10a.5") === "Ja" || getAnswerValue(answers, "10a.6") === "Ja";
          break;
        case "10a.9":
          result = getAnswerValue(answers, "10a.4") === "Ja";
          break;
        case "10c.7":
          result = getAnswerValue(answers, "10c.2") === "Ja" || getAnswerValue(answers, "10c.6") === "Ja";
          break;
        case "10c.8":
          result = getAnswerValue(answers, "10c.3") === "Ja" || getAnswerValue(answers, "10c.4") === "Ja";
          break;
        case "10d.7":
          result = countJaInRange(answers, ["10d.3", "10d.4"]) >= 2 || getAnswerValue(answers, "10d.6") === "Ja";
          break;
        case "10e.12": {
          const ja10e_2_3 = countJaInRange(answers, ["10e.2", "10e.3"]) >= 1;
          const ja10d_4_5 = countJaInRange(answers, ["10d.4", "10d.5"]) >= 1;
          const ja10e_7_8 = countJaInRange(answers, ["10e.7", "10e.8"]) >= 2;
          result = (ja10e_2_3 && ja10d_4_5) || ja10e_7_8;
          break;
        }
        case "10e.13":
          result = getAnswerValue(answers, "10e.11") === "Ja";
          break;
        case "11.3":
          result = getAnswerValue(answers, "11.3") === "Nein";
          break;
        case "11.3.1":
          result = getAnswerValue(answers, "11.3.1") === "Nein";
          break;
        default:
          break;
      }
      assessments[q.id] = result;
    }
  });

  // Ensure 11.3 and 11.3.1 are always checked even if not type 'Bewertung'
  if (getAnswerValue(answers, "11.3") === "Nein") {
    assessments["11.3"] = true;
    assessments["sonstiges"] = true;
  }
  if (getAnswerValue(answers, "11.3.1") === "Nein") {
    assessments["11.3.1"] = true;
    assessments["sonstiges"] = true;
  }

  return assessments;
};

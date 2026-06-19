import catalogData from '../data/questionCatalog.json';
import { ClientData } from './crmService';

const catalog = catalogData as any;

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
    case 'count':
      const ids = rule.ids || (rule.range ? generateIdRange(rule.range.prefix, rule.range.start, rule.range.end) : []);
      const count = rule.answer === 'Nein' ? countNeinInRange(answers, ids) : countJaInRange(answers, ids);
      return count >= (rule.threshold || 0);
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

export const calculateAssessments = (answers: Record<string, any>, clientData?: ClientData | null) => {
  const assessments: Record<string, boolean> = {};

  const allQuestions = Object.values(catalog.questions) as any[];
  const bewertungen = allQuestions.filter(q => q.type && q.type.toLowerCase() === 'bewertung');

  bewertungen.forEach(q => {
    if (q.rule) {
      assessments[q.id] = evaluateRule(q.rule, answers, clientData);
    } else {
      // Fallback to legacy hardcoded logic if no rule is defined in JSON
      // This allows gradual migration or keeping complex ones hardcoded if needed
      let result = false;
      switch (q.id) {
        case "1a.5":
          result = clientData ? clientData.age >= 14 : false;
          break;
        case "1a.13":
          result = countJaInRange(answers, generateIdRange("1a.", 1, 11)) >= 3;
          break;
        case "1b.14":
          const jaCount1b = countJaInRange(answers, generateIdRange("1b.", 1, 5));
          const neinCount1b = countNeinInRange(answers, generateIdRange("1b.", 7, 13));
          result = jaCount1b >= 2 || neinCount1b >= 2;
          break;
        case "5.8":
          result = countJaInRange(answers, ["5.3", "5.4", "5.5"]) >= 1;
          break;
        case "5.9":
          result = getAnswerValue(answers, "5.5") === "Ja";
          break;
        case "6.6":
          result = ["6.1", "6.3", "6.5"].some(id => getAnswerValue(answers, id) === "Ja");
          break;
        case "7.23":
          const jaCount7 = countJaInRange(answers, generateIdRange("7.", 10, 21));
          const ja7_22 = getAnswerValue(answers, "7.22") === "Ja";
          result = jaCount7 >= 3 || ja7_22;
          break;
        case "9b.10":
          const ja9a_1_14 = countJaInRange(answers, generateIdRange("9a.", 1, 14)) >= 3;
          const ja9a_16_21 = countJaInRange(answers, generateIdRange("9a.", 16, 21)) >= 3;
          const ja9b_1_6 = countJaInRange(answers, generateIdRange("9b.", 1, 6)) >= 1;
          const ja9b_7_9 = countJaInRange(answers, generateIdRange("9b.", 7, 9)) >= 1;
          result = ja9a_1_14 || ja9a_16_21 || ja9b_1_6 || ja9b_7_9;
          break;
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
        case "10e.12":
          const ja10e_2_3 = countJaInRange(answers, ["10e.2", "10e.3"]) >= 1;
          const ja10d_4_5 = countJaInRange(answers, ["10d.4", "10d.5"]) >= 1;
          const ja10e_7_8 = countJaInRange(answers, ["10e.7", "10e.8"]) >= 2;
          result = (ja10e_2_3 && ja10d_4_5) || ja10e_7_8;
          break;
        case "10e.13":
          result = getAnswerValue(answers, "10e.11") === "Ja";
          break;
        default:
          break;
      }
      assessments[q.id] = result;
    }
  });

  return assessments;
};

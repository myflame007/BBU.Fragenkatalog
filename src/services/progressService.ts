import catalogData from '../data/questionCatalog.json';
import { getQuestionById } from './flowEngine';

const catalog = catalogData as any;

export const calculateProgress = (groupId: string, currentStepId: string | null) => {
  const groupFlow = catalog.flows[groupId];
  if (!groupFlow || !currentStepId) return { current: 0, total: 0, percent: 0 };

  // For total, we count "bedeutende" questions (excluding auto-calculated bewertung)
  const meaningfulSteps = groupFlow.filter((s: any) => {
    const q = getQuestionById(s.id);
    return q && q.type.toLowerCase() !== 'bewertung';
  });

  const meaningfulCurrentIndex = meaningfulSteps.findIndex((s: any) => s.id === currentStepId);

  const total = meaningfulSteps.length;
  // If the current step is a Bewertung (which shouldn't happen in UI), handle gracefully
  const current = meaningfulCurrentIndex !== -1 ? (meaningfulCurrentIndex + 1) : 0;
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return { current, total, percent };
};

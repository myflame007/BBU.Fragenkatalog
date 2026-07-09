import catalogData from '../data/questionCatalog.json';

const catalog = catalogData as any;

export const getNextStepId = (groupId: string, currentStepId: string | null, answer?: string): string | null => {
  const groupFlow = catalog.flows[groupId];
  if (!groupFlow) return null;

  if (!currentStepId) {
    return groupFlow[0].id;
  }

  const currentIndex = groupFlow.findIndex((s: any) => s.id === currentStepId);
  if (currentIndex === -1) return null;

  const currentStep = groupFlow[currentIndex];

  let nextId: string | undefined;

  if (answer === "Abbruch") {
    return null;
  }

  if (answer === "Ja") {
    nextId = currentStep.ja;
  } else if (answer === "Nein" || answer === "Nicht beantwortet") {
    nextId = currentStep.nein;
  } else {
    // For info/observation
    // Most steps in our new catalog are linear if ja/nein not present
    if (!currentStep.ja && !currentStep.nein) {
      const nextStep = groupFlow[currentIndex + 1];
      if (nextStep) nextId = nextStep.id;
    } else {
       // Fallback to ja if only one is present or just index + 1
       nextId = currentStep.ja || currentStep.nein;
    }
  }

  if (!nextId) {
    const nextStep = groupFlow[currentIndex + 1];
    if (nextStep) nextId = nextStep.id;
  }

  if (nextId === "END" || nextId === "ABBRUCH") return null;
  return nextId || null;
};

export const getQuestionById = (id: string) => {
  return catalog.questions[id];
};

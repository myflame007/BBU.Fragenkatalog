import { useState, useEffect, useCallback, useMemo } from 'react';
import { ClientData } from '../services/crmService';
import { getNextStepId, getQuestionById } from '../services/flowEngine';
import { calculateAssessments, calculateQualities } from '../services/assessmentEngine';
import { calculateProgress } from '../services/progressService';

function loadSavedWizardState(): Record<string, any> | null {
  try {
    const raw = localStorage.getItem('wizard_state');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const useWizard = (initialData: ClientData | null) => {
  const [clientData, setClientData] = useState<ClientData | null>(() =>
    initialData ?? loadSavedWizardState()?.clientData ?? null
  );
  const [currentStepId, setCurrentStepId] = useState<string | null>(() =>
    initialData ? null : (loadSavedWizardState()?.currentStepId ?? null)
  );
  const [answers, setAnswers] = useState<Record<string, any>>(() =>
    initialData ? {} : (loadSavedWizardState()?.answers ?? {})
  );
  const [history, setHistory] = useState<string[]>(() =>
    initialData ? [] : (loadSavedWizardState()?.history ?? [])
  );
  const [isComplete, setIsComplete] = useState<boolean>(() =>
    initialData ? false : (loadSavedWizardState()?.isComplete ?? false)
  );
  const loading = false;

  // Persistence: Save state to localStorage whenever it changes
  useEffect(() => {
    if (clientData) {
      localStorage.setItem('wizard_state', JSON.stringify({
        clientData,
        currentStepId,
        answers,
        history,
        isComplete
      }));
    }
  }, [clientData, currentStepId, answers, history, isComplete]);

  const assessments = useMemo(() => calculateAssessments(answers, clientData), [answers, clientData]);
  const qualities = useMemo(() => calculateQualities(answers, assessments), [answers, assessments]);

  const goToNextStep = useCallback((stepId: string | null, currentAssessments: Record<string, boolean>, group: string) => {
    let nextStepId = stepId;

    // Auto-skip bewertung steps using the calculated assessment result
    // Items 7.11, 7.13 are interactive evaluations and should not be skipped
    const interactiveEvaluations = ["7.11", "7.13"];

    while (nextStepId) {
      const nextQuestion = getQuestionById(nextStepId);
      if (nextQuestion && nextQuestion.type.toLowerCase() === 'bewertung' && !interactiveEvaluations.includes(nextStepId)) {
        const assessmentResult = currentAssessments[nextStepId] ? "Ja" : "Nein";
        nextStepId = getNextStepId(group, nextStepId, assessmentResult);
      } else {
        break;
      }
    }

    if (nextStepId) {
      setCurrentStepId(nextStepId);
    } else {
      setIsComplete(true);
      setCurrentStepId(null);
    }
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (initialData) {
      try {
        setClientData(initialData);
        const startStepId = getNextStepId(initialData.groupId, null);
        if (!startStepId) {
          throw new Error(`Keine Beurteilung für Betreuungskategorie "${initialData.groupId}" definiert. Bitte überprüfen Sie die Konfiguration.`);
        }
        const startAssessments = calculateAssessments({}, initialData);

        setHistory([]);
        setAnswers({});
        setIsComplete(false);
        goToNextStep(startStepId, startAssessments, initialData.groupId);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten';
        throw new Error(message, { cause: error });
      }
    }
  }, [initialData, goToNextStep]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleAbbruch = useCallback(() => {
    setIsComplete(true);
    setCurrentStepId(null);
  }, []);

  const handleAnswer = (answer: string, notes?: string, selection?: string) => {
    if (!clientData || !currentStepId) return;

    if (answer === "Abbruch") {
      const newAnswers = {
        ...answers,
        [currentStepId]: {
          questionId: currentStepId,
          text: "Abbruch durch Benutzer",
          answer,
          notes,
          selection,
          timestamp: new Date().toISOString()
        }
      };
      setAnswers(newAnswers);
      handleAbbruch();
      return;
    }

    const question = getQuestionById(currentStepId);
    if (!question) return;

    const text: any = question.text;
    const newAnswers = {
      ...answers,
      [question.id]: {
        questionId: question.id,
        text: text[clientData.language] || text['de'],
        answer,
        notes,
        selection,
        timestamp: new Date().toISOString()
      }
    };
    setAnswers(newAnswers);
    setHistory(prev => [...prev, currentStepId]);

    const currentAssessments = calculateAssessments(newAnswers, clientData);
    const nextStepId = getNextStepId(clientData.groupId, currentStepId, answer);
    goToNextStep(nextStepId, currentAssessments, clientData.groupId);
  };

  const handleBack = () => {
    if (history.length === 0) return;

    const newHistory = [...history];
    const prevStepId = newHistory.pop()!;
    setHistory(newHistory);
    setCurrentStepId(prevStepId);
    setIsComplete(false);
  };

  const progress = clientData ? calculateProgress(clientData.groupId, currentStepId) : { current: 0, total: 0, percent: 0 };

  const currentQuestion = currentStepId ? getQuestionById(currentStepId) : null;

  return {
    clientData,
    currentStepId,
    currentQuestion,
    answers,
    assessments,
    qualities,
    isComplete,
    loading,
    history,
    progress,
    handleAnswer,
    handleBack
  };
};

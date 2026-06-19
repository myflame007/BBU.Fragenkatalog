import { useState, useEffect, useCallback, useMemo } from 'react';
import { ClientData } from '../services/crmService';
import { getNextStepId, getQuestionById, getStepById } from '../services/flowEngine';
import { calculateAssessments } from '../services/assessmentEngine';
import { calculateProgress } from '../services/progressService';

export const useWizard = (initialData: ClientData | null) => {
  const [clientData, setClientData] = useState<ClientData | null>(initialData);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [history, setHistory] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  // Persistence: Load state from localStorage on mount
  useEffect(() => {
    if (!initialData) {
      const savedState = localStorage.getItem('wizard_state');
      if (savedState) {
        try {
          const { clientData: savedClientData, currentStepId: savedStepId, answers: savedAnswers, history: savedHistory, isComplete: savedIsComplete } = JSON.parse(savedState);
          setClientData(savedClientData);
          setCurrentStepId(savedStepId);
          setAnswers(savedAnswers);
          setHistory(savedHistory);
          setIsComplete(savedIsComplete);
        } catch (e) {
          console.error("Failed to restore wizard state", e);
        }
      }
    }
  }, [initialData]);

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

  const goToNextStep = useCallback((stepId: string | null, currentAssessments: Record<string, boolean>, group: string) => {
    let nextStepId = stepId;

    // Auto-skip bewertung steps using the calculated assessment result
    // Items 0.5, 1a.5, 7.11, 7.13 are interactive evaluations and should not be skipped
    const interactiveEvaluations = ["0.5", "1a.5", "7.11", "7.13"];

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

  useEffect(() => {
    if (initialData) {
      setClientData(initialData);
      const startStepId = getNextStepId(initialData.groupId, null);
      const startAssessments = calculateAssessments({}, initialData);

      setHistory([]);
      setAnswers({});
      setIsComplete(false);
      goToNextStep(startStepId, startAssessments, initialData.groupId);
    }
  }, [initialData, goToNextStep]);

  const handleAbbruch = useCallback(() => {
    setIsComplete(true);
    setCurrentStepId(null);
  }, []);

  const handleAnswer = (answer: string, notes?: string) => {
    if (!clientData || !currentStepId) return;

    if (answer === "Abbruch") {
      const newAnswers = {
        ...answers,
        [currentStepId]: {
          questionId: currentStepId,
          text: "Abbruch durch Benutzer",
          answer,
          notes,
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
    isComplete,
    loading,
    history,
    progress,
    handleAnswer,
    handleBack
  };
};

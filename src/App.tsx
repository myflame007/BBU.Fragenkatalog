import React, { useState, useEffect } from 'react';
import { useWizard } from './hooks/useWizard';
import { WizardHeader } from './components/WizardHeader';
import { QuestionRenderer } from './components/QuestionRenderer';
import { AssessmentSidebar } from './components/AssessmentSidebar';
import { AssessmentComplete } from './components/AssessmentComplete';
import { AdminControlCenter } from './components/AdminControlCenter';
import { AdminLogin } from './components/AdminLogin';
import { ManualStartForm } from './components/ManualStartForm';
import { ClientData } from './services/crmService';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [started, setStarted] = useState(false);
  const [manualClientData, setManualClientData] = useState<ClientData | null>(null);

  const {
    clientData,
    currentQuestion,
    answers,
    assessments,
    isComplete,
    loading,
    progress,
    history,
    handleAnswer,
    handleBack
  } = useWizard(manualClientData);

  // Auto-start if persisted state exists
  useEffect(() => {
    const savedState = localStorage.getItem('wizard_state');
    if (savedState && !started) {
      setStarted(true);
    }
  }, [started]);

  const handleStartWizard = (data: ClientData) => {
    setManualClientData(data);
    setStarted(true);
  };

  const handleRestart = () => {
    localStorage.removeItem('wizard_state');
    window.location.reload();
  };

  if (isAdmin) {
    if (!isAuthorized) {
      return <AdminLogin onLogin={() => setIsAuthorized(true)} onCancel={() => setIsAdmin(false)} />;
    }
    return (
      <div className="relative">
        <button
          onClick={() => {
            setIsAdmin(false);
            setIsAuthorized(false);
          }}
          className="fixed top-4 left-4 z-50 bg-gray-800 text-white px-4 py-2 rounded shadow-lg"
        >
          ← Zurück zum Assistenten
        </button>
        <AdminControlCenter />
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 overflow-y-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Beurteilungsassistent</h1>
          <p className="text-blue-700 font-medium">zur Erfassung besonderer Bedürfnisse</p>
          <p className="text-gray-600 mt-4">Bitte erfassen Sie die Basisdaten, um den Prozess zu starten.</p>
        </div>
        <ManualStartForm onStart={handleStartWizard} />
        <button
          onClick={() => setIsAdmin(true)}
          className="mt-8 text-gray-400 hover:text-gray-600 text-sm underline relative z-10"
        >
          Admin-Bereich (Konfiguration)
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex relative transition-colors duration-300">
      <button
        onClick={() => setIsAdmin(true)}
        className="fixed bottom-4 left-4 opacity-10 hover:opacity-100 bg-gray-200 text-[10px] px-2 py-1 rounded transition-opacity"
      >
        Admin
      </button>

      <div className="flex-1 flex flex-col items-center p-6 md:p-12 overflow-y-auto dark:text-slate-100">
        <div className="w-full max-w-5xl">
          {clientData && <WizardHeader clientData={clientData} progress={progress} />}

          {isComplete ? (
            <div className="flex flex-col items-center">
              <AssessmentComplete answers={answers} assessments={assessments} clientData={clientData} />
              <button
                onClick={handleRestart}
                className="mt-8 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                Neuen Assistenten starten
              </button>
            </div>
          ) : (
            currentQuestion && (
              <QuestionRenderer
                question={currentQuestion as any}
                onBack={handleBack}
                canGoBack={history.length > 0}
                language={clientData?.language || 'de'}
                onAnswer={handleAnswer}
                clientData={clientData}
              />
            )
          )}
        </div>
      </div>
      <AssessmentSidebar assessments={assessments} />
    </div>
  );
}

export default App;

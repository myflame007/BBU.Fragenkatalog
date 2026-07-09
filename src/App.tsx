import React, { useState, useEffect } from 'react';
import { getContext } from '@microsoft/power-apps/app';
import { AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useWizard } from './hooks/useWizard';
import { WizardHeader } from './components/WizardHeader';
import { QuestionRenderer } from './components/QuestionRenderer';
import { AssessmentSidebar } from './components/AssessmentSidebar';
import { AssessmentComplete } from './components/AssessmentComplete';
import { AdminControlCenter } from './components/AdminControlCenter';
import { AdminLogin } from './components/AdminLogin';
import { ManualStartForm } from './components/ManualStartForm';
import { AgeGateModal } from './components/AgeGateModal';
import { ClientData, fetchClientById, fetchClientByIfa } from './services/crmService';
import { ava_bbu_qualitat } from './dataverse-gen/enums/ava_bbu_qualitat';

const CONTACT_ID_QUERY_KEYS = ['contactId', 'contactid', 'id'] as const;
const BEURTEILUNG_ID_QUERY_KEYS = ['beurteilungId', 'beurteilungid'] as const;

function isMockRequested(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get('mock') === '1';
}

function pickParam(params: Record<string, string | null | undefined>, keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const value = params[key];
    if (typeof value === 'string' && value.trim()) return value;
  }
  return undefined;
}

function pickContactId(params: Record<string, string | null | undefined>): string | undefined {
  return pickParam(params, CONTACT_ID_QUERY_KEYS);
}

function pickBeurteilungId(params: Record<string, string | null | undefined>): string | undefined {
  return pickParam(params, BEURTEILUNG_ID_QUERY_KEYS);
}

function parseQueryString(qs: string): Record<string, string> {
  const normalized = qs.startsWith('?') ? qs.slice(1) : qs;
  if (!normalized) return {};
  return Object.fromEntries(new URLSearchParams(normalized).entries());
}

function parseHashQueryParams(hash: string): Record<string, string> {
  if (!hash) return {};
  const withoutPrefix = hash.startsWith('#') ? hash.slice(1) : hash;
  const queryIndex = withoutPrefix.indexOf('?');
  if (queryIndex < 0) return {};
  return parseQueryString(withoutPrefix.slice(queryIndex + 1));
}

async function resolveContactId(): Promise<string | undefined> {
  try {
    const context = await getContext();
    const params = (context.app?.queryParams ?? {}) as Record<string, string | null | undefined>;
    const fromContext = pickContactId(params);
    if (fromContext) return fromContext;
  } catch {
    // fall through to window-based parsing
  }
  const fromSearch = pickContactId(parseQueryString(window.location.search));
  if (fromSearch) return fromSearch;
  return pickContactId(parseHashQueryParams(window.location.hash));
}

async function resolveBeurteilungId(): Promise<string | undefined> {
  try {
    const context = await getContext();
    const params = (context.app?.queryParams ?? {}) as Record<string, string | null | undefined>;
    const fromContext = pickBeurteilungId(params);
    if (fromContext) return fromContext;
  } catch {
    // fall through to window-based parsing
  }
  const fromSearch = pickBeurteilungId(parseQueryString(window.location.search));
  if (fromSearch) return fromSearch;
  return pickBeurteilungId(parseHashQueryParams(window.location.hash));
}

const DEBUG_ASSESSMENTS: Record<string, boolean> = {
  '1a.13': true, '1b.14': true, '1b.15': true, '1b.16': true,
  '5.8': true, '5.9': true, '6.6': true,
  '7.23': true, '9b.10': true,
  '10a.7': true, '10a.8': true, '10a.9': true,
  '10c.7': true, '10c.8': true,
  '10d.7': true, '10e.12': true, '10e.13': true,
  'cat_1a': true, '11.3': true, '11.3.1': true, 'sonstiges': true
};

const DEBUG_QUALITIES: Record<string, number[]> = {
  cat_1a: [ava_bbu_qualitat.Screening],
  cat_1b: [ava_bbu_qualitat.Screening],
  cat_5: [ava_bbu_qualitat.Selbstaussage],
  cat_6: [ava_bbu_qualitat.Screening],
  cat_7: [ava_bbu_qualitat.Selbstaussage, ava_bbu_qualitat.Beobachtung],
  cat_9: [ava_bbu_qualitat.Selbstaussage, ava_bbu_qualitat.Beobachtung],
  cat_10a: [ava_bbu_qualitat.Selbstaussage, ava_bbu_qualitat.Beobachtung],
  cat_10c: [ava_bbu_qualitat.Selbstaussage, ava_bbu_qualitat.Beobachtung],
  cat_10d: [ava_bbu_qualitat.Selbstaussage, ava_bbu_qualitat.Beobachtung],
  cat_10e: [ava_bbu_qualitat.Selbstaussage, ava_bbu_qualitat.Beobachtung],
  sonstiges: [ava_bbu_qualitat.Selbstaussage],
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [started, setStarted] = useState(false);
  const [manualClientData, setManualClientData] = useState<ClientData | null>(null);
  const [beurteilungId, setBeurteilungId] = useState<string | undefined>(undefined);
  const [ageModalData, setAgeModalData] = useState<ClientData | null>(null);
  const [debugSkip, setDebugSkip] = useState(false);
  const [languageOverride, setLanguageOverride] = useState<string | null>(null);
  const [clientLoadError, setClientLoadError] = useState<string | null>(null);

  const {
    clientData,
    currentQuestion,
    answers,
    assessments,
    qualities,
    isComplete,
    loading,
    progress,
    history,
    handleAnswer,
    handleBack
  } = useWizard(manualClientData);

  const language = languageOverride ?? clientData?.language ?? 'de';

  // Auto-start: ?contactId=... aus URL/Context oder persisted state
  useEffect(() => {
    if (started) return;

    let cancelled = false;
    (async () => {
      // ?mock=1 forciert Mock-Klient (lokales Dev ohne Power Apps)
      if (isMockRequested()) {
        try {
          const mock = await fetchClientByIfa('1468');
          if (!cancelled) {
            setManualClientData(mock);
            setStarted(true);
          }
        } catch (e: any) {
          if (!cancelled) console.error('Mock-Klient konnte nicht geladen werden:', e);
        }
        return;
      }

      const contactId = await resolveContactId();
      const resolvedBeurteilungId = await resolveBeurteilungId();
      const savedState = localStorage.getItem('wizard_state');

      // Saved state nur wiederverwenden, wenn es zum aktuellen URL-Klienten passt.
      // Andere URL-Id => alten State verwerfen, frisch laden.
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          const savedId = (parsed.clientData?.id || '').replace(/[{}]/g, '').toLowerCase();
          const urlId = (contactId || '').replace(/[{}]/g, '').toLowerCase();
          if (!urlId || savedId === urlId) {
            const savedAge: number = parsed.clientData?.age ?? 99;
            if (savedAge >= 14 && savedAge < 18) {
              // Age-Modal auch bei gespeichertem State anzeigen
              const savedClientData: ClientData = parsed.clientData;
              if (!cancelled) {
                if (resolvedBeurteilungId) setBeurteilungId(resolvedBeurteilungId);
                setAgeModalData(savedClientData);
                localStorage.removeItem('wizard_state');
              }
            } else {
              if (!cancelled) {
                if (resolvedBeurteilungId) setBeurteilungId(resolvedBeurteilungId);
                setStarted(true);
              }
            }
            return;
          }
          localStorage.removeItem('wizard_state');
        } catch {
          localStorage.removeItem('wizard_state');
        }
      }

      if (cancelled || !contactId) return;

      if (resolvedBeurteilungId && !cancelled) setBeurteilungId(resolvedBeurteilungId);

      // Echtes Dataverse via ContactsService.get (Fallback Xrm.WebApi).
      const real = await fetchClientById(contactId);
      if (cancelled) return;
      if (real) {
        // Hinweis (nicht blockierend): Ohne aktuellen Standort muss beim Speichern
        // ein Standort ermittelt werden. Das Laden darf daran aber nicht scheitern.
        if (!real.currentSiteId) {
          console.warn(`Klient*in ${contactId} hat keinen (lesbaren) aktuellen Standort (ava_currentsiteid).`);
        }
        // Modal nur für begleitete Minderjährige (ARFKind, ARMKind, Familie) zwischen 14-18
        const isAccompaniedMinor = real.groupId === 'Kind_FAM_ARM_K_ARF_K_UMF_K';
        if (real.age >= 14 && real.age < 18 && isAccompaniedMinor) {
          setAgeModalData(real);
        } else {
          setManualClientData(real);
          setStarted(true);
        }
        return;
      }

      // Kein stiller Fallback auf Mock-Daten hier: sonst wird faelschlich der
      // Mock-Klient (MOCKTESTDATEN NICHT ECHT, 16J.) als echter Klient dargestellt.
      console.error(`Klient mit Kontakt-ID ${contactId} konnte nicht geladen werden.`);
      setClientLoadError(
        `Klient*in mit der ID "${contactId}" konnte nicht geladen werden. Bitte pruefen Sie die Verbindung oder erfassen Sie die Daten manuell.`,
      );
    })();

    return () => { cancelled = true; };
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

  if (ageModalData) {
    return (
      <AnimatePresence>
        <AgeGateModal
          onDirect={() => {
            setManualClientData({ ...ageModalData, groupId: 'Kind_14plus' });
            setAgeModalData(null);
            setStarted(true);
          }}
          onViaParents={() => {
            setManualClientData(ageModalData);
            setAgeModalData(null);
            setStarted(true);
          }}
        />
      </AnimatePresence>
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
        {clientLoadError && (
          <div className="mb-6 max-w-lg w-full bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <p className="text-sm font-medium">{clientLoadError}</p>
          </div>
        )}
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
      {!isComplete && !debugSkip && (
        <button
          onClick={() => setDebugSkip(true)}
          className="fixed bottom-4 right-4 opacity-10 hover:opacity-100 bg-yellow-200 text-[10px] px-2 py-1 rounded transition-opacity"
        >
          DEV: Skip
        </button>
      )}

      <div className="flex-1 flex flex-col items-center p-6 md:p-12 overflow-y-auto dark:text-slate-100">
        <div className="w-full max-w-5xl">
          {clientData && (
            <WizardHeader
              clientData={clientData}
              progress={progress}
              language={language}
              onLanguageChange={setLanguageOverride}
            />
          )}

          {(isComplete || debugSkip) ? (
            <div className="flex flex-col items-center">
              <AssessmentComplete
                answers={debugSkip ? {} : answers}
                assessments={debugSkip ? DEBUG_ASSESSMENTS : assessments}
                qualities={debugSkip ? DEBUG_QUALITIES : qualities}
                clientData={clientData ?? undefined}
                beurteilungId={beurteilungId}
                onStartFamilyMember={(member) => {
                  localStorage.removeItem('wizard_state');
                  setBeurteilungId(undefined);
                  setManualClientData(member);
                }}
              />
              <button
                onClick={handleRestart}
                className="mt-8 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                Neuen Assistenten starten
              </button>
            </div>
          ) : (
            currentQuestion && (
              <>
                {isMockRequested() && (
                  <div className="mb-4 flex justify-end">
                    <button
                      onClick={() => setDebugSkip(true)}
                      className="text-xs bg-yellow-200 border border-yellow-400 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-300 transition"
                    >
                      [DEV] Alle Risiken erkannt &rarr; Submit
                    </button>
                  </div>
                )}
                <QuestionRenderer
                  key={currentQuestion.id}
                  question={currentQuestion as any}
                  onBack={handleBack}
                  canGoBack={history.length > 0}
                  language={language}
                  onAnswer={handleAnswer}
                  clientData={clientData}
                />
              </>
            )
          )}
        </div>
      </div>
      <AssessmentSidebar assessments={assessments} />
    </div>
  );
}

export default App;

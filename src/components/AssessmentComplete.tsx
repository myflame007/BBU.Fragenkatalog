import React, { useState, useEffect } from 'react';
import { submitAssessment, fetchFamilyMembers, ClientData } from '../services/crmService';
import { XCircle, Users, CheckCircle2, AlertTriangle, FileText, Settings, Heart, ArrowRight, Eye, MessageSquare, AlertCircle, Database, ChevronDown, ChevronUp } from 'lucide-react';
import catalogData from '../data/questionCatalog.json';
import config from '../data/config.json';
import { cn } from '../utils/cn';

const catalog = catalogData as any;

interface Props {
  answers: Record<string, any>;
  assessments: Record<string, boolean>;
  qualities: Record<string, number[]>;
  clientData?: ClientData;
  beurteilungId?: string;
  onStartFamilyMember?: (member: ClientData) => void;
}

export const AssessmentComplete: React.FC<Props> = ({ answers, assessments, qualities, clientData, beurteilungId, onStartFamilyMember }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [familyMembers, setFamilyMembers] = useState<ClientData[]>([]);
  const [showDataReport, setShowDataReport] = useState(false);

  useEffect(() => {
    if (!clientData?.familyId || !clientData?.id) return;
    fetchFamilyMembers(clientData.familyId, clientData.id)
      .then(setFamilyMembers)
      .catch(() => setFamilyMembers([]));
  }, [clientData?.familyId, clientData?.id]);

  const isAbbruch = Object.values(answers).some(a => a.answer === 'Abbruch');

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const exportData = prepareExportData();
      const result = await submitAssessment({
        contactId: clientData?.id,
        beurteilungId,
        answers,
        assessments,
        qualities,
        clientData,
        exportData,
      });
      if (result.success) setSubmittedId(result.id || null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const prepareExportData = () => {
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

  const exportData = prepareExportData();
  const activeEvaluations = exportData.evaluations;
  const activeIds = Object.keys(activeEvaluations).filter(id => {
    const item = activeEvaluations[id];
    const val = item.result;
    if (item.isAggregatedField) return false;
    return val === 'Ja' || (typeof val === 'string' && val.includes('.'));
  });

  const getQualitiyLabel = (code: number) => {
    switch (code) {
      case 100000000: return 'Selbstaussage';
      case 100000001: return 'Beobachtung';
      case 100000004: return 'Screening';
      default: return String(code);
    }
  };

  const getQualityIcon = (code: number) => {
    switch (code) {
      case 100000000: return <MessageSquare size={10} />;
      case 100000001: return <Eye size={10} />;
      case 100000004: return <Settings size={10} />;
      default: return <AlertCircle size={10} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8">
      <div className={cn(
        "bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border transition-all duration-500 overflow-hidden",
        isAbbruch ? "border-red-100 dark:border-red-900/30" : "border-blue-100 dark:border-slate-700"
      )}>
        <div className={cn(
          "p-10 text-center relative",
          isAbbruch ? "bg-red-50/50 dark:bg-red-950/20" : "bg-blue-50/50 dark:bg-blue-950/20"
        )}>
          {isAbbruch ? (
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
              <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
          ) : (
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6 -rotate-3">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          )}

          <h2 className={cn("text-4xl font-black mb-4", isAbbruch ? "text-red-900 dark:text-red-400" : "text-slate-900 dark:text-white")}>
            {isAbbruch ? 'Gespräch abgebrochen' : 'Zusammenfassung & Speichern'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            {isAbbruch
              ? 'Das Gespräch wurde vorzeitig beendet. Es wurden keine Daten im CRM gespeichert.'
              : 'Die Beurteilung ist abgeschlossen. Bitte überprüfen Sie die erkannten Bedürfnisse und Risiken, bevor Sie die Ergebnisse finalisieren.'}
          </p>
        </div>

        {!isAbbruch && (
          <div className="p-10 space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
                  <Heart size={22} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Erkannte Bedürfnisse & Risiken</h3>
              </div>

              <div className="space-y-12">
                {config.categories.filter(c => c.id.startsWith('cat_') || c.id === 'sonstiges').map(category => {
                  const catPrefix = category.id.replace('cat_', '');
                  const hideBaseBoxIds = ['cat_1a', 'cat_1b', 'cat_5', 'cat_6'];

                  let itemsInCategory = activeIds.filter(id => {
                    if (id === category.id) {
                      return !hideBaseBoxIds.includes(id);
                    }
                    if (id === 'risk_illiteracy' && category.id === 'sonstiges') return true;
                    if (id === 'cat_5_pronouns' && category.id === 'cat_5') return true;

                    const question = catalog.questions[id];
                    if (!question) return false;
                    const qCat = question.category || '';
                    return qCat === catPrefix || qCat === category.id || qCat === category.name || qCat.includes(catPrefix);
                  });

                  if (itemsInCategory.includes('risk_illiteracy')) {
                    itemsInCategory = itemsInCategory.filter(id => id !== '11.3' && id !== '11.3.1');
                  }

                  const isCategoryTriggered =
                    assessments[category.id] ||
                    (category.riskAssessmentId && assessments[category.riskAssessmentId]) ||
                    (category.id === 'sonstiges' && (assessments['11.3'] || assessments['11.3.1']));

                  if (itemsInCategory.length === 0 && !isCategoryTriggered) return null;

                  return (
                    <div key={category.id} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                        <h4 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] px-4 whitespace-nowrap">
                          {category.name}
                        </h4>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                      </div>

                      {category.id === 'sonstiges' && (
                        <div className="text-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                            Sonstige Besondere Bedürfnisse
                          </span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        {itemsInCategory.map(id => {
                          const evalData = activeEvaluations[id];
                          if (!evalData) return null;

                          let catKey = Object.keys(qualities).find(k => id.includes(k.replace('cat_', '')) || k === id);
                          if (!catKey && id === 'risk_illiteracy') catKey = 'sonstiges';
                          const qCodes = (catKey && (qualities as any)[catKey]) ? (qualities as any)[catKey] : [];

                          return (
                            <div key={id} className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                              <div className="flex justify-between items-start mb-4">
                                <div className="text-lg font-black text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                                  {evalData.text}
                                </div>
                                <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-lg font-black uppercase tracking-wider px-3 py-1 rounded-full">
                                  ✔️
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                  {qCodes.map((code: number) => (
                                    <span key={code} className="bg-white/80 dark:bg-slate-600/80 backdrop-blur border border-slate-200 dark:border-slate-500 text-slate-500 dark:text-slate-400 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1.5 shadow-sm">
                                      {getQualityIcon(code)}
                                      {getQualitiyLabel(code)}
                                    </span>
                                  ))}
                                </div>
                                {evalData.anmerkung && (
                                  <div className="text-sm text-slate-500 dark:text-slate-400 italic bg-white/50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                                    "{evalData.anmerkung}"
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {activeIds.length === 0 && (
                  <div className="p-12 text-center bg-slate-50 dark:bg-slate-900/20 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <p className="text-slate-400 font-bold text-lg">Keine besonderen Bedürfnisse oder Risiken identifiziert.</p>
                  </div>
                )}
              </div>
            </section>

            <section className="bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <FileText className="text-blue-400" size={24} />
                <h3 className="text-2xl font-black">CRM Datensatz-Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Klient*in</div>
                  <div className="text-lg font-bold">{clientData?.firstName} {clientData?.lastName}</div>
                  <div className="text-sm text-blue-400 font-mono">IFA: {clientData?.ifaNumber}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Gesprächsteilnehmer*in</div>
                  <div className="text-lg font-bold">
                    {answers['0.1a']?.selection ? (
                      <span className="flex items-center gap-2">
                        <Users size={16} className="text-blue-400" />
                        {familyMembers.find(m => m.id === answers['0.1a'].selection)
                          ? `${familyMembers.find(m => m.id === answers['0.1a'].selection)?.firstName} ${familyMembers.find(m => m.id === answers['0.1a'].selection)?.lastName}`
                          : 'Anderes Familienmitglied'}
                      </span>
                    ) : 'Klient*in selbst'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Datum der Beurteilung</div>
                  <div className="text-lg font-bold">{new Date().toLocaleDateString('de-DE')}</div>
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-800 pt-8">
                <div className="text-slate-400 text-sm max-w-md">
                   Beim Klicken auf Speichern werden alle erkannten Kategorien im CRM angelegt und die Beurteilung abgeschlossen.
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting || submittedId !== null}
                  className={cn(
                    "flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl active:scale-95 disabled:opacity-50",
                    submittedId
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                  )}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Wird gespeichert...
                    </>
                  ) : submittedId ? (
                    <>
                      <CheckCircle2 size={24} />
                      Ergebnisse Gespeichert ✓
                    </>
                  ) : (
                    <>
                      Ergebnisse Speichern & Schließen
                      <ArrowRight size={24} />
                    </>
                  )}
                </button>
              </div>
            </section>
          </div>
        )}
      </div>

      {submittedId && (
        <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-[2rem] text-green-700 dark:text-green-400 text-center flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-[10px] font-black uppercase tracking-[0.2em]">Erfolgreich übertragen</div>
          <div className="text-sm font-medium">CRM Referenz-ID: <span className="font-mono bg-white dark:bg-slate-800 px-3 py-1 rounded-lg ml-2 border border-green-200 dark:border-green-900/30">{submittedId}</span></div>
        </div>
      )}

      {submitError && (
        <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem] text-red-700 dark:text-red-400 flex items-center gap-4 animate-in shake-1 duration-500">
          <AlertTriangle size={32} />
          <div className="text-left">
            <div className="text-xs font-black uppercase tracking-widest mb-1">Übertragungsfehler</div>
            <div className="text-sm font-bold opacity-90">{submitError}</div>
          </div>
        </div>
      )}

      {/* Floating CRM Data Report Icon */}
      {!isAbbruch && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowDataReport(!showDataReport)}
            className="p-3 bg-slate-800 dark:bg-slate-700 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all border border-slate-700 dark:border-slate-600 group"
            title="CRM Datenreport vorschau"
          >
            <Database size={18} />
          </button>

          {showDataReport && (
            <div className="absolute bottom-16 right-0 w-[400px] max-w-[calc(100vw-3rem)] max-h-[60vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400">CRM JSON Payload</h4>
                <button onClick={() => setShowDataReport(false)} className="text-slate-400 hover:text-slate-600" aria-label="Schließen">
                  <XCircle size={16} />
                </button>
              </div>
              <pre className="text-[10px] font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                {JSON.stringify(prepareExportData(), null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {onStartFamilyMember && familyMembers.length > 0 && !isAbbruch && (
        <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="flex items-center gap-3 mb-8 px-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
               <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Weitere Familienmitglieder beurteilen</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
            {familyMembers.map(member => (
              <button
                key={member.id}
                onClick={() => onStartFamilyMember(member)}
                className="group flex flex-col items-start p-6 rounded-[2rem] bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl transition-all duration-300 text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 dark:bg-blue-900/10 rounded-bl-[3rem] -mr-4 -mt-4 transition-all group-hover:scale-150"></div>
                <div className="font-black text-slate-800 dark:text-slate-100 text-lg mb-1 relative">{member.firstName} {member.lastName}</div>
                <div className="text-xs text-slate-400 font-bold mb-4 flex items-center gap-2 relative">
                   <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded uppercase tracking-tighter">IFA: {member.ifaNumber}</span>
                   <span>&bull;</span>
                   <span>{member.age} Jahre</span>
                </div>
                <div className="mt-auto flex items-center gap-2 text-blue-600 font-black text-sm group-hover:translate-x-2 transition-transform relative">
                  Fragebogen starten
                  <ArrowRight size={16} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

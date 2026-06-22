import React, { useState, useEffect } from 'react';
import { submitAssessment, fetchFamilyMembers, ClientData } from '../services/crmService';
import { XCircle, Users } from 'lucide-react';
import catalogData from '../data/questionCatalog.json';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const catalog = catalogData as any;

interface Props {
  answers: Record<string, any>;
  assessments: Record<string, boolean>;
  clientData?: ClientData;
  beurteilungId?: string;
  onStartFamilyMember?: (member: ClientData) => void;
}

export const AssessmentComplete: React.FC<Props> = ({ answers, assessments, clientData, beurteilungId, onStartFamilyMember }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [familyMembers, setFamilyMembers] = useState<ClientData[]>([]);

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

    // 1. Aggregated fields
    if (isMedicalNecessary) {
      evaluations.ava_medizinische_einschaetzung_notwendig = {
        id: 'ava_medizinische_einschaetzung_notwendig',
        text: 'Medizinische Einschätzung notwendig (Datum)',
        result: formattedDate
      };
    }
    if (isPsychologicalNecessary) {
      evaluations.ava_psychologische_einschaetzung_notwendig = {
        id: 'ava_psychologische_einschaetzung_notwendig',
        text: 'Psychologische Einschätzung notwendig (Datum)',
        result: formattedDate
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

    // 3. Other assessments (standard)
    Object.keys(catalog.questions).forEach(id => {
      const q = catalog.questions[id];
      if (q.type === 'Bewertung' &&
          !medicalIds.includes(id) &&
          !psychologicalIds.includes(id) &&
          id !== '1b.15' &&
          id !== '1b.16') {
        evaluations[id] = {
          id,
          text: q.text.de,
          result: assessments[id] ? "Ja" : "Nein"
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

  return (
    <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-2xl max-w-4xl mx-auto my-12 text-center transition-colors">
      {isAbbruch ? (
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>
      ) : (
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      )}

      <h2 className={cn("text-3xl font-bold mb-4", isAbbruch ? "text-red-900 dark:text-red-400" : "text-gray-900 dark:text-slate-100")}>
        {isAbbruch ? 'Gespräch abgebrochen' : 'Bewertung abgeschlossen'}
      </h2>
      <p className="text-gray-600 dark:text-slate-400 mb-10 max-w-lg mx-auto">
        {isAbbruch
          ? 'Das Gespräch wurde vorzeitig beendet. In diesem Status ist kein Export möglich.'
          : 'Vielen Dank für die Durchführung der Beurteilung. Alle Informationen wurden erfasst und können nun exportiert oder direkt im CRM gespeichert werden.'}
      </p>

      {!isAbbruch && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <button
            onClick={handleSubmit}
            disabled={submitting || submittedId !== null}
            className={`flex items-center justify-center px-8 py-4 rounded-xl font-bold transition shadow-lg ${submittedId ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {submitting ? 'Wird gespeichert...' : submittedId ? 'Im CRM gespeichert ✓' : 'An CRM senden'}
          </button>
        </div>
      )}

      {submittedId && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
          Referenznummer: <span className="font-mono">{submittedId}</span>
        </div>
      )}

      {submitError && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
          Fehler beim Speichern: {submitError}
        </div>
      )}

      {onStartFamilyMember && familyMembers.length > 0 && (
        <div className="mt-10 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Weitere Familienmitglieder</h3>
          </div>
          <div className="grid gap-3">
            {familyMembers.map(member => (
              <button
                key={member.id}
                onClick={() => onStartFamilyMember(member)}
                className="flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left group"
              >
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    IFA: {member.ifaNumber} &middot; {member.age} Jahre
                  </div>
                </div>
                <span className="text-blue-500 font-bold text-sm">Fragebogen starten →</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

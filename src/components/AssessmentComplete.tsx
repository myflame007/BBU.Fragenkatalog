import React, { useState } from 'react';
import { exportToJson } from '../services/exportService';
import { submitAssessment } from '../services/crmService';
import { XCircle } from 'lucide-react';
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
  clientData?: any;
}

export const AssessmentComplete: React.FC<Props> = ({ answers, assessments, clientData }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const isAbbruch = Object.values(answers).some(a => a.answer === 'Abbruch');

  const handleSubmit = async () => {
    setSubmitting(true);

    // Prepare CRM data (flattened and with special fields)
    const exportData = prepareExportData();
    const crmPayload: any = {
      contactid: clientData?.id,
      timestamp: exportData.metadata.timestamp,
    };

    // Map evaluations to flat CRM fields
    Object.keys(exportData.evaluations).forEach(key => {
      const item = exportData.evaluations[key];
      if (key === 'ava_medizinische_einschaetzung_notwendig' || key === 'ava_psychologische_einschaetzung_notwendig') {
        crmPayload[key] = item.result;
      } else if (key === '1b.15') {
        crmPayload.ava_family_relatives_austria = item.result;
        crmPayload.ava_family_relatives_austria_anmerkung = item.anmerkung;
      } else if (key === '1b.16') {
        crmPayload.ava_family_relatives_eu = item.result;
        crmPayload.ava_family_relatives_eu_anmerkung = item.anmerkung;
      } else {
        // Standard assessments
        crmPayload[`assessment_${key.replace('.', '_')}`] = item.result;
      }
    });

    const result = await submitAssessment(crmPayload);
    setSubmitting(false);
    if (result.success) setSubmittedId(result.id || null);
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

  const handleAssessmentExport = () => {
    const exportData = prepareExportData();
    exportToJson(exportData, `evaluations_${Date.now()}.json`);
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
            onClick={() => exportToJson({ answers, assessments })}
            className="flex items-center justify-center px-6 py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Export (Alle Daten)
          </button>
          <button
            onClick={handleAssessmentExport}
            className="flex items-center justify-center px-6 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Nur Bewertungen
          </button>
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
    </div>
  );
};

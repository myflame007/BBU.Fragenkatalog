import React, { useState, useEffect } from 'react';
import { Eye, Info, MessageSquare, ChevronRight, CornerDownRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../data/config.json';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Question {
  id: string;
  type: string;
  category: string;
  text: Record<string, string>;
  answerType?: string;
}

import { ClientData } from '../services/crmService';

interface Props {
  question: Question;
  language: string;
  onAnswer: (answer: string, notes?: string) => void;
  onBack?: () => void;
  canGoBack?: boolean;
  clientData?: ClientData | null;
}

const familyRoles = [
  "Mutter",
  "Vater",
  "erwachsene Geschwister",
  "Oma",
  "Opa",
  "Onkel",
  "Tante"
];

export const QuestionRenderer: React.FC<Props> = ({ question, language, onAnswer, onBack, canGoBack, clientData }) => {
  const [notes, setNotes] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Reset local state when question changes
  useEffect(() => {
    setNotes('');
    setDropdownValue('');
  }, [question.id]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    } catch {
      return dateStr;
    }
  };

  const interactiveEvaluations = ["0.5", "1a.5", "7.11", "7.13"];
  let rawText = (
    (question.type && question.type.toLowerCase() === 'beobachtung') ||
    interactiveEvaluations.includes(question.id)
  )
    ? question.text['de']
    : (question.text[language] || question.text['de']);

  let text: React.ReactNode = rawText;

  // Metadata substitution for 0.4
  if (question.id === "0.4" && clientData) {
    text = (
      <span className="inline-block">
        Wir führen das Gespräch nun für Ihr Kind{' '}
        <span className="text-blue-600 font-extrabold underline decoration-blue-200 decoration-2 underline-offset-4">
          {clientData.firstName} {clientData.lastName}
        </span>{' '}
        ({clientData.age} Jahre) und Geburtsdatum: {formatDate(clientData.birthDate)}
      </span>
    );
  }

  const isInfo = question.type && (question.type.toLowerCase() === 'sprechtext' || question.type.toLowerCase() === 'info');
  const isObservation = question.type && question.type.toLowerCase() === 'beobachtung';
  const answerType = question.answerType?.toLowerCase() || '';

  return (
    <>
      {isInfo ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          key={question.id}
          className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700 p-10 my-6 rounded-[2.5rem] shadow-2xl transition-all duration-500"
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-indigo-300 dark:bg-indigo-900 rounded-full opacity-10 blur-3xl"></div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
                <MessageSquare size={22} />
              </div>
              <div>
                <h4 className="font-black uppercase text-[10px] tracking-[0.2em] text-blue-400 dark:text-blue-500 leading-none">Information</h4>
                <p className="font-bold text-blue-900 dark:text-blue-200 text-sm">
                  {config.categories.find(c => c.id === question.category)?.name || question.category}
                </p>
              </div>
            </div>

            <div className="prose prose-blue max-w-none">
              <p className="text-blue-900 dark:text-blue-100 text-xl font-medium leading-relaxed mb-10 whitespace-pre-wrap italic opacity-90">
                "{text}"
              </p>
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-blue-100/50 dark:border-slate-700">
              <div className="flex gap-4">
                {canGoBack && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onBack}
                    className="bg-white/80 backdrop-blur text-gray-500 border border-gray-200 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                  >
                    Zurück
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCancelConfirm(true)}
                  className="bg-red-50 text-red-500 border border-red-100 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-red-100 hover:text-red-700 transition-all shadow-sm"
                >
                  Abbrechen
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAnswer('Gelesen')}
                className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2"
              >
                Verstanden & Weiter
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          key={question.id}
          className={cn(
            "border-2 p-10 rounded-[2.5rem] shadow-2xl transition-all duration-500",
            isObservation
              ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 shadow-amber-100/50 ring-8 ring-amber-50/50 dark:ring-amber-900/10"
              : "bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 shadow-slate-200/50"
          )}
        >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2 text-gray-500">
          {isObservation ? <Eye size={18} className="text-amber-600" /> : <Info size={18} />}
          <h4 className="font-bold uppercase text-xs tracking-wider">
            {config.categories.find(c => c.id === question.category)?.name || question.category}
          </h4>
        </div>
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-400">ID: {question.id}</span>
      </div>

      <h3 className={cn(
        "text-xl font-bold mb-10 leading-tight whitespace-pre-wrap tracking-tight",
        isObservation ? "text-amber-900 dark:text-amber-200" : "text-slate-800 dark:text-slate-100"
      )}>
        {text}
      </h3>

      {answerType.includes('dropdown') && (
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Auswählen:</label>
          <select
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Bitte wählen...</option>
            {familyRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      )}

      <AnimatePresence>
        {(answerType.includes('anmerkung') || answerType.includes('nur anmerkung')) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <CornerDownRight size={14} className="text-blue-500" />
              Anmerkung / Details:
            </label>
            <textarea
              className="w-full border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 shadow-inner"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Geben Sie hier zusätzliche Informationen ein..."
            ></textarea>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-4">
          {answerType.includes('nur anmerkung') ? (
            <motion.button
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer('Erfasst', notes)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-blue-200 dark:hover:shadow-blue-900/40 transition-all duration-300"
            >
              Speichern & Weiter
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAnswer('Ja', notes || dropdownValue)}
                disabled={answerType.includes('dropdown') && !dropdownValue}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-blue-200 dark:hover:shadow-blue-900/40 transition-all duration-300 disabled:opacity-50"
              >
                Ja
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAnswer('Nein', notes)}
                className="flex-1 bg-gradient-to-r from-rose-600 to-rose-500 dark:from-rose-700 dark:to-rose-600 text-white py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-rose-200 dark:hover:shadow-rose-900/40 transition-all duration-300"
              >
                Nein
              </motion.button>

              {answerType.includes('nicht beantwortet') && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAnswer('Nicht beantwortet', notes)}
                  className="flex-1 bg-slate-500 dark:bg-slate-600 text-white py-4 rounded-xl font-bold hover:bg-slate-600 dark:hover:bg-slate-500 transition"
                >
                  N.B.
                </motion.button>
              )}
            </>
          )}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-slate-700">
          <div className="flex gap-4">
            {canGoBack && (
              <motion.button
                whileHover={{ x: -3 }}
                onClick={onBack}
                className="px-6 py-3 rounded-xl font-bold border border-gray-200 dark:border-slate-600 text-gray-400 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-600 dark:hover:text-slate-200 transition text-sm"
              >
                Zurück
              </motion.button>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowCancelConfirm(true)}
            className="px-6 py-3 rounded-xl font-bold text-red-300 dark:text-red-900/60 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition text-sm"
          >
            Abbrechen
          </motion.button>
        </div>
      </div>

        </motion.div>
      )}

      <AnimatePresence>
        {showCancelConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelConfirm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl max-w-md w-full border border-slate-100 dark:border-slate-700 text-center"
            >
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">Gespräch abbrechen?</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
                Sind Sie sicher? Alle bisherigen Antworten werden verworfen und der Prozess wird beendet.
              </p>
              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAnswer('Abbruch')}
                  className="w-full py-4 bg-red-600 text-white rounded-2xl font-black shadow-lg shadow-red-200 dark:shadow-none hover:bg-red-700 transition-colors"
                >
                  Ja, Gespräch abbrechen
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCancelConfirm(false)}
                  className="w-full py-4 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Nein, weiterführen
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

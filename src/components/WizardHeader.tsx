import React, { useState } from 'react';
import { ClientData } from '../services/crmService';
import { Sun, Moon, Type, Plus, Minus, Languages } from 'lucide-react';
import config from '../data/config.json';
import { formatDate } from '../utils/dateUtils';

interface Props {
  clientData: ClientData;
  progress: {
    current: number;
    total: number;
    percent: number;
  };
  language: string;
  onLanguageChange: (lang: string) => void;
}

export const WizardHeader: React.FC<Props> = ({ clientData, progress, language, onLanguageChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(100);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.min(Math.max(fontSize + delta, 80), 150);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl mb-8 shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-5xl font-black text-blue-900 dark:text-blue-400 leading-tight tracking-tighter drop-shadow-sm">Beurteilungsassistent</h2>
          <p className="text-blue-600 dark:text-blue-300 text-lg font-bold uppercase tracking-[0.3em] mt-2">Erfassung besonderer Bedürfnisse</p>
          <div className="flex items-center gap-2 mt-4">
            <span className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">
              Kategorie
            </span>
            <p className="text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-widest">{clientData.groupId}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100">
            <button
              onClick={() => adjustFontSize(-10)}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-gray-500 transition-all"
              title="Schrift verkleinern"
              aria-label="Schrift verkleinern"
            >
              <Minus size={14} />
            </button>
            <div className="px-2 text-[10px] font-bold text-gray-400 flex items-center gap-1">
              <Type size={12} />
              <span>{fontSize}%</span>
            </div>
            <button
              onClick={() => adjustFontSize(10)}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-gray-500 transition-all"
              title="Schrift vergrößern"
              aria-label="Schrift vergrößern"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 bg-gray-50 hover:bg-white hover:shadow-sm border border-gray-100 rounded-xl text-gray-500 transition-all"
            title={isDarkMode ? "Hellmodus" : "Dunkelmodus"}
            aria-label={isDarkMode ? "Hellmodus aktivieren" : "Dunkelmodus aktivieren"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="text-sm font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
            Frage {progress.current} <span className="text-blue-300 mx-1">von</span> {progress.total}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 shadow-inner transition-all">
        <div className="flex-1">
          <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Klient*in</p>
          <p className="font-black text-slate-800 dark:text-slate-100 text-2xl leading-none tracking-tight">{clientData.firstName} {clientData.lastName}</p>
          {clientData.birthDate && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[9px] font-black bg-white dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-700 uppercase">Geburtsdatum</span>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-black tabular-nums">
                {formatDate(clientData.birthDate)}
              </p>
            </div>
          )}
        </div>
        <div className="w-px h-10 bg-slate-200 dark:bg-slate-700"></div>
        <div className="text-center min-w-[60px]">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Alter</p>
          <p className="font-black text-slate-800 dark:text-slate-100 text-2xl leading-none">{clientData.age}</p>
          <p className="text-[8px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">Jahre</p>
        </div>
        <div className="w-px h-10 bg-slate-200 dark:bg-slate-700"></div>
        <div className="min-w-[140px]">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1">
            <Languages size={11} /> Sprache
          </p>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
            title={`Muttersprache: ${clientData.motherTongue || clientData.language}`}
          >
            {config.languages.map(lang => (
              <option key={lang.id} value={lang.id}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black inline-block py-1 px-3 uppercase rounded-xl text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-900/40 shadow-sm shadow-red-100/50 dark:shadow-none">
              Prozess-Status
            </span>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-red-600 dark:text-red-400 drop-shadow-sm">
              {progress.percent}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-100 dark:bg-slate-700 ring-2 ring-red-50 dark:ring-red-900/10 transition-all shadow-inner">
          <div
            style={{ width: `${progress.percent}%` }}
            className="shadow-md shadow-red-200 dark:shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 dark:bg-red-600 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
          ></div>
        </div>
      </div>
    </div>
  );
};

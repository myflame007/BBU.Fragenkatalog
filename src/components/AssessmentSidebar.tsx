import React from 'react';
import config from '../data/config.json';
import catalogData from '../data/questionCatalog.json';
import { AlertCircle, ShieldAlert } from 'lucide-react';

const catalog = catalogData as any;

interface Props {
  assessments: Record<string, boolean>;
}

export const AssessmentSidebar: React.FC<Props> = ({ assessments }) => {
  // List of "real" risk assessment items that should be displayed
  const realRiskIds = [
    "1a.13", "1b.14", "5.8", "5.9", "6.6", "7.22", "7.23",
    "9b.10", "10a.7", "10a.8", "10a.9", "10c.7", "10c.8", "10d.7"
  ];

  // Find active assessments that are in the real risk list
  const activeAssessmentIds = Object.keys(assessments).filter(id =>
    assessments[id] && realRiskIds.includes(id)
  );

  if (activeAssessmentIds.length === 0) {
    return (
      <div className="w-96 bg-slate-50 dark:bg-slate-900/50 border-l border-slate-200 dark:border-slate-800 h-screen p-12 sticky top-0 overflow-y-auto hidden xl:flex flex-col items-center justify-center text-center ml-8 transition-colors">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <ShieldAlert size={48} className="text-slate-300 dark:text-slate-700" />
        </div>
        <p className="text-slate-400 dark:text-slate-500 font-bold text-lg leading-tight uppercase tracking-tighter">Keine Risiken<br/>erkannt</p>
        <div className="mt-4 w-12 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      </div>
    );
  }

  // Group active assessments by their category name
  const risksByCategory: Record<string, any[]> = {};

  activeAssessmentIds.forEach(id => {
    const question = catalog.questions[id];
    if (question) {
      const sectionName = question.category || 'Allgemein';

      if (!risksByCategory[sectionName]) {
        risksByCategory[sectionName] = [];
      }
      risksByCategory[sectionName].push(question);
    }
  });

  return (
    <div className="w-96 bg-white dark:bg-slate-800 border-l border-slate-100 dark:border-slate-700 h-screen p-8 sticky top-0 overflow-y-auto hidden xl:block shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-10 ml-8 transition-colors">
      <div className="flex items-center justify-between mb-10 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-900/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-600 rounded-xl text-white shadow-lg shadow-red-200">
            <ShieldAlert size={22} />
          </div>
          <h3 className="text-xl font-black text-red-900 dark:text-red-400 tracking-tight">Risiko</h3>
        </div>
        <span className="bg-red-200 dark:bg-red-900/40 text-red-700 dark:text-red-200 text-xs font-black px-2 py-1 rounded-lg">
          {activeAssessmentIds.length}
        </span>
      </div>

      <div className="space-y-8">
        {Object.entries(risksByCategory).map(([categoryName, questions]) => (
          <div key={categoryName} className="space-y-3">
             <div className="text-[10px] font-black text-red-400 dark:text-red-500/80 uppercase tracking-widest pl-1">{categoryName}</div>
             {questions.map(q => (
               <div key={q.id} className="p-5 rounded-3xl bg-white dark:bg-slate-700 border border-red-100 dark:border-red-900/20 shadow-[0_10px_20px_rgba(254,226,226,0.5)] dark:shadow-none hover:shadow-[0_15px_30px_rgba(254,226,226,0.8)] transition-all duration-300 animate-in zoom-in-95 duration-500 group/item relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                  <div className="text-slate-800 dark:text-slate-200 font-bold text-sm leading-snug mb-4 pr-2">
                    {q.text.de}
                  </div>
                  <div className="flex items-center gap-2 py-1 px-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl w-fit group-hover/item:bg-red-600 group-hover/item:text-white transition-colors duration-300">
                    <AlertCircle size={12} />
                    <span className="text-[10px] font-black uppercase tracking-wider">Erkannt</span>
                  </div>
               </div>
             ))}
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400 font-medium italic">
          Diese Liste wird automatisch basierend auf Ihren Antworten aktualisiert.
        </p>
      </div>
    </div>
  );
};

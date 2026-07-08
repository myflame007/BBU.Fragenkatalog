import React, { useState } from 'react';
import catalogData from '../data/questionCatalog.json';
import config from '../data/config.json';
import { AlertCircle, ChevronLeft, ChevronRight, ShieldAlert } from 'lucide-react';
import { cn } from '../utils/cn';

const catalog = catalogData as any;

interface Props {
  assessments: Record<string, boolean>;
}

export const AssessmentSidebar: React.FC<Props> = ({ assessments }) => {
  const [collapsed, setCollapsed] = useState(false);

  // List of "real" risk assessment items that should be displayed
  const realRiskIds = [
    "1a.13", "1b.14", "5.8", "5.9", "6.6", "7.22", "7.23",
    "9b.10", "10a.7", "10a.8", "10a.9", "10c.7", "10c.8", "10d.7", "10e.12", "10e.13", "11.3", "11.3.1"
  ];

  // Categories that are created immediately
  const baseCategoryIds = ['cat_1a', 'cat_1b', 'cat_5', 'cat_6'];

  // Find active assessments that are in the real risk list or base category list
  const activeAssessmentIds = Object.keys(assessments).filter(id =>
    assessments[id] && (realRiskIds.includes(id) || baseCategoryIds.includes(id))
  );

  if (collapsed) {
    return (
      <div className="w-12 bg-slate-50 dark:bg-slate-900/50 border-l border-slate-200 dark:border-slate-800 h-screen sticky top-0 hidden xl:flex flex-col items-center justify-start py-6 ml-4 transition-colors">
        <button
          onClick={() => setCollapsed(false)}
          className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition border border-slate-200 dark:border-slate-700"
          title="Risiko-Sidebar einblenden"
          aria-label="Risiko-Sidebar einblenden"
        >
          <ChevronLeft className="text-slate-500 dark:text-slate-400" size={18} />
        </button>
        {activeAssessmentIds.length > 0 && (
          <div className="mt-3 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-700 dark:text-red-300 text-xs font-black">
            {activeAssessmentIds.length}
          </div>
        )}
      </div>
    );
  }

  if (activeAssessmentIds.length === 0) {
    return (
      <div className="w-96 bg-slate-50 dark:bg-slate-900/50 border-l border-slate-200 dark:border-slate-800 h-screen p-12 sticky top-0 overflow-y-auto hidden xl:flex flex-col items-center justify-center text-center ml-8 transition-colors">
        <button
          onClick={() => setCollapsed(true)}
          className="absolute top-4 right-4 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition"
          title="Sidebar ausblenden"
          aria-label="Sidebar ausblenden"
        >
          <ChevronRight size={16} className="text-slate-400" />
        </button>
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

  const processedQuestions = new Set<string>();

  activeAssessmentIds.forEach(id => {
    let question = catalog.questions[id];
    let categoryName = 'Allgemein';

    // Handle illiteracy de-duplication and custom naming
    if (id === '11.3' || id === '11.3.1') {
      if (processedQuestions.has('Analphabetismus')) return;
      question = {
        id: 'risk_illiteracy',
        text: { de: 'Analphabetismus' },
        category: 'Sonstiges'
      };
      processedQuestions.add('Analphabetismus');
      categoryName = 'Sonstige Besondere Bedürfnisse';
    } else if (!question && baseCategoryIds.includes(id)) {
      // Special handling for immediate categories that are not "questions"
      const category = config.categories.find((c: any) => c.id === id.replace('cat_', '')) ||
                       config.categories.find((c: any) => c.id === id);

      question = {
        id,
        text: { de: category?.name || id },
        isBaseCategory: true
      };
      categoryName = category?.name || 'Kategorie';
    } else if (question) {
      const cat = config.categories.find((c: any) =>
        c.id === question.category ||
        c.id === `cat_${question.category}` ||
        `cat_${c.id}` === question.category ||
        c.name === question.category
      );
      categoryName = cat?.name || question.category || 'Allgemein';
    }

    if (question) {
      // Requirement: For categories 1a, 1b, 5, 6, do not show the base category box
      const hideBaseCardIds = ['cat_1a', 'cat_1b', 'cat_5', 'cat_6'];
      if (question.isBaseCategory && hideBaseCardIds.includes(question.id)) {
        // Ensure the category exists in the map so the header is shown, but don't add the question card
        if (!risksByCategory[categoryName]) {
          risksByCategory[categoryName] = [];
        }
        return;
      }

      if (!risksByCategory[categoryName]) {
        risksByCategory[categoryName] = [];
      }
      risksByCategory[categoryName].push(question);
    }
  });

  return (
    <div className="w-96 bg-white dark:bg-slate-800 border-l border-slate-100 dark:border-slate-700 h-screen p-8 sticky top-0 overflow-y-auto hidden xl:block shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-10 ml-8 transition-colors">
      <div className="flex items-center justify-between mb-10 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
            <ShieldAlert size={22} />
          </div>
          <h3 className="text-xl font-black text-blue-900 dark:text-blue-400 tracking-tight">Besondere Bedürfnisse und Risiken</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-red-200 dark:bg-red-900/40 text-red-700 dark:text-red-200 text-xs font-black px-2 py-1 rounded-lg">
            {activeAssessmentIds.length}
          </span>
          <button
            onClick={() => setCollapsed(true)}
            className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition"
            title="Sidebar ausblenden"
            aria-label="Sidebar ausblenden"
          >
            <ChevronRight size={16} className="text-red-400" />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(risksByCategory).map(([categoryName, questions]) => (
          <div key={categoryName} className="space-y-3">
             <div className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest pl-1 mb-2 border-b border-blue-100 dark:border-blue-900/30 pb-1">{categoryName}</div>
             {questions.map(q => (
               <div key={q.id} className={cn(
                 "p-5 rounded-3xl bg-white dark:bg-slate-700 border shadow-[0_10px_20px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-300 animate-in zoom-in-95 duration-500 group/item relative overflow-hidden",
                 q.isBaseCategory ? "border-blue-100 dark:border-blue-900/20" : "border-red-100 dark:border-red-900/20 shadow-[0_10px_20px_rgba(254,226,226,0.5)]"
               )}>
                  <div className={cn("absolute top-0 left-0 w-1.5 h-full", q.isBaseCategory ? "bg-blue-500" : "bg-red-500")}></div>
                  <div className={cn(
                    "text-slate-800 dark:text-slate-200 font-bold leading-snug pr-2",
                    q.isBaseCategory ? "text-lg" : "text-sm mb-4"
                  )}>
                    {q.text.de}
                  </div>
                  {!q.isBaseCategory && (
                    <div className="flex items-center gap-2 py-1 px-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl w-fit group-hover/item:bg-red-600 group-hover/item:text-white transition-colors duration-300">
                      <AlertCircle size={12} />
                      <span className="text-[10px] font-black uppercase tracking-wider">Risiko Erkannt</span>
                    </div>
                  )}
               </div>
             ))}
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-700 text-center">
        <p className="text-xs text-gray-400 dark:text-slate-500 font-medium italic">
          Diese Liste wird automatisch basierend auf Ihren Antworten aktualisiert.
        </p>
      </div>
    </div>
  );
};

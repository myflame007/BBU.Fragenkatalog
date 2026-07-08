import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface Props {
  onDirect: () => void;
  onViaParents: () => void;
}

export const AgeGateModal: React.FC<Props> = ({ onDirect, onViaParents }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-slate-100 dark:border-slate-700"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
          <AlertCircle size={32} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Jugendliche*r (14-18J)</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Bitte wählen Sie den passenden Fragenkatalog.</p>
        </div>
      </div>
      <div className="space-y-4">
        <button
          onClick={onDirect}
          className="w-full p-6 text-left rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
        >
          <div className="font-black text-lg text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">Direktbefragung (14+)</div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Fragen werden direkt an die/den Jugendliche*n gestellt.</p>
        </button>
        <button
          onClick={onViaParents}
          className="w-full p-6 text-left rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
        >
          <div className="font-black text-lg text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">Befragung über Eltern</div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Fragen werden im Beisein der Eltern/Bezugspersonen geklärt.</p>
        </button>
      </div>
    </motion.div>
  </motion.div>
);

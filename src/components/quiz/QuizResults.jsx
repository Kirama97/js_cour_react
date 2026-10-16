import { RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuizResults({ score, resultMessage, onReplay }) {
  return (
    <div className="bg-white dark:bg-[#16213E] rounded-2xl p-6 sm:p-10 shadow-lg border border-slate-200 dark:border-white/10 text-center animate-in zoom-in-95 duration-200 max-w-lg mx-auto">
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#F7DF1E]/15 border border-[#F7DF1E]/30 flex items-center justify-center shadow-xs">
        <span className="text-3xl font-black text-slate-900 dark:text-[#F7DF1E] font-display">
          {score}
          <span className="text-sm font-semibold text-slate-400 dark:text-gray-400">/10</span>
        </span>
      </div>
      
      <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-2">
        {resultMessage}
      </h2>
      <p className="text-xs text-slate-500 dark:text-gray-400 mb-8 leading-relaxed max-w-sm mx-auto">
        Session d'évaluation terminée. Continuez à pratiquer dans les modules pour consolider vos acquis.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button 
          onClick={onReplay}
          className="flex items-center justify-center gap-2 bg-[#F7DF1E] hover:bg-yellow-300 text-[#1A1A2E] font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Rejouer le quiz
        </button>
        <Link 
          to="/"
          className="flex items-center justify-center gap-2 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-gray-200 font-semibold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
        >
          Retour aux cours
        </Link>
      </div>
    </div>
  );
}

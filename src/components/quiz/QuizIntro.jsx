import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuizIntro({ onStart }) {
  return (
    <div className="text-center py-10 max-w-xl mx-auto animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-2xl bg-[#F7DF1E] text-[#1A1A2E] flex items-center justify-center mx-auto mb-6 shadow-md">
        <span className="font-extrabold text-2xl font-mono">?</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display mb-3 tracking-tight">
        Évaluation JavaScript
      </h1>
      <p className="text-sm text-slate-600 dark:text-gray-300 mb-8 leading-relaxed">
        Testez vos connaissances à travers 10 questions aléatoires issues des modules du cours. Vous disposez de 30 secondes par question.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button 
          onClick={onStart}
          className="flex items-center justify-center gap-2 bg-[#F7DF1E] hover:bg-yellow-300 text-[#1A1A2E] font-bold text-sm px-7 py-3 rounded-xl transition-all shadow-md active:scale-95"
        >
          <Play className="w-4 h-4 fill-current" /> Commencer le quiz
        </button>
        <Link 
          to="/"
          className="flex items-center justify-center gap-2 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-gray-200 font-semibold text-xs px-6 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
        >
          Retour aux modules
        </Link>
      </div>
    </div>
  );
}

import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuizResults({ score, resultMessage, onReplay }) {
  return (
    <div className="bg-white dark:bg-[#16213E] rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-white/10 text-center animate-in zoom-in-95 duration-500">
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-[#F7DF1E] blur-2xl opacity-20 rounded-full animate-pulse"></div>
        <div className="relative flex items-center justify-center w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#F7DF1E] to-yellow-500 border-4 border-white dark:border-[#1A1A2E] shadow-2xl">
          <span className="text-3xl font-extrabold text-[#1A1A2E]">{score}<span className="text-xl">/10</span></span>
        </div>
      </div>
      
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
        {resultMessage}
      </h2>
      <p className="text-base text-slate-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
        Vous avez affronté 10 questions aléatoires de différents niveaux de difficulté. 
        Relancez le quiz pour tester d'autres questions !
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onReplay}
          className="flex items-center justify-center gap-3 bg-[#F7DF1E] text-[#1A1A2E] font-bold text-base px-6 py-3 rounded-lg hover:bg-yellow-300 hover:scale-105 transition-all shadow-xl shadow-[#F7DF1E]/20"
        >
          <RotateCcw className="w-5 h-5" /> Rejouer un nouveau Quiz
        </button>
        <Link 
          to="/"
          className="flex items-center justify-center gap-3 border-2 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300 font-bold text-base px-6 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
        >
          Retourner réviser
        </Link>
      </div>
    </div>
  );
}

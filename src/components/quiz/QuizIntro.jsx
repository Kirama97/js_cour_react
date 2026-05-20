import React from 'react';
import { Play, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuizIntro({ onStart }) {
  return (
    <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#F7DF1E] to-yellow-500 mb-6 shadow-lg shadow-[#F7DF1E]/20">
        <BrainCircuit className="w-10 h-10 text-[#1A1A2E]" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">JavaScript Master Quiz</h1>
      <p className="text-base text-slate-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
        Testez vos connaissances avec 10 questions tirées au sort parmi notre grande base de données. 
        Attention, vous avez 30 secondes par question !
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onStart}
          className="flex items-center justify-center gap-2 bg-[#F7DF1E] text-[#1A1A2E] font-bold text-base px-6 py-3 rounded-lg hover:bg-yellow-300 hover:scale-105 transition-all shadow-xl shadow-[#F7DF1E]/20"
        >
          <Play className="w-5 h-5 fill-current" /> Commencer le Quiz
        </button>
        <Link 
          to="/"
          className="flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300 font-bold text-base px-6 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
        >
          Retour aux cours
        </Link>
      </div>
    </div>
  );
}

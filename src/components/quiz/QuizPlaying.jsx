import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Timer, Trophy, Star } from 'lucide-react';

export default function QuizPlaying({
  question,
  currentQIndex,
  score,
  timeLeft,
  selectedAnswer,
  isAnswered,
  onAnswerClick,
  onNextQuestion
}) {
  const getDifficultyBadge = (difficulty) => {
    switch(difficulty) {
      case 'facile':
        return <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-emerald-500" /> Facile</span>;
      case 'moyen':
        return <span className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-orange-500" /> Moyen</span>;
      case 'difficile':
        return <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-red-500" /> Difficile</span>;
      default:
        return null;
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 dark:text-gray-400 bg-white dark:bg-[#16213E] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10">
            Question <span className="text-slate-900 dark:text-white text-base">{currentQIndex + 1}</span> / 10
          </span>
          {getDifficultyBadge(question.difficulty)}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300 bg-white dark:bg-[#16213E] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-sm">
            <Trophy className="w-4 h-4 text-[#F7DF1E]" />
            <span className="font-bold">Score: {score}</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-bold transition-colors text-sm ${timeLeft <= 5 && !isAnswered ? 'bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:border-red-800 animate-pulse' : 'bg-white dark:bg-[#16213E] text-slate-700 dark:text-gray-300 border-slate-200 dark:border-white/10'}`}>
            <Timer className="w-4 h-4" />
            <span className="w-6 text-center">{timeLeft}s</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-200 dark:bg-black/40 h-1.5 rounded-full mb-6 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-yellow-400 to-[#F7DF1E] h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentQIndex) / 10) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white dark:bg-[#16213E] rounded-2xl p-5 md:p-7 shadow-xl border border-slate-200 dark:border-white/10 backdrop-blur-xl relative overflow-hidden transition-colors">
        
        <h2 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          {question.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {question.options.map((option, index) => {
            let buttonStyle = "border-slate-200 dark:border-white/10 hover:border-[#F7DF1E] hover:bg-[#F7DF1E]/5 dark:hover:bg-[#F7DF1E]/10";
            let icon = null;

            if (isAnswered) {
              if (option.isCorrect) {
                buttonStyle = "border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 scale-[1.02] shadow-lg shadow-green-500/10";
                icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
              } else if (index === selectedAnswer) {
                buttonStyle = "border-red-500 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 scale-[0.98]";
                icon = <XCircle className="w-5 h-5 text-red-500" />;
              } else {
                buttonStyle = "border-slate-200 dark:border-white/10 opacity-40 scale-[0.98]";
              }
            }

            return (
              <button
                key={index}
                onClick={() => onAnswerClick(index)}
                disabled={isAnswered}
                className={`group flex items-center justify-between w-full text-left p-3 px-4 rounded-xl border-2 transition-all duration-300 focus-visible:outline-none ${buttonStyle}`}
              >
                <span className="text-base font-medium text-slate-700 dark:text-gray-200">{option.text}</span>
                {icon && <div className="animate-in zoom-in">{icon}</div>}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${selectedAnswer !== -1 && question.options[selectedAnswer].isCorrect ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/50' : 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50'}`}>
              <div className="flex-grow">
                <h4 className={`font-bold mb-1 text-sm ${selectedAnswer !== -1 && question.options[selectedAnswer].isCorrect ? 'text-green-800 dark:text-green-400' : 'text-blue-800 dark:text-blue-400'}`}>
                  {selectedAnswer === -1 ? "Temps écoulé !" : (question.options[selectedAnswer].isCorrect ? "Bonne réponse !" : "Explication")}
                </h4>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
              
              <div className="shrink-0 flex self-end md:self-center">
                <button
                  onClick={onNextQuestion}
                  className="flex items-center justify-center gap-2 bg-[#F7DF1E] text-[#1A1A2E] font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-yellow-300 hover:scale-105 transition-all shadow-md shadow-[#F7DF1E]/20 focus-visible:outline-none w-full md:w-auto"
                >
                  {currentQIndex === 9 ? "Résultats" : "Suivant"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

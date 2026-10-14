import { CheckCircle2, XCircle, ArrowRight, Timer, Trophy } from 'lucide-react';

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
  return (
    <div className="animate-in fade-in duration-200 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800 dark:text-gray-200 bg-white dark:bg-[#16213E] px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-xs">
            Question {currentQIndex + 1} / 10
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 capitalize">
            {question.difficulty}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-800 dark:text-gray-200 bg-white dark:bg-[#16213E] px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-[#F7DF1E]" />
            <span>Score : <strong className="text-yellow-600 dark:text-[#F7DF1E]">{score}</strong></span>
          </div>
          <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border font-bold text-xs shadow-xs transition-colors ${
            timeLeft <= 5 && !isAnswered 
              ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800 animate-pulse' 
              : 'bg-white dark:bg-[#16213E] text-slate-800 dark:text-gray-200 border-slate-200 dark:border-white/10'
          }`}>
            <Timer className="w-3.5 h-3.5 text-[#F7DF1E]" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-100 dark:bg-white/10 h-2 rounded-full mb-6 overflow-hidden">
        <div 
          className="bg-[#F7DF1E] h-full transition-all duration-300 shadow-[0_0_8px_rgba(247,223,30,0.4)]"
          style={{ width: `${((currentQIndex + 1) / 10) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white dark:bg-[#16213E] rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-white/10 transition-colors">
        <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white font-display mb-6 leading-relaxed">
          {question.question}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {question.options.map((option, index) => {
            let buttonStyle = "border-slate-200 dark:border-white/10 hover:border-yellow-400 dark:hover:border-[#F7DF1E]/50 bg-white dark:bg-[#1A1A2E] text-slate-800 dark:text-gray-200";
            let icon = null;

            if (isAnswered) {
              if (option.isCorrect) {
                buttonStyle = "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300";
                icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
              } else if (index === selectedAnswer) {
                buttonStyle = "border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300";
                icon = <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
              } else {
                buttonStyle = "border-slate-100 dark:border-white/5 opacity-40";
              }
            }

            return (
              <button
                key={index}
                onClick={() => onAnswerClick(index)}
                disabled={isAnswered}
                className={`flex items-center justify-between w-full text-left p-3.5 px-4 rounded-xl border text-sm font-medium transition-all ${buttonStyle}`}
              >
                <span>{option.text}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="animate-in fade-in duration-200 pt-5 border-t border-slate-100 dark:border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-grow">
                <h4 className="text-xs font-bold mb-1 text-slate-900 dark:text-white font-display">
                  {selectedAnswer === -1 
                    ? "Temps écoulé !" 
                    : (question.options[selectedAnswer]?.isCorrect ? "Bonne réponse ! 🎉" : "Explication")}
                </h4>
                <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
              
              <div className="shrink-0 flex self-end sm:self-center">
                <button
                  onClick={onNextQuestion}
                  className="flex items-center justify-center gap-1.5 bg-[#F7DF1E] hover:bg-yellow-300 text-[#1A1A2E] font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm hover:scale-105 active:scale-95"
                >
                  {currentQIndex === 9 ? "Résultats" : "Suivant"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

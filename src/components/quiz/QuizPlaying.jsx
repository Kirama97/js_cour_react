import { useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Timer, Trophy, X, AlertTriangle } from 'lucide-react';

export default function QuizPlaying({
  question,
  currentQIndex,
  score,
  timeLeft,
  selectedAnswer,
  isAnswered,
  onAnswerClick,
  onNextQuestion,
  isCancelConfirmOpen,
  onRequestCancel,
  onDismissCancel,
  onConfirmCancel
}) {
  useEffect(() => {
    if (!isCancelConfirmOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onDismissCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCancelConfirmOpen, onDismissCancel]);

  return (
    <div className="animate-in fade-in duration-200 max-w-3xl mx-auto">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-xs font-bold text-slate-800 dark:text-gray-200 bg-white dark:bg-[#16213E] px-3 sm:px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-xs">
            Question {currentQIndex + 1} / 10
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 capitalize">
            {question.difficulty}
          </span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="whitespace-nowrap flex items-center gap-1.5 text-slate-800 dark:text-gray-200 bg-white dark:bg-[#16213E] px-3 sm:px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold shadow-xs">
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
          <button
            id="btn-cancel-quiz"
            type="button"
            onClick={onRequestCancel}
            aria-label="Abandonner le quiz"
            title="Abandonner le quiz"
            className="whitespace-nowrap flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#16213E] text-slate-600 dark:text-gray-300 text-xs font-semibold shadow-xs transition-colors hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 dark:hover:text-rose-400 dark:hover:border-rose-500/40 dark:hover:bg-rose-950/30"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Abandonner</span>
          </button>
        </div>
      </div>

      <div className="w-full bg-slate-100 dark:bg-white/10 h-2 rounded-full mb-6 overflow-hidden">
        <div 
          className="bg-[#F7DF1E] h-full transition-all duration-300 shadow-[0_0_8px_rgba(247,223,30,0.4)]"
          style={{ width: `${((currentQIndex + 1) / 10) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white dark:bg-[#16213E] rounded-2xl p-4 sm:p-8 shadow-lg border border-slate-200 dark:border-white/10 transition-colors">
        <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white font-display mb-5 sm:mb-6 leading-relaxed break-words">
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
                className={`flex items-center justify-between gap-3 w-full text-left p-3 sm:p-3.5 px-4 rounded-xl border text-sm font-medium transition-all ${buttonStyle}`}
              >
                <span className="min-w-0 break-words">{option.text}</span>
                {icon && <span className="shrink-0">{icon}</span>}
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
              
              <div className="shrink-0 flex w-full sm:w-auto sm:self-center">
                <button
                  onClick={onNextQuestion}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-[#F7DF1E] hover:bg-yellow-300 text-[#1A1A2E] font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm hover:scale-105 active:scale-95"
                >
                  {currentQIndex === 9 ? "Résultats" : "Suivant"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {isCancelConfirmOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={onDismissCancel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-quiz-title"
        >
          <div
            className="bg-white dark:bg-[#16213E] w-full max-w-sm max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-slate-200 dark:border-white/10 p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-rose-500" />
            </div>
            <h3 id="cancel-quiz-title" className="text-base sm:text-lg font-bold text-center text-slate-900 dark:text-white font-display mb-2">
              Abandonner le quiz ?
            </h3>
            <p className="text-xs sm:text-sm text-center text-slate-600 dark:text-gray-300 leading-relaxed mb-5">
              Votre progression actuelle (question {currentQIndex + 1}/10, score {score}) sera perdue. Le chrono est en pause.
            </p>
            <div className="flex flex-col-reverse sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={onDismissCancel}
                autoFocus
                className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-700 dark:text-gray-200 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
              >
                Continuer le quiz
              </button>
              <button
                id="btn-confirm-cancel-quiz"
                type="button"
                onClick={onConfirmCancel}
                className="flex-1 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-500 transition-colors active:scale-95 shadow-sm"
              >
                Oui, abandonner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

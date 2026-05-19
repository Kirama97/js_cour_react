import React, { useState, useEffect } from 'react';
import { quizData } from '../../data/quiz';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Timer, Trophy, Play, BrainCircuit, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Quiz() {
  const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'results'
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  const startQuiz = () => {
    // Mélanger la base de données de 30 questions
    const shuffledDB = [...quizData].sort(() => 0.5 - Math.random());
    // Sélectionner 10 questions
    let selectedQs = shuffledDB.slice(0, 10);
    // Mélanger les options de chaque question
    selectedQs = selectedQs.map(q => {
      const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
      return { ...q, options: shuffledOptions };
    });
    
    setQuestions(selectedQs);
    setCurrentQIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeLeft(20);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'playing' && !isAnswered) {
      if (timeLeft > 0) {
        const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timerId);
      } else {
        // Temps écoulé
        handleAnswerClick(-1);
      }
    }
  }, [timeLeft, gameState, isAnswered]);

  const handleAnswerClick = (index) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index !== -1 && questions[currentQIndex].options[index].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQIndex(nextIndex);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(20);
    } else {
      setGameState('results');
    }
  };

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

  const getResultMessage = () => {
    if (score === 10) return "Expert JavaScript ! 🏆";
    if (score >= 7) return "Excellent travail ! 🌟";
    if (score >= 5) return "Bonnes bases, encore un effort ! 👍";
    return "Ne vous découragez pas, révisez les cours ! 📚";
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {gameState === 'intro' && (
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#F7DF1E] to-yellow-500 mb-8 shadow-lg shadow-[#F7DF1E]/20">
            <BrainCircuit className="w-12 h-12 text-[#1A1A2E]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">JavaScript Master Quiz</h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
            Testez vos connaissances avec 10 questions tirées au sort parmi notre grande base de données. 
            Attention, vous avez 20 secondes par question !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={startQuiz}
              className="flex items-center justify-center gap-2 bg-[#F7DF1E] text-[#1A1A2E] font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 hover:scale-105 transition-all shadow-xl shadow-[#F7DF1E]/20"
            >
              <Play className="w-6 h-6 fill-current" /> Commencer le Quiz
            </button>
            <Link 
              to="/"
              className="flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300 font-bold text-lg px-8 py-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              Retour aux cours
            </Link>
          </div>
        </div>
      )}

      {gameState === 'playing' && questions.length > 0 && (
        <div className="animate-in fade-in duration-300">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-500 dark:text-gray-400 bg-white dark:bg-[#16213E] px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10">
                Question <span className="text-slate-900 dark:text-white text-lg">{currentQIndex + 1}</span> / 10
              </span>
              {getDifficultyBadge(questions[currentQIndex].difficulty)}
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300 bg-white dark:bg-[#16213E] px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10">
                <Trophy className="w-4 h-4 text-[#F7DF1E]" />
                <span className="font-bold">Score: {score}</span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-bold transition-colors ${timeLeft <= 5 && !isAnswered ? 'bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:border-red-800 animate-pulse' : 'bg-white dark:bg-[#16213E] text-slate-700 dark:text-gray-300 border-slate-200 dark:border-white/10'}`}>
                <Timer className="w-4 h-4" />
                <span className="w-6 text-center">{timeLeft}s</span>
              </div>
            </div>
          </div>

          <div className="w-full bg-slate-200 dark:bg-black/40 h-2 rounded-full mb-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-[#F7DF1E] h-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQIndex) / 10) * 100}%` }}
            ></div>
          </div>

          <div className="bg-white dark:bg-[#16213E] rounded-3xl p-5 md:p-10 shadow-xl border border-slate-200 dark:border-white/10 backdrop-blur-xl relative overflow-hidden transition-colors">
            
            <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 md:mb-10 leading-tight">
              {questions[currentQIndex].question}
            </h2>

            <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
              {questions[currentQIndex].options.map((option, index) => {
                let buttonStyle = "border-slate-200 dark:border-white/10 hover:border-[#F7DF1E] hover:bg-[#F7DF1E]/5 dark:hover:bg-[#F7DF1E]/10";
                let icon = null;

                if (isAnswered) {
                  if (option.isCorrect) {
                    buttonStyle = "border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 scale-[1.02] shadow-lg shadow-green-500/10";
                    icon = <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500" />;
                  } else if (index === selectedAnswer) {
                    buttonStyle = "border-red-500 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 scale-[0.98]";
                    icon = <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-500" />;
                  } else {
                    buttonStyle = "border-slate-200 dark:border-white/10 opacity-40 scale-[0.98]";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={isAnswered}
                    className={`group flex items-center justify-between w-full text-left p-4 md:p-5 rounded-xl md:rounded-2xl border-2 transition-all duration-300 focus-visible:outline-none ${buttonStyle}`}
                  >
                    <span className="text-base md:text-lg font-medium text-slate-700 dark:text-gray-200">{option.text}</span>
                    {icon && <div className="animate-in zoom-in">{icon}</div>}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`p-5 rounded-2xl border mb-8 ${selectedAnswer !== -1 && questions[currentQIndex].options[selectedAnswer].isCorrect ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/50' : 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50'}`}>
                  <h4 className={`font-bold mb-2 ${selectedAnswer !== -1 && questions[currentQIndex].options[selectedAnswer].isCorrect ? 'text-green-800 dark:text-green-400' : 'text-blue-800 dark:text-blue-400'}`}>
                    {selectedAnswer === -1 ? "Temps écoulé !" : (questions[currentQIndex].options[selectedAnswer].isCorrect ? "Bonne réponse !" : "Explication")}
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {questions[currentQIndex].explanation}
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-3 bg-[#F7DF1E] text-[#1A1A2E] font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 hover:scale-105 transition-all shadow-xl shadow-[#F7DF1E]/20 focus-visible:outline-none"
                  >
                    {currentQIndex === 9 ? "Voir mon résultat" : "Question suivante"}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {gameState === 'results' && (
        <div className="bg-white dark:bg-[#16213E] rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-white/10 text-center animate-in zoom-in-95 duration-500">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-[#F7DF1E] blur-2xl opacity-20 rounded-full animate-pulse"></div>
            <div className="relative flex items-center justify-center w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#F7DF1E] to-yellow-500 border-4 border-white dark:border-[#1A1A2E] shadow-2xl">
              <span className="text-5xl font-black text-[#1A1A2E]">{score}<span className="text-2xl">/10</span></span>
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
            {getResultMessage()}
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 mb-12 max-w-lg mx-auto">
            Vous avez affronté 10 questions aléatoires de différents niveaux de difficulté. 
            Relancez le quiz pour tester d'autres questions !
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={startQuiz}
              className="flex items-center justify-center gap-3 bg-[#F7DF1E] text-[#1A1A2E] font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 hover:scale-105 transition-all shadow-xl shadow-[#F7DF1E]/20"
            >
              <RotateCcw className="w-5 h-5" /> Rejouer un nouveau Quiz
            </button>
            <Link 
              to="/"
              className="flex items-center justify-center gap-3 border-2 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300 font-bold text-lg px-8 py-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              Retourner réviser
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

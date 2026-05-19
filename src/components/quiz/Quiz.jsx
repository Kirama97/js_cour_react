import React, { useState } from 'react';
import { quizData } from '../../data/quiz';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (index) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Quiz JavaScript</h1>
        <p className="text-slate-600 dark:text-gray-400">Testez vos connaissances sur les concepts fondamentaux.</p>
      </div>

      <div className="bg-white dark:bg-[#16213E] rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-white/10 transition-colors">
        {showScore ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#F7DF1E]/10 mb-6">
              <span className="text-4xl font-bold text-[#F7DF1E]">{score}/{quizData.length}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quiz terminé !</h2>
            <p className="text-slate-600 dark:text-gray-300 mb-8">
              {score === quizData.length ? "Parfait ! Vous maîtrisez les bases." : "C'est un bon début. N'hésitez pas à revoir les leçons."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={restartQuiz}
                className="flex items-center justify-center gap-2 bg-[#F7DF1E] text-[#1A1A2E] font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
              >
                <RotateCcw className="w-5 h-5" /> Recommencer
              </button>
              <Link 
                to="/"
                className="flex items-center justify-center gap-2 border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white font-bold px-6 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                Retour aux cours
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-semibold text-slate-500 dark:text-gray-400">
                Question {currentQuestion + 1} <span className="opacity-50">/ {quizData.length}</span>
              </span>
              <span className="text-sm font-semibold text-[#F7DF1E]">Score: {score}</span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-black/20 h-2 rounded-full mb-8 overflow-hidden">
              <div 
                className="bg-[#F7DF1E] h-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
              ></div>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-8">
              {quizData[currentQuestion].question}
            </h2>

            <div className="flex flex-col gap-3 mb-8">
              {quizData[currentQuestion].options.map((option, index) => {
                let buttonStyle = "border-slate-200 dark:border-white/10 hover:border-[#F7DF1E]/50 hover:bg-[#F7DF1E]/5 dark:hover:bg-[#F7DF1E]/10";
                let icon = null;

                if (isAnswered) {
                  if (index === quizData[currentQuestion].correctAnswer) {
                    buttonStyle = "border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400";
                    icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
                  } else if (index === selectedAnswer) {
                    buttonStyle = "border-red-500 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400";
                    icon = <XCircle className="w-5 h-5 text-red-500" />;
                  } else {
                    buttonStyle = "border-slate-200 dark:border-white/10 opacity-50";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={isAnswered}
                    className={`flex items-center justify-between w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-slate-700 dark:text-gray-200 focus-visible:outline-none ${buttonStyle}`}
                  >
                    <span>{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 mb-6">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <span className="font-bold block mb-1">Explication :</span>
                    {quizData[currentQuestion].explanation}
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 bg-[#F7DF1E] text-[#1A1A2E] font-bold px-6 py-2.5 rounded-lg hover:bg-yellow-300 transition-colors focus-visible:outline-none"
                  >
                    {currentQuestion === quizData.length - 1 ? "Voir le résultat" : "Question suivante"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

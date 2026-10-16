import { useState, useEffect, useCallback } from 'react';
import { quizData } from '../../data/quiz';
import QuizIntro from './QuizIntro';
import QuizPlaying from './QuizPlaying';
import QuizResults from './QuizResults';

export default function Quiz() {
  const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'results'
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

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
    setTimeLeft(30);
    setIsCancelConfirmOpen(false);
    setGameState('playing');
  };

  const cancelQuiz = () => {
    setIsCancelConfirmOpen(false);
    setQuestions([]);
    setCurrentQIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeLeft(30);
    setGameState('intro');
  };

  const handleAnswerClick = useCallback((index) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index !== -1 && questions[currentQIndex]?.options[index]?.isCorrect) {
      setScore(s => s + 1);
    }
  }, [isAnswered, questions, currentQIndex]);

  useEffect(() => {
    if (gameState === 'playing' && !isAnswered && !isCancelConfirmOpen) {
      if (timeLeft <= 0) {
        const timeout = setTimeout(() => {
          handleAnswerClick(-1);
        }, 0);
        return () => clearTimeout(timeout);
      }
      const timerId = setTimeout(() => {
        setTimeLeft(t => Math.max(0, t - 1));
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, gameState, isAnswered, isCancelConfirmOpen, handleAnswerClick]);

  useEffect(() => {
    if (gameState === 'results' && score > 5) {
      try {
        const audio = new Audio('/applaudissement.mp3');
        audio.play().catch(err => {
          void err;
        });
      } catch (err) {
        void err;
      }
    }
  }, [gameState, score]);

  const handleNextQuestion = () => {
    const nextIndex = currentQIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQIndex(nextIndex);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      setGameState('results');
    }
  };

  const getResultMessage = () => {
    if (score === 10) return "Expert JavaScript ! 🏆";
    if (score >= 7) return "Excellent travail ! 🌟";
    if (score >= 5) return "Bonnes bases, encore un effort ! 👍";
    return "Ne vous découragez pas, révisez les cours ! 📚";
  };

  return (
    <div className="max-w-4xl mx-auto w-full py-4">
      {gameState === 'intro' && (
        <QuizIntro onStart={startQuiz} />
      )}

      {gameState === 'playing' && questions.length > 0 && (
        <QuizPlaying
          question={questions[currentQIndex]}
          currentQIndex={currentQIndex}
          score={score}
          timeLeft={timeLeft}
          selectedAnswer={selectedAnswer}
          isAnswered={isAnswered}
          onAnswerClick={handleAnswerClick}
          onNextQuestion={handleNextQuestion}
          isCancelConfirmOpen={isCancelConfirmOpen}
          onRequestCancel={() => setIsCancelConfirmOpen(true)}
          onDismissCancel={() => setIsCancelConfirmOpen(false)}
          onConfirmCancel={cancelQuiz}
        />
      )}

      {gameState === 'results' && (
        <QuizResults
          score={score}
          resultMessage={getResultMessage()}
          onReplay={startQuiz}
        />
      )}
    </div>
  );
}

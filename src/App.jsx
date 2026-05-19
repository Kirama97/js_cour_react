import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WelcomeModal from './components/ui/WelcomeModal';
import ModuleGrid from './components/course/ModuleGrid';
import ModuleDetail from './components/course/ModuleDetail';
import Playground from './components/playground/Playground';
import ProgressBar from './components/course/ProgressBar';
import Quiz from './components/quiz/Quiz';
import { CourseProvider } from './context/CourseContext';
import { ThemeProvider } from './hooks/useTheme.jsx';
import { Play, Code } from 'lucide-react';

function Home() {
  return (
    <>
      <WelcomeModal />

      <div className="w-full">
        {/* HERO */}
        <section
          className="bg-white dark:bg-gradient-to-r dark:from-[#16213E] dark:to-[#0F3460] rounded-2xl p-8 mb-12 border border-slate-200 dark:border-[#F7DF1E]/10 relative overflow-hidden shadow-sm transition-colors"
          aria-labelledby="hero-title"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7DF1E]/5 rounded-full -translate-y-1/2 translate-x-1/4" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-[#F7DF1E]/5 rounded-full translate-y-1/2" aria-hidden="true"></div>

          <div className="relative">
            <span className="inline-block bg-[#F7DF1E]/10 text-[#F7DF1E] text-xs font-mono px-3 py-1 rounded-full mb-4 border border-[#F7DF1E]/30" aria-hidden="true">
              console.log("Bienvenue ! 👋")
            </span>
            <h2 id="hero-title" className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">
              Maîtrisez <span className="text-[#F7DF1E] dark:text-[#F7DF1E]">JavaScript</span><br/>par la pratique
            </h2>
            <p className="text-slate-600 dark:text-gray-300 max-w-xl mb-6">
              8 modules progressifs couvrant les fondamentaux du langage.
              Chaque module contient des leçons commentées et des exercices
              allant du simple au défi. Les modifications sont sauvegardées automatiquement.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#modules" className="bg-[#F7DF1E] text-[#1A1A2E] font-semibold px-5 py-2.5 rounded-lg hover:bg-yellow-300 transition-colors focus-visible:outline-none flex flex-row gap-2 items-center">
                Commencer <Play className="w-4 h-4" />
              </a>
              <a href="#playground" className="border border-[#F7DF1E]/40 text-[#F7DF1E] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#F7DF1E]/10 transition-colors focus-visible:outline-none flex flex-row gap-2 items-center">
                <Code className="w-4 h-4" /> Playground
              </a>
            </div>
          </div>
        </section>

        <ModuleGrid />
        <ModuleDetail />
        <Playground />
        <ProgressBar />
      </div>
    </>
  );
}

function AppContent() {
  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-[#1A1A2E] dark:text-white min-h-screen transition-colors duration-300 font-display flex flex-col">
      <Header />
      
      <div className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={
            <main className="max-w-7xl mx-auto px-6 py-12 w-full">
              <Home />
            </main>
          } />
          <Route path="/quiz" element={
            <main className="max-w-7xl mx-auto px-6 py-12 w-full flex-grow flex flex-col">
              <Quiz />
            </main>
          } />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CourseProvider>
          <AppContent />
        </CourseProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

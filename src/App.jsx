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
        {/* HERO — Thème JavaScript élégant & académique */}
        <section
          className="bg-white dark:bg-gradient-to-r dark:from-[#16213E] dark:to-[#0F3460] rounded-2xl p-8 sm:p-12 mb-12 border border-slate-200 dark:border-[#F7DF1E]/20 shadow-sm relative overflow-hidden transition-colors"
          aria-labelledby="hero-title"
        >
          {/* Cercles de fond subtils */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#F7DF1E]/10 dark:bg-[#F7DF1E]/5 rounded-full -translate-y-1/3 translate-x-1/4 blur-2xl pointer-events-none" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-[#F7DF1E]/10 dark:bg-[#F7DF1E]/5 rounded-full translate-y-1/2 blur-xl pointer-events-none" aria-hidden="true"></div>

          <div className="relative max-w-2xl">
            <span className="inline-block bg-[#F7DF1E]/15 text-slate-800 dark:text-[#F7DF1E] text-xs font-mono font-semibold px-3.5 py-1.5 rounded-full mb-4 border border-[#F7DF1E]/40" aria-hidden="true">
              console.log("Bienvenue ! 👋")
            </span>
            <h2 id="hero-title" className="text-3xl md:text-5xl font-extrabold mb-3 text-slate-900 dark:text-white font-display tracking-tight leading-tight">
              Maîtrisez <span className="text-yellow-500 dark:text-[#F7DF1E]">JavaScript</span><br/>par la pratique
            </h2>
            <p className="text-slate-600 dark:text-gray-300 max-w-xl mb-6 text-sm sm:text-base leading-relaxed">
              8 modules progressifs couvrant les fondamentaux du langage.
              Chaque module contient des leçons détaillées et des exercices interactifs avec éditeur côte à côte.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#modules" className="bg-[#F7DF1E] hover:bg-yellow-300 text-[#1A1A2E] font-bold px-6 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-sm flex items-center gap-2 active:scale-95">
                Commencer <Play className="w-4 h-4 fill-current" />
              </a>
              <a href="#playground" className="border border-slate-300 dark:border-[#F7DF1E]/40 hover:bg-slate-100 dark:hover:bg-[#F7DF1E]/10 text-slate-700 dark:text-[#F7DF1E] font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm flex items-center gap-2">
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
    <div className="bg-slate-50 text-slate-900 dark:bg-[#1A1A2E] dark:text-white min-h-screen transition-colors duration-200 flex flex-col font-sans antialiased">
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

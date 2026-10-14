import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme.jsx';
import { Moon, Sun, HelpCircle } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import SupportModal from '../ui/SupportModal';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { modules } = useCourse();
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white/95 dark:bg-[#16213E]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#F7DF1E]/20 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 bg-[#F7DF1E] text-[#1A1A2E] rounded-xl flex items-center justify-center shadow-sm">
              <span className="font-extrabold text-sm font-mono">JS</span>
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight text-slate-900 dark:text-white tracking-tight font-display">Cours JavaScript</h1>
              <p className="text-[11px] text-slate-500 dark:text-gray-400">Pratique & Fondamentaux</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-xs" aria-label="Statistiques du cours">
            <div className="text-center">
              <p className="text-yellow-500 dark:text-[#F7DF1E] font-bold text-lg font-display leading-tight">{modules.reduce((acc, m) => acc + m.exercices.length, 0)}</p>
              <p className="text-slate-500 dark:text-gray-400 text-[11px]">Exercices</p>
            </div>
            <div className="text-center">
              <p className="text-yellow-500 dark:text-[#F7DF1E] font-bold text-lg font-display leading-tight">{modules.length}</p>
              <p className="text-slate-500 dark:text-gray-400 text-[11px]">Modules</p>
            </div>
            <div className="text-center">
              <p className="text-yellow-500 dark:text-[#F7DF1E] font-bold text-lg font-display leading-tight">∞</p>
              <p className="text-slate-500 dark:text-gray-400 text-[11px]">Défis</p>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              to="/quiz" 
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-gray-200 hover:text-yellow-600 dark:hover:text-[#F7DF1E] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Quiz</span>
            </Link>

            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-[#0F3460] transition-colors focus-visible:outline-none" 
              aria-label="Changer le thème"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F7DF1E]" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button 
              onClick={() => setIsSupportModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 bg-[#F7DF1E] hover:bg-yellow-300 text-[#1A1A2E] px-3.5 py-1.5 rounded-lg font-bold text-xs transition-transform hover:scale-105 shadow-[0_0_12px_rgba(247,223,30,0.25)]"
            >
              <img src="wave.png" className="w-4 h-4 object-contain" alt="Wave" />
              <span>Me soutenir</span>
            </button>
          </div>
        </div>
      </header>

      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </>
  );
}

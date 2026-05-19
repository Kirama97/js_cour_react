import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { Moon, Sun } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import SupportModal from '../ui/SupportModal';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { modules, modulesVus } = useCourse();
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-[#16213E] border-b border-slate-200 dark:border-[#F7DF1E]/20 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F7DF1E] rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-[#1A1A2E] font-bold text-lg font-mono">JS</span>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-slate-900 dark:text-white">Cours JavaScript</h1>
              <p className="text-xs text-slate-500 dark:text-gray-400">Série d'exercices progressifs</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Statistiques du cours">
            <div className="text-center">
              <p className="text-[#F7DF1E] font-bold text-xl">{modules.reduce((acc, m) => acc + m.exercices.length, 0)}</p>
              <p className="text-xs text-gray-400">Exercices</p>
            </div>
            <div className="text-center">
              <p className="text-[#F7DF1E] font-bold text-xl">{modules.length}</p>
              <p className="text-xs text-gray-400">Modules</p>
            </div>
            <div className="text-center">
              <p className="text-[#F7DF1E] font-bold text-xl">∞</p>
              <p className="text-xs text-gray-400">Défis</p>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg bg-gray-100 dark:bg-[#0F3460] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#16213E] transition-colors focus-visible:outline-none" 
              aria-label="Changer le thème"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button 
              onClick={() => setIsSupportModalOpen(true)}
              className="support-btn-header hidden md:flex items-center gap-1.5 bg-[#F7DF1E] text-[#1A1A2E] px-4 py-1.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-[0_0_15px_rgba(247,223,30,0.3)] ml-1"
            >
              <img src="wave.png" className='w-6 h-6' alt="Wave" />
              Me soutenir
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

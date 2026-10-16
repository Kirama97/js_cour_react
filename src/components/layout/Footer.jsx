import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import SupportModal from '../ui/SupportModal';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#16213E] transition-colors py-8 sm:py-10 mt-10 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center break-words">
          <p className="text-slate-600 dark:text-gray-300 text-xs">
            Cours & Exercices JavaScript &copy; <a className="underline hover:text-yellow-600 dark:hover:text-[#F7DF1E] font-medium transition-colors" href="https://kira-dev-gamma.vercel.app/" target="_blank" rel="noopener noreferrer">Kira/Dev</a>
          </p>
          <p className="text-xs mt-1.5 text-slate-400 dark:text-gray-400">Contact : Officialthiam97@gmail.com</p>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 sm:bottom-24 right-4 sm:right-6 z-40 flex items-center justify-center w-10 h-10 bg-white dark:bg-[#1A1A2E] text-slate-700 dark:text-white rounded-xl shadow-md border border-slate-200 dark:border-white/10 hover:border-[#F7DF1E] transition-all duration-300 hover:scale-105 active:scale-95 ${showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        aria-label="Retour en haut de la page"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      <button 
        onClick={() => setIsSupportModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center justify-center w-12 h-12 bg-[#F7DF1E] text-[#1A1A2E] rounded-full shadow-[0_0_15px_rgba(247,223,30,0.35)] hover:scale-110 active:scale-95 transition-all group"
        aria-label="Soutenir le projet"
      >
        <img src="wave.png" className="w-6 h-6 object-contain" alt="Wave" />
        <span className="absolute right-full mr-3 bg-[#1A1A2E] text-white border border-[#F7DF1E]/40 text-xs py-1 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          Soutenir via Wave 👋
        </span>
      </button>

      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </>
  );
}

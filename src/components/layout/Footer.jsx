import React, { useState, useEffect } from 'react';
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
      <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#16213E] transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-slate-600 dark:text-gray-600 text-xs mt-2 transition-colors">Bonne chance à tous les étudiants &copy; <a style={{ color: '#F7DF1E' }} href="https://kira-dev-gamma.vercel.app/">Kira/Dev</a> </p>
          <p className="text-xs mt-2 text-neutral-400">Email : Officialthiam97@gmail.com</p>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-[60] flex items-center justify-center w-12 h-12 bg-[#16213E] text-[#F7DF1E] rounded-full shadow-2xl border border-[#F7DF1E]/20 transition-all duration-300 hover:bg-[#F7DF1E] hover:text-[#1A1A2E] hover:-translate-y-1 ${showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        aria-label="Retour en haut de la page"
      >
        <span className="text-xl">↑</span>
      </button>

      <button onClick={() => setIsSupportModalOpen(true)}
        className="fixed bottom-6 right-6 z-[60] flex items-center justify-center w-14 h-14 bg-[#F7DF1E] text-[#1A1A2E] rounded-full shadow-2xl hover:scale-110 transition-transform group"
        aria-label="Soutenir mon travail (200 FCFA)">
        <span className="text-2xl group-hover:rotate-12 transition-transform">
          <img src="wave.png" className='w-10 h-10' alt="" />
        </span>
        <span
          className="absolute right-full mr-3 bg-[#16213E] text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#F7DF1E]/20">
          Soutenez mon travail
        </span>
      </button>

      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </>
  );
}

import React, { useEffect, useState } from 'react';
import SupportModal from './SupportModal';

export default function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('welcome-seen');
    if (!hasSeenWelcome) {
      setIsRendered(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 500);
    }
  }, []);

  const close = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsRendered(false);
      localStorage.setItem('welcome-seen', 'true');
    }, 500);
  };

  if (!isRendered) return null;

  return (
    <>
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 dark:bg-[#1A1A2E]/90 backdrop-blur-sm transition-all duration-500 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`bg-white dark:bg-[#16213E] max-w-md w-full rounded-2xl border border-slate-200 dark:border-[#F7DF1E]/20 p-8 shadow-2xl transform transition-transform duration-500 ${isVisible ? 'scale-100' : 'scale-90'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#F7DF1E] rounded-2xl flex items-center justify-center rotate-3 shadow-[0_0_20px_rgba(247,223,30,0.4)]">
              <span className="text-[#1A1A2E] font-bold text-2xl font-mono">JS</span>
            </div>
            <div className="w-16 h-16 rounded-full border-2 border-[#F7DF1E]/50 overflow-hidden shadow-[0_0_20px_rgba(247,223,30,0.2)] flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              {/* Fallback avatar since the image may not be available immediately */}
              <span className="text-2xl">
                <img src="profil.png" alt="" />
              </span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-4 text-slate-900 dark:text-white transition-colors">Bienvenue ! </h2>
          
          <p className="text-slate-600 dark:text-gray-300 text-center mb-8 leading-relaxed transition-colors">
            Prêt à maîtriser <span className="text-[#F7DF1E] font-semibold">JavaScript</span> ? 
            Bon apprentissage dans cette série d'exercices progressifs.
          </p>

          <div className="bg-slate-50 dark:bg-[#0F3460]/50 rounded-xl p-4 mb-8 border border-slate-200 dark:border-white/5 transition-colors">
            <p className="text-xs text-slate-500 dark:text-gray-400 text-center transition-colors">
              Si ce projet vous est utile, vous pouvez me soutenir en donnant un petit quelque chose.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={close} 
              className="w-full bg-[#F7DF1E] text-[#1A1A2E] font-bold py-3 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg"
            >
              C'est parti !
            </button>
            <button 
               onClick={() => setIsSupportModalOpen(true)}
               className="w-full border border-slate-200 bg-[#24caff] dark:border-[#F7DF1E]/30 dark:text-white font-semibold py-3 rounded-xl hover:bg-[#38e1f5] dark:hover:bg-[#24caff]/80 transition-colors text-center flex items-center justify-center gap-2">
               <img src="wave.png" className='w-10 h-10' alt="" /> Soutenir le projet
            </button>
          </div>
        </div>
      </div>

      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </>
  );
}

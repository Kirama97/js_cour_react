import { useEffect, useState } from 'react';
import SupportModal from './SupportModal';

export default function WelcomeModal() {
  const [isRendered, setIsRendered] = useState(() => {
    try {
      return !localStorage.getItem('welcome-seen');
    } catch (err) {
      void err;
      return false;
    }
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  useEffect(() => {
    if (isRendered) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isRendered]);

  const close = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsRendered(false);
      try {
        localStorage.setItem('welcome-seen', 'true');
      } catch (err) {
        void err;
      }
    }, 300);
  };

  if (!isRendered) return null;

  return (
    <>
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-white dark:bg-[#16213E] max-w-md w-full max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-2xl transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-14 h-14 bg-[#F7DF1E] rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-[#1A1A2E] font-black text-2xl font-mono">JS</span>
            </div>
            <div className="w-14 h-14 rounded-2xl border border-slate-200 dark:border-white/15 overflow-hidden bg-slate-100 dark:bg-[#1A1A2E] flex items-center justify-center shadow-sm">
              <img src="profil.png" alt="Profil" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2 text-slate-900 dark:text-white font-display tracking-tight">
            Bienvenue ! 👋
          </h2>
          
          <p className="text-slate-600 dark:text-gray-300 text-center text-sm mb-6 leading-relaxed">
            Formation pratique à JavaScript. 8 modules structurés avec leçons théoriques, exercices progressifs et éditeur de code interactif en direct.
          </p>

          <div className="bg-yellow-50/60 dark:bg-[#F7DF1E]/10 rounded-xl p-4 mb-6 border border-yellow-200/60 dark:border-[#F7DF1E]/20">
            <p className="text-xs text-yellow-900 dark:text-yellow-200 text-center leading-relaxed">
              Si ce projet vous est utile dans votre apprentissage, vous pouvez soutenir son créateur via Wave.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <button 
              onClick={close} 
              className="w-full bg-[#F7DF1E] hover:bg-yellow-300 text-[#1A1A2E] font-bold py-3 rounded-xl transition-all shadow-sm hover:shadow text-sm active:scale-98"
            >
              Commencer le cours 🚀
            </button>
            <button 
              onClick={() => setIsSupportModalOpen(true)}
              className="w-full border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-gray-200 font-semibold py-2.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-2"
            >
              <img src="wave.png" className="w-4 h-4 object-contain" alt="Wave" />
              Soutenir via Wave
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

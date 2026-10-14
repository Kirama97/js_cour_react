import { useState } from 'react';
import { X, Heart } from 'lucide-react';

export default function SupportModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('500');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#16213E] p-6 sm:p-7 rounded-2xl shadow-2xl max-w-sm w-full border border-slate-200 dark:border-white/10 relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-[#F7DF1E] dark:hover:bg-white/5 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F7DF1E]/15 flex items-center justify-center border border-[#F7DF1E]/30 shadow-xs">
            <img src="wave.png" className="w-6 h-6 object-contain" alt="Wave" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Soutenir le cours
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400">
              Paiement direct Wave (Sénégal)
            </p>
          </div>
        </div>
        
        <p className="text-xs text-slate-600 dark:text-gray-300 mb-5 leading-relaxed">
          Votre soutien permet de maintenir la plateforme gratuite, accessible et d'enrichir le contenu pédagogique.
        </p>

        <div className="flex gap-2 mb-4">
          {['200', '500', '1000', '2000'].map(val => (
            <button
              key={val}
              type="button"
              onClick={() => setAmount(val)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                amount === val
                  ? 'border-[#F7DF1E] bg-[#F7DF1E] text-[#1A1A2E] shadow-xs'
                  : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:border-[#F7DF1E]/50'
              }`}
            >
              {val} F
            </button>
          ))}
        </div>
        
        <div className="mb-5 relative">
          <input 
            type="number" 
            min="100"
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            className="w-full px-4 py-2.5 text-lg rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1A1A2E] text-slate-900 dark:text-white focus:outline-none focus:border-[#F7DF1E] transition-colors font-semibold pr-16"
            placeholder="Montant"
            autoFocus
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400 font-medium text-xs">
            FCFA
          </span>
        </div>
        
        <div className="flex gap-2.5">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-600 dark:text-gray-300 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
          >
            Annuler
          </button>
          <a 
            href={`https://pay.wave.com/m/M_sn_bCfDE26Wd7Xt/c/sn/?amount=${amount || 500}`} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl font-bold text-xs text-[#1A1A2E] bg-[#F7DF1E] hover:bg-yellow-300 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(247,223,30,0.3)] active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            Valider
          </a>
        </div>
      </div>
    </div>
  );
}

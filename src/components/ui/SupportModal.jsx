import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function SupportModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#16213E] p-6 rounded-2xl shadow-xl max-w-sm w-full border border-slate-200 dark:border-[#F7DF1E]/20 relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-[#0F3460] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3 mb-4">
          <img src="wave.png" className="w-10 h-10 drop-shadow-sm" alt="Wave" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Soutenir le projet
          </h2>
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Entrez le montant de votre soutien pour continuer vers la page de paiement sécurisée de Wave.
        </p>
        
        <div className="mb-6 relative">
          <input 
            type="number" 
            min="1"
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            className="w-full px-4 py-3 text-xl rounded-xl border-2 border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#0F3460] text-gray-900 dark:text-white focus:outline-none focus:border-[#F7DF1E] dark:focus:border-[#F7DF1E] transition-colors font-bold pr-20"
            placeholder="Montant"
            autoFocus
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold text-sm">
            FCFA
          </span>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Annuler
          </button>
          <a 
            href={`https://pay.wave.com/m/M_sn_bCfDE26Wd7Xt/c/sn/?amount=${amount}`} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-[#1A1A2E] bg-[#F7DF1E] hover:bg-[#ffe600] transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#F7DF1E]/20"
          >
            Valider
          </a>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { useCourse } from '../../context/CourseContext';
import { Play } from 'lucide-react';

export default function ModuleDetail() {
  const { activeModule, closeModule, toggleExerciseProgress, exercisesProgress } = useCourse();
  const [activeTab, setActiveTab] = useState('lecons');
  const detailRef = useRef(null);

  useEffect(() => {
    if (activeModule && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab('lecons');
    }
  }, [activeModule]);

  if (!activeModule) return null;

  const handleLoadExercise = (exercise) => {
    const codeExo = `// ==========================================
// EXERCICE : ${exercise.titre}
// MODULE   : ${activeModule.titre}
// ==========================================

${exercise.codeInit}`;
    
    localStorage.setItem('playground-code', codeExo);
    // Dispatch an event so Playground can pick it up if needed, or just let Playground handle it via storage event/reload.
    // A better React way is to use context for playground code, but let's stick to local storage + custom event.
    window.dispatchEvent(new Event('playgroundCodeLoaded'));
    document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={detailRef} id="module-detail" className="mb-16" aria-labelledby="detail-title" tabIndex="-1">
      <div className="bg-white dark:bg-[#16213E] rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm transition-colors">
        
        {/* Header */}
        <div className="bg-slate-100 dark:bg-[#0F3460] px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span id="detail-badge" className="bg-[#F7DF1E] text-[#1A1A2E] text-xs font-bold font-mono px-2 py-1 rounded">
              Module {activeModule.id}
            </span>
            <h3 id="detail-title" className="font-bold text-lg text-slate-900 dark:text-white">
              {activeModule.titre}
            </h3>
          </div>
          <button 
            id="btn-close-detail" 
            onClick={closeModule}
            className="text-slate-400 hover:text-slate-600 dark:text-gray-400 dark:hover:text-white text-2xl leading-none focus-visible:outline-none p-1 transition-colors"
            aria-label="Fermer les détails du module"
          >
            &times;
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-white/10" role="tablist">
          <button 
            className={`tab-btn ${activeTab === 'lecons' ? 'active' : ''}`}
            role="tab" 
            onClick={() => setActiveTab('lecons')}
          >
            📖 Leçons
          </button>
          <button 
            className={`tab-btn ${activeTab === 'exercices' ? 'active' : ''}`}
            role="tab" 
            onClick={() => setActiveTab('exercices')}
          >
            ✏️ Exercices
          </button>
          <button 
            className={`tab-btn ${activeTab === 'concepts' ? 'active' : ''}`}
            role="tab" 
            onClick={() => setActiveTab('concepts')}
          >
            💡 Concepts clés
          </button>
        </div>

        {/* Content */}
        {activeTab === 'lecons' && (
          <div className="p-6" role="tabpanel">
            <p className="text-slate-600 dark:text-gray-300 mb-4">{activeModule.description}</p>
            <div className="space-y-3">
              <div className="mb-6">
                <h4 className="text-xs text-slate-500 dark:text-gray-500 uppercase tracking-wider mb-3 transition-colors">Sommaire</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModule.lecons.map((l, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-slate-100 dark:bg-[#0F3460]/50 rounded-lg mb-2 transition-colors">
                      <span className="w-5 h-5 rounded-full bg-[#F7DF1E]/10 text-[#F7DF1E] text-[10px] flex items-center justify-center font-mono flex-shrink-0">{i+1}</span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-gray-300 transition-colors">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-200 dark:border-white/10 pt-6 transition-colors">
                <h4 className="text-xs text-slate-500 dark:text-gray-500 uppercase tracking-wider mb-4 transition-colors">Contenu du cours</h4>
                <div 
                  className="lecon-content text-slate-700 dark:text-gray-300" 
                  dangerouslySetInnerHTML={{ __html: activeModule.contenuLecon || "<p class='italic text-slate-400 dark:text-gray-400'>Le contenu n'est pas encore disponible.</p>" }} 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exercices' && (
          <div className="p-6" role="tabpanel">
            <div className="space-y-3">
              {activeModule.exercices.map((exo, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 bg-slate-50 dark:bg-[#0F3460]/30 rounded-lg border border-slate-200 dark:border-white/5 transition-colors">
                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id={`ex-${activeModule.id}-${i}`}
                      checked={exercisesProgress[`ex-${activeModule.id}-${i}`] || false}
                      onChange={(e) => toggleExerciseProgress(activeModule.id, i, e.target.checked)}
                      className="w-4 h-4 mt-1 accent-[#F7DF1E] cursor-pointer focus-visible:outline-none"
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor={`ex-${activeModule.id}-${i}`} className="text-sm cursor-pointer font-bold text-[#F7DF1E] block mb-2 transition-colors">
                        {exo.titre}
                      </label>
                      <div className="text-xs text-slate-700 dark:text-green-300 bg-slate-100 dark:bg-[#0d1117] p-3 rounded border border-slate-200 dark:border-[#30363d] font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto transition-colors">
                        {exo.enonceFull || "Pas d'énoncé disponible."}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pl-7 mt-1">
                    <button 
                      onClick={() => handleLoadExercise(exo)}
                      className="text-xs bg-[#F7DF1E] text-[#1A1A2E] hover:bg-yellow-300 px-4 py-2 rounded transition-colors flex items-center gap-2 font-semibold shadow-sm focus-visible:outline-none"
                    >
                      <Play className="w-3 h-3" /> Charger l'exercice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'concepts' && (
          <div className="p-6" role="tabpanel">
            <div className="flex flex-wrap gap-2">
              {activeModule.concepts.map((c, i) => (
                <span key={i} className="text-xs font-mono bg-[#F7DF1E]/10 text-[#F7DF1E] border border-[#F7DF1E]/20 px-2 py-1 rounded">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

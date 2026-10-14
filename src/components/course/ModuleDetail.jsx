import { useState, useEffect, useRef } from 'react';
import { useCourse } from '../../context/CourseContext';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Trash2, CheckCircle2, ChevronLeft, ChevronRight, X, Terminal } from 'lucide-react';

function executeExerciseCode(code) {
  const capturedLogs = [];
  const origLog = console.log;
  const origError = console.error;
  const origWarn = console.warn;

  const formatArg = (v) => {
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    if (typeof v === 'symbol' || typeof v === 'function') return v.toString();
    if (v instanceof Error) return v.stack || v.message;
    if (Array.isArray(v)) {
      try {
        return JSON.stringify(v);
      } catch {
        return '[Array]';
      }
    }
    if (typeof v === 'object') {
      try {
        return JSON.stringify(v, null, 2);
      } catch {
        return '[Object]';
      }
    }
    return String(v);
  };

  console.log = (...args) => {
    capturedLogs.push({ type: 'log', msg: args.map(formatArg).join(' ') });
    origLog(...args);
  };
  console.error = (...args) => {
    capturedLogs.push({ type: 'error', msg: args.map(formatArg).join(' ') });
    origError(...args);
  };
  console.warn = (...args) => {
    capturedLogs.push({ type: 'warn', msg: args.map(formatArg).join(' ') });
    origWarn(...args);
  };

  try {
    const runner = new Function(code);
    runner();
  } catch (err) {
    capturedLogs.push({ type: 'error', msg: `❌ ${err?.message || String(err)}` });
  } finally {
    console.log = origLog;
    console.error = origError;
    console.warn = origWarn;
  }

  return capturedLogs;
}

function ExerciseWorkspace({
  activeModule,
  currentExercise,
  selectedExoIndex,
  isExoDone,
  toggleExerciseProgress,
  setSelectedExoIndex,
}) {
  const [code, setCode] = useState(() => {
    try {
      const savedCode = localStorage.getItem(`exo-code-${activeModule.id}-${selectedExoIndex}`);
      return savedCode !== null ? savedCode : currentExercise?.codeInit || '';
    } catch {
      return currentExercise?.codeInit || '';
    }
  });
  const [logs, setLogs] = useState([]);
  const consoleBoxRef = useRef(null);

  useEffect(() => {
    if (consoleBoxRef.current && logs.length > 0) {
      consoleBoxRef.current.scrollTop = consoleBoxRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCodeChange = (newCode) => {
    const val = newCode || '';
    setCode(val);
    try {
      localStorage.setItem(`exo-code-${activeModule.id}-${selectedExoIndex}`, val);
    } catch {
      // ignore
    }
  };

  const handleRun = () => {
    const output = executeExerciseCode(code);
    setLogs(output);
  };

  const handleReset = () => {
    if (window.confirm("Voulez-vous réinitialiser le code de cet exercice ?")) {
      const initial = currentExercise?.codeInit || '';
      setCode(initial);
      setLogs([]);
      try {
        localStorage.setItem(`exo-code-${activeModule.id}-${selectedExoIndex}`, initial);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Volet Gauche : Informations & Consignes de l'exercice (~45%) */}
      <div className="lg:col-span-5 flex flex-col space-y-5">
        <div className="bg-slate-50 dark:bg-[#0F3460]/30 rounded-2xl p-5 border border-slate-200 dark:border-white/10">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-600 dark:text-[#F7DF1E]">
                Exercice {selectedExoIndex + 1} sur {activeModule.exercices.length}
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white font-display mt-0.5">
                {currentExercise?.titre}
              </h4>
            </div>

            {/* Case à cocher de validation */}
            <label className="flex items-center gap-2 cursor-pointer bg-white dark:bg-[#1A1A2E] border border-slate-200 dark:border-[#F7DF1E]/30 px-3 py-1 rounded-xl select-none shadow-xs">
              <input 
                type="checkbox" 
                id={`ex-${activeModule.id}-${selectedExoIndex}`}
                checked={isExoDone}
                onChange={(e) => toggleExerciseProgress(activeModule.id, selectedExoIndex, e.target.checked)}
                className="w-4 h-4 rounded accent-[#F7DF1E] cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {isExoDone ? 'Validé ✓' : 'À valider'}
              </span>
            </label>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap font-sans bg-white dark:bg-[#1A1A2E] p-4 rounded-xl border border-slate-200/80 dark:border-white/10 shadow-xs">
            {currentExercise?.enonceFull || "Pas d'énoncé disponible pour cet exercice."}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
            <button
              onClick={() => setSelectedExoIndex(prev => Math.max(0, prev - 1))}
              disabled={selectedExoIndex === 0}
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-slate-900 dark:hover:text-[#F7DF1E] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Précédent
            </button>
            <span className="text-[11px] font-mono text-slate-400">
              {selectedExoIndex + 1} / {activeModule.exercices.length}
            </span>
            <button
              onClick={() => setSelectedExoIndex(prev => Math.min(activeModule.exercices.length - 1, prev + 1))}
              disabled={selectedExoIndex === activeModule.exercices.length - 1}
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-slate-900 dark:hover:text-[#F7DF1E] transition-colors"
            >
              Suivant <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-[#F7DF1E]/10 rounded-xl border border-yellow-200/80 dark:border-[#F7DF1E]/20 text-xs text-yellow-900 dark:text-yellow-200 leading-relaxed">
          💡 <strong>Conseil :</strong> Modifiez le code dans l'éditeur à droite puis cliquez sur <strong>Exécuter</strong> pour vérifier vos résultats dans la console en direct.
        </div>
      </div>

      {/* Volet Droit : Éditeur Monaco + Console intégrée (~55%) */}
      <div className="lg:col-span-7 bg-[#0d1117] rounded-2xl border border-slate-300 dark:border-white/15 overflow-hidden shadow-md flex flex-col">
        {/* Barre d'outils de l'éditeur */}
        <div className="bg-[#161b22] px-4 py-2.5 flex items-center justify-between border-b border-white/10 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F7DF1E]"></span>
            <span className="text-xs font-mono text-[#F7DF1E] font-medium">exercice.js</span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">(sauvegarde auto)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors flex items-center gap-1"
              title="Réinitialiser le code de départ"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Réinitialiser</span>
            </button>
            <button
              onClick={handleRun}
              className="text-xs bg-[#F7DF1E] hover:bg-yellow-300 text-[#1A1A2E] font-bold px-4 py-1.5 rounded-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-[0_0_10px_rgba(247,223,30,0.3)]"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Exécuter</span>
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="h-[290px] w-full">
          <Editor
            height="100%"
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleCodeChange}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: '"JetBrains Mono", Menlo, monospace',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              padding: { top: 12, bottom: 12 }
            }}
          />
        </div>

        {/* Console intégrée */}
        <div className="border-t border-white/10 bg-[#090d16] flex flex-col font-mono text-xs">
          <div className="bg-[#161b22]/70 px-4 py-1.5 flex items-center justify-between text-slate-400 border-b border-white/5">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
              <Terminal className="w-3 h-3 text-[#F7DF1E]" /> Console
            </span>
            <button 
              onClick={() => setLogs([])}
              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-2.5 h-2.5" /> effacer
            </button>
          </div>
          <div 
            ref={consoleBoxRef}
            className="p-3 text-slate-200 min-h-[90px] max-h-[160px] overflow-y-auto space-y-1"
          >
            {logs.length === 0 ? (
              <span className="text-slate-500 text-xs italic">// Cliquez sur « Exécuter » pour voir la sortie console.log()...</span>
            ) : (
              logs.map((l, i) => (
                <div key={i} className={`whitespace-pre-wrap leading-relaxed ${l.type === 'error' ? 'text-rose-400 font-semibold' : 'text-emerald-400'}`}>
                  <span className="text-[#F7DF1E] select-none mr-2">›</span>{l.msg}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ModuleDetail() {
  const { activeModule, closeModule, toggleExerciseProgress, exercisesProgress } = useCourse();
  const [activeTab, setActiveTab] = useState('exercices'); // Priorité donnée à la pratique
  const [selectedExoIndex, setSelectedExoIndex] = useState(0);
  const detailRef = useRef(null);

  useEffect(() => {
    setSelectedExoIndex(0);
    setActiveTab('exercices');
    if (activeModule && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeModule?.id]);

  if (!activeModule) return null;

  const currentExercise = activeModule.exercices[selectedExoIndex];
  const isExoDone = Boolean(exercisesProgress[`ex-${activeModule.id}-${selectedExoIndex}`]);

  return (
    <section ref={detailRef} id="module-detail" className="mb-16 scroll-mt-20" aria-labelledby="detail-title">
      <div className="bg-white dark:bg-[#16213E] rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg transition-colors">
        
        {/* Header */}
        <div className="bg-slate-50 dark:bg-[#0F3460]/40 px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span id="detail-badge" className="bg-[#F7DF1E] text-[#1A1A2E] text-xs font-extrabold font-mono px-3 py-1 rounded-lg shadow-xs">
              Module {activeModule.id}
            </span>
            <h3 id="detail-title" className="font-bold text-base sm:text-lg text-slate-900 dark:text-white font-display tracking-tight">
              {activeModule.titre}
            </h3>
          </div>
          <button 
            id="btn-close-detail" 
            onClick={closeModule}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-[#F7DF1E] p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Fermer les détails du module"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#16213E] px-6" role="tablist">
          <button 
            className={`tab-btn ${activeTab === 'exercices' ? 'active' : ''}`}
            role="tab" 
            onClick={() => setActiveTab('exercices')}
          >
            Exercices pratiques
          </button>
          <button 
            className={`tab-btn ${activeTab === 'lecons' ? 'active' : ''}`}
            role="tab" 
            onClick={() => setActiveTab('lecons')}
          >
             Leçons & Cours
          </button>
          <button 
            className={`tab-btn ${activeTab === 'concepts' ? 'active' : ''}`}
            role="tab" 
            onClick={() => setActiveTab('concepts')}
          >
             Concepts clés
          </button>
        </div>

        {/* Tab 1 : EXERCICES EN SPLIT SCREEN (Infos à gauche, Éditeur à droite) */}
        {activeTab === 'exercices' && (
          <div className="p-4 sm:p-6" role="tabpanel">
            {/* Stepper horizontal de sélection d'exercices */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
              <span className="text-xs font-semibold text-slate-400 dark:text-gray-400 uppercase tracking-wider mr-1">
                Exercices :
              </span>
              {activeModule.exercices.map((exo, i) => {
                const isDone = Boolean(exercisesProgress[`ex-${activeModule.id}-${i}`]);
                const isSelected = i === selectedExoIndex;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedExoIndex(i)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#F7DF1E] text-[#1A1A2E] font-bold shadow-sm'
                        : isDone
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-100 dark:bg-[#0F3460]/40 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-[#0F3460]'
                    }`}
                  >
                    <span>Ex. {i + 1}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            {/* Workspace d'exercice monté proprement avec clé unique */}
            <ExerciseWorkspace
              key={`${activeModule.id}-${selectedExoIndex}`}
              activeModule={activeModule}
              currentExercise={currentExercise}
              selectedExoIndex={selectedExoIndex}
              isExoDone={isExoDone}
              toggleExerciseProgress={toggleExerciseProgress}
              setSelectedExoIndex={setSelectedExoIndex}
            />
          </div>
        )}

        {/* Tab 2 : LEÇONS */}
        {activeTab === 'lecons' && (
          <div className="p-6" role="tabpanel">
            <p className="text-slate-600 dark:text-gray-300 text-sm mb-6">{activeModule.description}</p>
            
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Sommaire</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModule.lecons.map((l, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-[#0F3460]/40 rounded-xl border border-slate-200 dark:border-white/10">
                    <span className="w-5 h-5 rounded-full bg-[#F7DF1E] text-[#1A1A2E] text-[10px] flex items-center justify-center font-mono font-extrabold flex-shrink-0 shadow-xs">{i+1}</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-white/10 pt-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Contenu du cours</h4>
              <div 
                className="lecon-content text-slate-700 dark:text-slate-300 text-sm" 
                dangerouslySetInnerHTML={{ __html: activeModule.contenuLecon || "<p class='italic text-slate-400'>Le contenu n'est pas encore disponible.</p>" }} 
              />
            </div>
          </div>
        )}

        {/* Tab 3 : CONCEPTS */}
        {activeTab === 'concepts' && (
          <div className="p-6" role="tabpanel">
            <div className="flex flex-wrap gap-2.5">
              {activeModule.concepts.map((c, i) => (
                <span key={i} className="text-xs font-mono bg-[#F7DF1E]/15 text-yellow-800 dark:text-[#F7DF1E] border border-[#F7DF1E]/30 px-3 py-1.5 rounded-xl font-medium">
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

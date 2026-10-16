import { useCourse } from '../../context/CourseContext';
import { Variable, GitBranch, RefreshCw, List, Code2, Box, Layout, Clock, TerminalSquare, CheckCircle2 } from 'lucide-react';

const IconMap = {
  'variable': Variable,
  'git-branch': GitBranch,
  'refresh-cw': RefreshCw,
  'list': List,
  'code-2': Code2,
  'box': Box,
  'layout': Layout,
  'clock': Clock,
};

export default function ProgressBar() {
  const { modules, modulesVus, openModule } = useCourse();
  
  const pct = Math.round((modulesVus.length / modules.length) * 100) || 0;

  return (
    <section className="mb-16" aria-labelledby="progression-title">
      <h2 id="progression-title" className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2.5 text-slate-900 dark:text-white font-display transition-colors tracking-tight">
        <span className="w-1.5 h-6 bg-[#F7DF1E] rounded-full inline-block" aria-hidden="true"></span>
        Ma progression
      </h2>

      <div className="bg-white dark:bg-[#16213E] rounded-2xl border border-slate-200 dark:border-white/10 p-4 sm:p-6 shadow-sm transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-gray-400">Modules explorés</span>
          <span id="progress-text" className="text-xs font-bold text-yellow-600 dark:text-[#F7DF1E] font-mono">{modulesVus.length} / {modules.length} ({pct}%)</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2.5 mb-6 overflow-hidden transition-colors" role="progressbar" aria-label="Progression des modules" aria-valuemin="0" aria-valuemax="100" aria-valuenow={pct}>
          <div id="progress-bar" className="bg-[#F7DF1E] h-2.5 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(247,223,30,0.4)]" style={{ width: `${pct}%` }}></div>
        </div>

        <div id="progress-modules" className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {modules.map(m => {
            const isVu = modulesVus.includes(m.id);
            const Icon = IconMap[m.lucideIcon] || TerminalSquare;
            return (
              <div 
                key={m.id} 
                onClick={() => openModule(m.id)}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => { 
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModule(m.id);
                  }
                }}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer hover:scale-[1.02] hover:border-yellow-400 dark:hover:border-[#F7DF1E]/40 transition-all ${isVu ? 'bg-yellow-50/50 dark:bg-[#F7DF1E]/10 border-yellow-200 dark:border-[#F7DF1E]/30' : 'bg-white dark:bg-[#1A1A2E]/60 border-slate-200 dark:border-white/5'}`}
              >
                <div className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg border ${isVu ? 'bg-[#F7DF1E] text-[#1A1A2E] border-transparent font-bold' : 'bg-slate-100 dark:bg-white/5 text-slate-400 border-slate-200 dark:border-white/10'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold truncate text-slate-900 dark:text-white">{m.titre}</p>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 flex items-center gap-1">
                    {isVu ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 font-medium">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Vu
                      </span>
                    ) : 'Non commencé'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

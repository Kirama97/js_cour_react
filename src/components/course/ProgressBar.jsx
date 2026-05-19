import React from 'react';
import { useCourse } from '../../context/CourseContext';
import { Variable, GitBranch, RefreshCw, List, Code2, Box, Layout, Clock, TerminalSquare } from 'lucide-react';

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
  const { modules, modulesVus } = useCourse();
  
  const pct = Math.round((modulesVus.length / modules.length) * 100) || 0;

  return (
    <section className="mb-16" aria-labelledby="progression-title">
      <h2 id="progression-title" className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white transition-colors">
        <span className="w-1 h-7 bg-[#F7DF1E] rounded-full inline-block" aria-hidden="true"></span>
        Ma progression
      </h2>

      <div className="bg-white dark:bg-[#16213E] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-lg transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-500 dark:text-gray-400 transition-colors">Modules vus</span>
          <span id="progress-text" className="text-sm font-bold text-[#F7DF1E]">{modulesVus.length} / {modules.length}</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-[#0F3460] rounded-full h-3 mb-6 transition-colors" role="progressbar" aria-label="Progression des modules" aria-valuemin="0" aria-valuemax="100" aria-valuenow={pct}>
          <div id="progress-bar" className="progress-fill bg-[#F7DF1E] h-3 rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
        </div>

        <div id="progress-modules" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {modules.map(m => {
            const isVu = modulesVus.includes(m.id);
            const Icon = IconMap[m.lucideIcon] || TerminalSquare;
            return (
              <div key={m.id} className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${isVu ? 'bg-[#F7DF1E]/10 border border-[#F7DF1E]/20 shadow-sm' : 'bg-slate-50 dark:bg-[#0F3460]/30 border border-transparent'}`}>
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white dark:bg-[#16213E] rounded-full shadow-sm border border-slate-100 dark:border-white/5">
                  <Icon className={`w-4 h-4 transition-all ${isVu ? 'text-[#F7DF1E]' : 'text-slate-300 dark:text-gray-600'}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate text-slate-700 dark:text-white transition-colors">{m.titre}</p>
                  <p className={`text-[10px] transition-colors ${isVu ? 'text-[#F7DF1E]/70' : 'text-slate-400 dark:text-gray-600'}`}>
                    {isVu ? '✓ Vu' : 'Non commencé'}
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

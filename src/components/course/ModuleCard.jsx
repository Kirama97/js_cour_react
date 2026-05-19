import React from 'react';
import { useCourse } from '../../context/CourseContext';
import { Variable, GitBranch, RefreshCw, List, Code2, Box, Layout, Clock, TerminalSquare } from 'lucide-react';
import { niveauCouleur } from '../../data/modules';

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

export default function ModuleCard({ module }) {
  const { openModule } = useCourse();
  const Icon = IconMap[module.lucideIcon] || TerminalSquare;

  return (
    <article 
      className="module-card group bg-white dark:bg-[#16213E] rounded-xl border border-slate-200 dark:border-white/10 p-5 cursor-pointer focus-visible:outline-none shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
      tabIndex="0"
      role="button"
      aria-label={`Ouvrir le module ${module.titre}`}
      onClick={() => openModule(module.id)}
      onKeyPress={(e) => { if(e.key === 'Enter') openModule(module.id); }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-[#F7DF1E]/10 dark:bg-[#F7DF1E]/5 rounded-full border border-[#F7DF1E]/20 dark:border-[#F7DF1E]/10 transition-all group-hover:bg-[#F7DF1E] group-hover:text-black group-hover:border-transparent">
          <Icon className="w-5 h-5 transition-transform group-hover:scale-110 duration-300" />
        </div>
        <span className="text-xs font-mono text-slate-400 dark:text-[#F7DF1E]/60 transition-colors">
          Module {module.id}
        </span>
      </div>
      <h3 className="font-bold text-sm mb-2 text-slate-900 dark:text-white transition-colors group-hover:text-[#F7DF1E]">
        {module.titre}
      </h3>
      <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded border ${niveauCouleur[module.niveau] || 'text-gray-400 bg-gray-400/10 border-gray-400/20'} mb-3`}>
        {module.niveau}
      </span>
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-gray-500 transition-colors">
        <span>{module.lecons.length} leçons</span>
        <span>{module.exercices.length} exercices</span>
      </div>
    </article>
  );
}

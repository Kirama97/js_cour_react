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
      className="group bg-white dark:bg-[#16213E] rounded-2xl border border-slate-200 dark:border-white/10 p-5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7DF1E] shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-yellow-400/50 dark:hover:border-[#F7DF1E]/40"
      tabIndex="0"
      role="button"
      aria-label={`Ouvrir le module ${module.titre}`}
      onClick={() => openModule(module.id)}
      onKeyDown={(e) => { 
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModule(module.id);
        }
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-[#F7DF1E]/15 dark:bg-[#F7DF1E]/10 text-yellow-600 dark:text-[#F7DF1E] rounded-xl border border-[#F7DF1E]/30 transition-all duration-200 group-hover:bg-[#F7DF1E] group-hover:text-[#1A1A2E] group-hover:scale-105">
          <Icon className="w-5 h-5 transition-transform" />
        </div>
        <span className="text-xs font-mono font-medium text-slate-400 dark:text-[#F7DF1E]/70">
          Module {module.id}
        </span>
      </div>

      <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white font-display transition-colors group-hover:text-yellow-600 dark:group-hover:text-[#F7DF1E]">
        {module.titre}
      </h3>

      <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${niveauCouleur[module.niveau] || 'text-gray-400 bg-gray-400/10 border-gray-400/20'} mb-3`}>
        {module.niveau}
      </span>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-gray-400 pt-3 border-t border-slate-100 dark:border-white/10">
        <span>{module.lecons.length} leçons</span>
        <span>{module.exercices.length} exercices</span>
      </div>
    </article>
  );
}

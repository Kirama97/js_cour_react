import { useCourse } from '../../context/CourseContext';
import ModuleCard from './ModuleCard';

export default function ModuleGrid() {
  const { modules } = useCourse();

  return (
    <section id="modules" aria-labelledby="modules-title" className="mb-16">
      <h2 id="modules-title" className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2.5 text-slate-900 dark:text-white font-display transition-colors tracking-tight">
        <span className="w-1.5 h-6 bg-[#F7DF1E] rounded-full inline-block" aria-hidden="true"></span>
        Modules du cours
      </h2>

      <div id="modules-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map(m => (
          <ModuleCard key={m.id} module={m} />
        ))}
      </div>
    </section>
  );
}

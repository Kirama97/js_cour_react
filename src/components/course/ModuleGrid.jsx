import React from 'react';
import { useCourse } from '../../context/CourseContext';
import ModuleCard from './ModuleCard';

export default function ModuleGrid() {
  const { modules } = useCourse();

  return (
    <section id="modules" aria-labelledby="modules-title">
      <h2 id="modules-title" className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white transition-colors">
        <span className="w-1 h-7 bg-[#F7DF1E] rounded-full inline-block" aria-hidden="true"></span>
        Modules du cours
      </h2>

      <div id="modules-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
        {modules.map(m => (
          <ModuleCard key={m.id} module={m} />
        ))}
      </div>
    </section>
  );
}

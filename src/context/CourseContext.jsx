import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { modules } from '../data/modules';

const CourseContext = createContext(null);

function loadInitialExercisesProgress() {
  const loadedProgress = {};
  modules.forEach(m => {
    m.exercices.forEach((_, i) => {
      const key = `ex-${m.id}-${i}`;
      try {
        loadedProgress[key] = localStorage.getItem(key) === 'true';
      } catch (err) {
        void err;
        loadedProgress[key] = false;
      }
    });
  });
  return loadedProgress;
}

export function CourseProvider({ children }) {
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [modulesVus, setModulesVus] = useLocalStorage('modules-vus', []);
  const [exercisesProgress, setExercisesProgress] = useState(loadInitialExercisesProgress);

  const marquerModuleVu = (id) => {
    if (!modulesVus.includes(id)) {
      setModulesVus([...modulesVus, id]);
    }
  };

  const toggleExerciseProgress = (moduleId, exerciseIndex, isDone) => {
    const key = `ex-${moduleId}-${exerciseIndex}`;
    try {
      localStorage.setItem(key, String(isDone));
    } catch (err) {
      void err;
    }
    setExercisesProgress(prev => ({ ...prev, [key]: isDone }));
  };

  const openModule = (id) => {
    setActiveModuleId(id);
    marquerModuleVu(id);
  };
  
  const closeModule = () => {
    setActiveModuleId(null);
  };

  const activeModule = modules.find(m => m.id === activeModuleId) || null;

  return (
    <CourseContext.Provider value={{
      modules,
      activeModuleId,
      activeModule,
      openModule,
      closeModule,
      modulesVus,
      exercisesProgress,
      toggleExerciseProgress
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within CourseProvider');
  }
  return context;
}

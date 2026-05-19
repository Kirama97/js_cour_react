import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { modules } from '../data/modules';

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [modulesVus, setModulesVus] = useLocalStorage('modules-vus', []);
  
  // Storage custom fallback for exercises (to avoid using useLocalStorage per exercise)
  const [exercisesProgress, setExercisesProgress] = useState({});

  useEffect(() => {
    // Load all exercises progress from local storage once
    const loadedProgress = {};
    modules.forEach(m => {
      m.exercices.forEach((_, i) => {
        const key = `ex-${m.id}-${i}`;
        loadedProgress[key] = localStorage.getItem(key) === 'true';
      });
    });
    setExercisesProgress(loadedProgress);
  }, []);

  const marquerModuleVu = (id) => {
    if (!modulesVus.includes(id)) {
      setModulesVus([...modulesVus, id]);
    }
  };

  const toggleExerciseProgress = (moduleId, exerciseIndex, isDone) => {
    const key = `ex-${moduleId}-${exerciseIndex}`;
    localStorage.setItem(key, isDone);
    setExercisesProgress(prev => ({ ...prev, [key]: isDone }));
  };

  const openModule = (id) => {
    setActiveModuleId(id);
    marquerModuleVu(id);
  };
  
  const closeModule = () => {
    setActiveModuleId(null);
  };

  const activeModule = modules.find(m => m.id === activeModuleId);

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
  return useContext(CourseContext);
}

"use client";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export const StatsPanel = () => {
  const context = useContext(TaskContext);
  if (!context) return null;
  const {tasks ,getStatistics } = context;
  const stats = getStatistics();

  return (
    <div className="bg-white shadow-md rounded px-6 py-4 mb-4">
      <p>Total de horas: {stats.totalHours}</p>
      <p>Existe prioruidad: {stats.hasHighPriority ? 'Yes' : 'No'}</p>
      <p>Completado: {stats.allCompleted ? 'Yes' : 'No'}</p>
    </div>
  );
};
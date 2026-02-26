"use client";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export const Filters = () => {
  const context = useContext(TaskContext);
  if (!context) return null;
  const { filterTasks } = context;

  return (
    <div className="flex space-x-4 mb-4">
      <button onClick={() => filterTasks('all')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded">All</button>
      <button onClick={() => filterTasks('completed')} className="bg-blue-300 hover:bg-blue-400 text-white px-3 py-1 rounded">Completas</button>
      <button onClick={() => filterTasks('pending')} className="bg-yellow-300 hover:bg-yellow-400 text-white px-3 py-1 rounded">Pendientes</button>
    </div>
  );
};
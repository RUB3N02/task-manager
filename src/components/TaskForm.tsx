"use client";
import { useState, useContext, FormEvent } from "react";
import { TaskContext } from "../context/TaskContext";
import { Task } from "../types/task";

export const TaskForm = () => {
  // 1. Hooks siempre al inicio
  const context = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState(1);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  // 2. Early return después de los Hooks
  if (!context) return null;
  const { addTask } = context;

  // 3. Funciones de los Hooks
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || hours <= 0) return;
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      hours,
      createdAt: new Date(),
    };
    addTask(newTask);
    setTitle("");
    setHours(1);
    setPriority("low");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Titulo</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Horas</label>
        <input type="number" value={hours} onChange={e => setHours(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Prioridad</label>
        <select value={priority} onChange={e => setPriority(e.target.value as "low" | "medium" | "high")}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add Task
      </button>
    </form>
  );
};
"use client";
import { useContext } from "react";
import { Task } from "../types/task";
import { TaskContext } from "../context/TaskContext";

export const TaskItem = ({ task }: { task: Task }) => {
  const context = useContext(TaskContext);
  if (!context) return null;
  const { toggleTask, deleteTask, updateTask } = context;

  
  const handleUpdate = () => {
    const newTitle = prompt("Actualizar título:", task.title);
    if (!newTitle) return; 
    const newHours = prompt("Actualizar horas:", task.hours.toString());
    if (!newHours || isNaN(Number(newHours))) return; 
    const newPriority = prompt("Actualizar prioridad (low, medium, high):", task.priority);
    if (!newPriority) return;

    updateTask({
      ...task,
      title: newTitle,
      hours: Number(newHours),
      priority: newPriority as "low" | "medium" | "high",
    });
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 rounded px-4 py-2 mb-2 shadow-sm">
      <div>
        <h3 className={`font-bold ${task.completed ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-600">
          Hours: {task.hours} | Priority: {task.priority}
        </p>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => toggleTask(task.id)} 
          className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded"
        >
          Completada
        </button>
        <button 
          onClick={() => deleteTask(task.id)} 
          className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
        >
          Borrada
        </button>
        <button 
          onClick={handleUpdate} 
          className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded"
        >
          Actualizar
        </button>
      </div>
    </div>
  );
};
import { Task } from "../types/task";

export const calculateTotalHours = (tasks: Task[]) => {
   tasks.reduce((total, task) => total + task.hours, 0);
};

export const sortByHours =(task:Task[]) => [...task].sort((a,b)=>a.hours- b.hours);

export const filterByPriority = (tasks: Task[], priority: string): Task[] => {
  return tasks.filter(task => task.priority === priority);
};

// .reduce() → total de horas
// .sort() → orden
// .filter() → filtrado por prioridad
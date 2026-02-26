import { Task } from "../types/task";

export const calculateTotalHours = (tasks: Task[]) => {
   tasks.reduce((total, task) => total + task.hours, 0);
};

export const sortByHours =(task:Task[]) => [...task].sort((a,b)=>a.hours- b.hours);

export const filterByPryority = (task: Task[], priority:Task.filter(task => task.priority === priority))

// .reduce() → total de horas
// .sort() → orden
// .filter() → filtrado por prioridad
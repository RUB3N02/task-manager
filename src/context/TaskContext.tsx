
import { Task } from "../types/task";
import { createContext, useEffect, useState } from "react";

interface TaskContesxtProps {
    tasks: Task[];
    addTask(task: Task): void;
    deleteTask(id: number): void;
    updateTask(task: Task): void;
    toggleTask(id: number, completed?: boolean): void; // opcional
    searchTasks(query: string): Task[];
    filterTasks(filter: string): Task[];
    sortTasksByHours(): Task[];
    getStatistics(): {
        totalHours: number;
        allCompleted: boolean;
        hasHighPriority: boolean;
    }
}
export const TaskContext= createContext<TaskContesxtProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
   const [tasks, setTasks] = useState<Task[]>([]);


    //  cargar tareas desde localStorage
  useEffect(() => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    setTimeout(() => {
      setTasks(JSON.parse(saved));
    }, 0);
  }}, []);
    //En React 18+ la actualización de estado dentro de un "useEffect" puede disparar 
    // este warning si se hace sin envolverla en una función. 
    // La forma recomendada es usar un "setTimeout" de 0 ms.

  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks])
    //añado tarea
  const addTask = (task: Task ) => {
    setTasks(prev =>[...prev, task]);
  };
  // eliminar tarea
  const deleteTask = (id: number) => {
  setTasks(prev => prev.filter(task => task.id !== id))};
  //actualizar tarea
  const updateTask = (updatedTask: Task) => {
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      const newTasks = [...tasks];
      newTasks[index] = updatedTask;
      setTasks(newTasks);
    }
  };
  // marcar tarea completada
  const toggleTask = (id: number, completed?: boolean) => {
  setTasks(prev =>
    prev.map(task =>
      task.id === id ? { ...task, completed: completed ?? !task.completed } : task
    ));
    };
  // buscar tareas por texto
  const searchTasks = (query: string) => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
  };
  // filtrar tareas
  const filterTasks = (filter: string) => {
    switch (filter) {
      case "completed":
        return tasks.filter(task => task.completed);
      case "pending":
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };
  //ordenar por horas
  const sortTasksByHours = () => {
    return [...tasks].sort((a, b) => a.hours - b.hours);
  }
  //estadisticas ñañosas
  const calculateTotalHours = (tasks: Task[]): number => {
  return tasks.reduce((sum, task) => sum + task.hours, 0);};

  const getStatistics = ( )=>{
    return{
        totalHours: calculateTotalHours(tasks),
        allCompleted: tasks.every(task => task.completed),
        hasHighPriority: tasks.some(task => task.priority === "high"),
    };
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        toggleTask,
        searchTasks,
        filterTasks,
        sortTasksByHours,
        getStatistics,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
//la idea :
//- addTask → agrega nueva tarea (.map implícito en render)
// - deleteTask → elimina tarea (.filter)
// - updateTask → actualiza tarea (.findIndex + spread)
// - toggleTask → cambia completado (.map)
// - searchTasks → busca texto (.includes)
// - filterTasks → filtra por estado (.filter)
// - sortTasksByHours → ordena (.sort)
// - getStatistics → calcula estadísticas (.reduce, .every, .some)
// - useEffect → persiste en localStorage





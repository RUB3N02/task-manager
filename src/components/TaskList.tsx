"use client";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const context = useContext(TaskContext);
  if (!context) return null;
 

  const { filteredTasks } = context;
  return (
    <ul>
      {filteredTasks.map((task) => ( 
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
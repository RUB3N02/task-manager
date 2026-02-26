"use client";
import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const context = useContext(TaskContext);
  if (!context) return null;

  const { searchTasks } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    searchTasks(value); // ⚡ Actualiza filteredTasks en el contexto
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Buscar..."
      className="shadow border rounded w-full py-2 px-3 mb-4 focus:outline-none focus:shadow-outline"
    />
  );
};
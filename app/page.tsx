import { Filters } from "@/src/components/Filters";
import { SearchBar } from "@/src/components/SearchBar";
import { StatsPanel } from "@/src/components/StatsPanel";
import { TaskForm } from "@/src/components/TaskForm";
import { TaskList } from "@/src/components/TaskList";
import { TaskProvider } from "@/src/context/TaskContext";


export default function Page() {
  return (
    <TaskProvider>
      <main className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-gray-800">
            Task Manager 
          </h1>

          {/* Contenedor principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Formulario y filtros */}
            <div className="lg:col-span-1 space-y-4">
              <TaskForm />
              <SearchBar />
              <Filters />
              <StatsPanel />
            </div>

            {/* Lista de tareas */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Tareas</h2>
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </main>
    </TaskProvider>
  );
}
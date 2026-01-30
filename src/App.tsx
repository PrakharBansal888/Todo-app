import { useState, useEffect, useMemo } from 'react';
import type { Task, FilterType, Priority } from './types';
import { loadTasks, saveTasks } from './storage';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import TaskFilters from './components/TaskFilters';
import TaskStats from './components/TaskStats';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load tasks on mount
  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (tasks.length > 0 || tasks.length === 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
  };

  const updateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask) return;
    
    setTasks(tasks.map(task =>
      task.id === editingTask.id
        ? { ...task, ...taskData, updatedAt: new Date() }
        : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    ));
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Status filter
      if (filter === 'active' && task.completed) return false;
      if (filter === 'completed' && !task.completed) return false;

      // Priority filter
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [tasks, filter, priorityFilter, searchQuery]);

  // Sort tasks: high priority first, then by creation date
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      // Priority order: high > medium > low
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      // If same priority, sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filteredTasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            To-Do List
          </h1>
          <p className="text-gray-600">
            Stay organized and productive with task prioritization and filtering
          </p>
        </header>

        {/* Statistics */}
        <TaskStats tasks={tasks} />

        {/* Task Form */}
        <TaskForm
          onSubmit={editingTask ? updateTask : addTask}
          editingTask={editingTask}
          onCancel={handleCancelEdit}
        />

        {/* Filters */}
        <TaskFilters
          filter={filter}
          onFilterChange={setFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Task List */}
        <div className="space-y-3">
          {sortedTasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
              </h3>
              <p className="text-gray-600">
                {tasks.length === 0
                  ? 'Add your first task to get started!'
                  : 'Try adjusting your filters or search query'}
              </p>
            </div>
          ) : (
            sortedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>Industry-ready To-Do List App • Built with React + TypeScript + Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

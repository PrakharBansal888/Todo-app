import type { Task } from '../types';

interface TaskStatsProps {
  tasks: Task[];
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const highPriority = tasks.filter(t => t.priority === 'high' && !t.completed).length;
  const overdue = tasks.filter(t => 
    !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{total}</div>
          <div className="text-sm text-gray-600 mt-1">Total Tasks</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{completed}</div>
          <div className="text-sm text-gray-600 mt-1">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">{active}</div>
          <div className="text-sm text-gray-600 mt-1">Active</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">{completionRate}%</div>
          <div className="text-sm text-gray-600 mt-1">Completion</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-600">{highPriority}</div>
          <div className="text-sm text-gray-600 mt-1">High Priority</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-pink-600">{overdue}</div>
          <div className="text-sm text-gray-600 mt-1">Overdue</div>
        </div>
      </div>
    </div>
  );
}

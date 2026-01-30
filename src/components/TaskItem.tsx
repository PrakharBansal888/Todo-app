import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200',
};

const isOverdue = (dueDate?: Date, completed?: boolean) => {
  if (!dueDate || completed) return false;
  return new Date(dueDate) < new Date();
};

const formatDate = (date: Date) => {
  const d = new Date(date);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return `${days[d.getDay()]}, ${d.toLocaleDateString()}`;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  return (
    <div className={`bg-white rounded-lg border-2 p-4 shadow-sm hover:shadow-md transition-shadow ${
      task.completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`text-lg font-semibold ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
              priorityColors[task.priority]
            }`}>
              {task.priority.toUpperCase()}
            </span>
          </div>
          {task.description && (
            <p className={`text-sm mb-2 ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
            {task.dueDate && (
              <span className={`font-medium ${
                isOverdue(task.dueDate, task.completed) 
                  ? 'text-red-600' 
                  : 'text-blue-600'
              }`}>
                Due: {formatDate(task.dueDate)}
                {isOverdue(task.dueDate, task.completed) && ' ⚠️'}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

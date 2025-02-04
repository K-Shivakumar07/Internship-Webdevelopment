import React from 'react';
import { Check, Trash2, Circle, Calendar } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const categoryColors = {
    work: 'bg-blue-100 text-blue-800',
    personal: 'bg-purple-100 text-purple-800',
    professional: 'bg-indigo-100 text-indigo-800',
    health: 'bg-green-100 text-green-800',
    shopping: 'bg-yellow-100 text-yellow-800',
    education: 'bg-pink-100 text-pink-800'
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <div className={`flex items-center p-4 bg-white rounded-lg shadow-sm border-l-4 
      ${todo.completed ? 'border-gray-300 opacity-75' : 'border-blue-500'}
      hover:shadow-md transition-shadow`}>
      <button
        onClick={() => onToggle(todo.id)}
        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
      >
        {todo.completed ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400" />
        )}
      </button>
      
      <div className="flex-1 ml-3">
        <p className={`text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.text}
        </p>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-xs text-gray-500">
            Created: {formatDate(todo.createdAt)}
          </span>
          {todo.dueDate && (
            <span className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              Due: {formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${categoryColors[todo.category]}`}>
        {todo.category}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="p-1.5 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
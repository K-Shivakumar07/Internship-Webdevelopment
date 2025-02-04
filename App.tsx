import React, { useState } from 'react';
import { PlusCircle, ListTodo, Calendar, Clock, CheckCircle2, Activity, ListFilter } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState<'work' | 'personal' | 'professional' | 'health' | 'shopping' | 'education'>('personal');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false,
      category,
      createdAt: new Date(),
      dueDate: dueDate ? new Date(dueDate + (dueTime ? 'T' + dueTime : '')) : null
    };

    setTodos([todo, ...todos]);
    setNewTodo('');
    setDueDate('');
    setDueTime('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTasks = todos.filter(t => !t.completed).length;
  const completedTasks = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <ListTodo className="w-10 h-10 text-blue-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">TO-DO-LIST</h1>
          </div>
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
              <Activity className="w-4 h-4 text-blue-500 mr-2" />
              <span>Active Tasks: <span className="font-semibold">{activeTasks}</span></span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
              <span>Completed: <span className="font-semibold">{completedTasks}</span></span>
            </div>
          </div>
        </div>

        <form onSubmit={addTodo} className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Todo['category'])}
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="professional">Professional</option>
                <option value="health">Health</option>
                <option value="shopping">Shopping</option>
                <option value="education">Education</option>
              </select>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center flex-1">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center flex-1">
              <Clock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </form>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <ListFilter className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Filter Tasks:</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${filter === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${filter === 'active' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${filter === 'completed' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No tasks found</p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
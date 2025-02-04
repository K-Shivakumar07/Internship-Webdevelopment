export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: 'work' | 'personal' | 'professional' | 'health' | 'shopping' | 'education';
  createdAt: Date;
  dueDate: Date | null;
}

export type TaskStatus = 'todo' | 'inprogress' | 'review' | 'completed' | 'blocked';

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags: string[];
  assignee?: string;
  comments: Comment[];
}

export interface TaskStat {
  status: TaskStatus;
  count: number;
  percentage: number;
}

export type UserRole = 'super_user' | 'admin' | 'manager' | 'executive' | 'user';

export interface UserGroup {
  id: string;
  name: string;
  description: string;
  members: User[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  groups: string[];
  createdAt: string;
  active: boolean;
}

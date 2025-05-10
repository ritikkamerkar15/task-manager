
import { Task, TaskStat, TaskStatus } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

const mockTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Redesign the landing page',
    description: 'Update the landing page with new branding guidelines and improve the user journey.',
    status: 'inprogress',
    priority: 'high',
    dueDate: '2025-05-15',
    tags: ['design', 'website', 'branding'],
    assignee: 'Sarah Johnson',
    comments: [
      {
        id: uuidv4(),
        text: 'I\'ve started working on the wireframes, will share them by tomorrow.',
        author: 'Sarah Johnson',
        createdAt: '2025-05-08T14:22:00Z'
      },
      {
        id: uuidv4(),
        text: 'Great progress so far! Let me know if you need any design assets.',
        author: 'Mike Chen',
        createdAt: '2025-05-09T09:15:00Z'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Fix navigation menu bug',
    description: 'The dropdown menu is not working correctly on mobile devices.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-05-10',
    tags: ['bug', 'frontend', 'mobile'],
    assignee: 'Mike Chen',
    comments: []
  },
  {
    id: uuidv4(),
    title: 'Implement authentication system',
    description: 'Add user login, registration, and password reset functionality.',
    status: 'review',
    priority: 'high',
    dueDate: '2025-05-05',
    tags: ['security', 'backend', 'user'],
    assignee: 'Alex Rodriguez',
    comments: [
      {
        id: uuidv4(),
        text: 'The basic authentication flow is complete. Waiting for security review.',
        author: 'Alex Rodriguez',
        createdAt: '2025-05-04T16:30:00Z'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Optimize database queries',
    description: 'Improve the performance of the main dashboard queries.',
    status: 'completed',
    priority: 'medium',
    dueDate: '2025-04-30',
    tags: ['performance', 'database', 'optimization'],
    assignee: 'Jamie Taylor',
    comments: [
      {
        id: uuidv4(),
        text: 'I\'ve added indexes to the most frequently accessed columns.',
        author: 'Jamie Taylor',
        createdAt: '2025-04-28T10:45:00Z'
      },
      {
        id: uuidv4(),
        text: 'The dashboard loads 40% faster now. Great job!',
        author: 'Pat Smith',
        createdAt: '2025-04-30T11:20:00Z'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Write API documentation',
    description: 'Create comprehensive documentation for the new API endpoints.',
    status: 'blocked',
    priority: 'low',
    dueDate: '2025-05-20',
    tags: ['documentation', 'api'],
    assignee: 'Pat Smith',
    comments: [
      {
        id: uuidv4(),
        text: 'Blocked until the API spec is finalized.',
        author: 'Pat Smith',
        createdAt: '2025-05-05T09:10:00Z'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Integrate payment gateway',
    description: 'Connect and test the new payment processing system.',
    status: 'todo',
    priority: 'high',
    dueDate: '2025-05-25',
    tags: ['payments', 'integration', 'testing'],
    assignee: 'Robin Lee',
    comments: []
  }
];

const getTaskStats = (): TaskStat[] => {
  const statusCounts: Record<TaskStatus, number> = {
    todo: 0,
    inprogress: 0,
    review: 0,
    completed: 0,
    blocked: 0
  };
  
  // Count tasks by status
  mockTasks.forEach(task => {
    statusCounts[task.status]++;
  });
  
  const totalTasks = mockTasks.length;
  
  // Convert counts to stats with percentages
  return Object.entries(statusCounts).map(([status, count]) => ({
    status: status as TaskStatus,
    count,
    percentage: totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0
  }));
};

const getTasksByStatus = (status: TaskStatus | 'all'): Task[] => {
  if (status === 'all') {
    return mockTasks;
  }
  return mockTasks.filter(task => task.status === status);
};

export { mockTasks, getTaskStats, getTasksByStatus };

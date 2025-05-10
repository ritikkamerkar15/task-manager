
import { Task } from '@/lib/types';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import React from 'react';

export const getPriorityInfo = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return { 
        color: 'text-red-600',
        bgColor: 'bg-red-100', 
        icon: <ArrowUp className="w-4 h-4" />
      };
    case 'medium':
      return { 
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100', 
        icon: <ArrowUpDown className="w-4 h-4" />
      };
    case 'low':
      return { 
        color: 'text-green-600',
        bgColor: 'bg-green-100', 
        icon: <ArrowDown className="w-4 h-4" />
      };
    default:
      return { 
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        icon: null 
      };
  }
};

export const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'todo':
      return 'bg-status-todo text-gray-700';
    case 'inprogress':
      return 'bg-status-inprogress text-gray-700';
    case 'review':
      return 'bg-status-review text-white';
    case 'completed':
      return 'bg-status-completed text-white';
    case 'blocked':
      return 'bg-status-blocked text-white';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};

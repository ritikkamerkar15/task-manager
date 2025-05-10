
import React from 'react';
import { Task } from '@/lib/types';
import { User, Calendar } from 'lucide-react';

interface TaskMetadataProps {
  task: Task;
}

const TaskMetadata: React.FC<TaskMetadataProps> = ({ task }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  
  return (
    <div className="flex flex-col gap-2">
      {task.assignee && (
        <div className="flex items-center">
          <User className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-sm">Assigned to: <strong>{task.assignee}</strong></span>
        </div>
      )}
      
      {task.dueDate && (
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
          <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
            {isOverdue && ' (Overdue)'}
          </span>
        </div>
      )}
      
      {task.tags.length > 0 && (
        <div className="border-t pt-4 mt-2">
          <h3 className="font-medium mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {task.tags.map(tag => (
              <span key={tag} className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskMetadata;

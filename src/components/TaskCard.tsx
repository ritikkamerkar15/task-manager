import React, { useState } from 'react';
import { Task } from '../lib/types';
import { Clock, AlertTriangle } from 'lucide-react';
import TaskDetailDialog from './TaskDetailDialog';
import { motion } from 'framer-motion';
import { getPriorityInfo, getStatusColor } from '../lib/task-utils';

type TaskCardProps = {
  task: Task;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
};

const StatusLabel: React.FC<{ status: Task['status'] }> = ({ status }) => {
  const statusColor = getStatusColor(status);
  
  const getStatusInfo = () => {
    switch (status) {
      case 'todo':
        return { label: 'To Do', icon: '📋' };
      case 'inprogress':
        return { label: 'In Progress', icon: '⚙️' };
      case 'review':
        return { label: 'Review', icon: '👀' };
      case 'completed':
        return { label: 'Completed', icon: '✅' };
      case 'blocked':
        return { label: 'Blocked', icon: '⛔' };
      default:
        return { label: status, icon: '❓' };
    }
  };

  const { label, icon } = getStatusInfo();

  return (
    <span className={`status-pill ${statusColor} flex items-center gap-1`}>
      <span className="text-xs">{icon}</span>
      <span>{label}</span>
    </span>
  );
};

const PriorityBadge: React.FC<{ priority: Task['priority'] }> = ({ priority }) => {
  const { icon, color, bgColor } = getPriorityInfo(priority);
  const label = priority.charAt(0).toUpperCase() + priority.slice(1);

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${bgColor} ${color}`}>
      {icon}
      <span className="ml-1">{label}</span>
    </span>
  );
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onEditTask, onDeleteTask }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  
  return (
    <>
      <motion.div 
        className="task-card cursor-pointer hover:border-primary-purple transition-all duration-200 hover:shadow-md hover:-translate-y-1" 
        onClick={() => setShowDetails(true)}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
          <StatusLabel status={task.status} />
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10">{task.description}</p>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <PriorityBadge priority={task.priority} />
            
            {task.dueDate && (
              <span className={`flex items-center ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                <Clock className="w-3 h-3 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
          
          {task.assignee && (
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-primary-purple text-white flex items-center justify-center text-xs shadow-sm">
                {task.assignee.split(' ').map(name => name[0]).join('')}
              </div>
            </div>
          )}
        </div>
        
        {task.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {task.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs hover:bg-primary-purple hover:text-white transition-colors duration-200">
                {tag}
              </span>
            ))}
            {task.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">
                +{task.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </motion.div>

      <TaskDetailDialog 
        open={showDetails} 
        onOpenChange={setShowDetails} 
        task={task}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
      />
    </>
  );
};

export default TaskCard;


import React, { useState } from 'react';
import { Task, TaskStatus } from '../lib/types';
import TaskCard from './TaskCard';
import { 
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Search, ListFilter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

type TaskListProps = {
  tasks: Task[];
  onCreateTask: () => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
};

const statusOptions = [
  { value: 'all', label: 'All Tasks' },
  { value: 'todo', label: 'To Do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'completed', label: 'Completed' },
  { value: 'blocked', label: 'Blocked' },
];

const TaskList: React.FC<TaskListProps> = ({ tasks, onCreateTask, onEditTask, onDeleteTask }) => {
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTasks = tasks
    .filter(task => statusFilter === 'all' || task.status === statusFilter)
    .filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
        <Button 
          onClick={onCreateTask}
          className="bg-primary-purple hover:bg-secondary-purple transition-all flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Create Task</span>
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="relative flex-grow max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 w-full border-gray-200 focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ListFilter className="text-gray-500 h-4 w-4" />
          <Select 
            onValueChange={value => setStatusFilter(value as 'all' | TaskStatus)} 
            defaultValue={statusFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px] border-gray-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TaskCard 
                task={task} 
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-100 p-5 rounded-full mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2 text-gray-800">No tasks found</h3>
          <p className="text-gray-500 mb-6 max-w-md">
            {searchQuery ? 'Try a different search term or filter' : 'Create your first task to get started'}
          </p>
          <Button 
            onClick={onCreateTask}
            variant="outline"
            className="border-primary-purple text-primary-purple hover:bg-primary-purple hover:text-white transition-all"
          >
            <Plus size={16} className="mr-1" />
            Create a new task
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;

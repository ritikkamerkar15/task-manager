
import React, { useState } from 'react';
import { Task, Comment } from '@/lib/types';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import EditTaskDialog from './EditTaskDialog';
import { useToast } from '@/hooks/use-toast';
import { getPriorityInfo, getStatusColor } from '@/lib/task-utils';
import TaskPrioritySelector from './TaskPrioritySelector';
import TaskCommentSection from './TaskCommentSection';
import TaskMetadata from './TaskMetadata';

interface TaskDetailDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
}

const TaskDetailDialog: React.FC<TaskDetailDialogProps> = ({ 
  task, 
  open, 
  onOpenChange, 
  onEditTask,
  onDeleteTask
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const { color: priorityColor, bgColor: priorityBgColor, icon: priorityIcon } = getPriorityInfo(task.priority);
  const statusColor = getStatusColor(task.status);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    if (onDeleteTask) {
      onDeleteTask(task.id);
      onOpenChange(false);
    }
  };

  const handleUpdateTask = (updatedTask: Task) => {
    if (onEditTask) {
      onEditTask(updatedTask);
    }
  };

  const handlePriorityChange = (priority: 'low' | 'medium' | 'high') => {
    if (onEditTask) {
      const updatedTask = {
        ...task,
        priority
      };
      onEditTask(updatedTask);
      toast({
        title: "Priority updated",
        description: `Task priority changed to ${priority}`,
      });
    }
  };

  const handleAddComment = (comment: Comment) => {
    if (onEditTask) {
      const updatedTask = {
        ...task,
        comments: [...task.comments, comment]
      };
      onEditTask(updatedTask);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{task.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="flex justify-between">
              <span className={`status-pill ${statusColor}`}>
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
              
              <span className={`flex items-center gap-1 ${priorityColor} text-sm font-medium px-2 py-1 rounded-full ${priorityBgColor}`}>
                {priorityIcon}
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
            </div>
            
            {onEditTask && <TaskPrioritySelector task={task} onPriorityChange={handlePriorityChange} />}
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>
            
            <TaskMetadata task={task} />
            
            <TaskCommentSection task={task} onAddComment={handleAddComment} />
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            {onDeleteTask && (
              <Button 
                variant="destructive" 
                onClick={handleDeleteClick}
                className="flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            )}
            {onEditTask && (
              <Button 
                variant="outline" 
                onClick={handleEditClick}
                className="flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            )}
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {onEditTask && (
        <EditTaskDialog
          task={task}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </>
  );
};

export default TaskDetailDialog;

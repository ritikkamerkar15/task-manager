
import React, { useState } from 'react';
import { Task, Comment } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface TaskCommentSectionProps {
  task: Task;
  onAddComment: (comment: Comment) => void;
}

const TaskCommentSection: React.FC<TaskCommentSectionProps> = ({ task, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState('Current User'); // In a real app, this would come from auth
  const { toast } = useToast();

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: crypto.randomUUID(),
      text: newComment.trim(),
      author: currentUser,
      createdAt: new Date().toISOString()
    };

    onAddComment(comment);
    setNewComment('');
    toast({
      title: "Comment added",
      description: "Your comment has been added to the task.",
    });
  };

  const formatCommentDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="border-t pt-4">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-gray-500" />
        <h3 className="font-medium">Comments {task.comments.length > 0 && `(${task.comments.length})`}</h3>
      </div>
      
      {task.comments.length === 0 ? (
        <p className="text-gray-500 text-sm italic">No comments yet.</p>
      ) : (
        <div className="space-y-3">
          {task.comments.map(comment => (
            <div key={comment.id} className="bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-sm">{comment.author}</span>
                <span className="text-gray-500 text-xs">{formatCommentDate(comment.createdAt)}</span>
              </div>
              <p className="text-sm">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4">
        <Textarea 
          placeholder="Add a comment..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-2 min-h-[60px]"
        />
        <Button 
          onClick={handleAddComment} 
          disabled={!newComment.trim()}
          size="sm" 
          className="bg-primary-purple hover:bg-secondary-purple"
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
};

export default TaskCommentSection;

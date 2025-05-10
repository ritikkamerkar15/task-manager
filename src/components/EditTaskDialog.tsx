
import React from 'react';
import { 
  Dialog,
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task, TaskStatus } from '@/lib/types';
import { CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface EditTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTask: (task: Task) => void;
}

const statuses: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'completed', label: 'Completed' },
  { value: 'blocked', label: 'Blocked' },
];

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  task,
  open,
  onOpenChange,
  onUpdateTask,
}) => {
  const [title, setTitle] = React.useState(task.title);
  const [description, setDescription] = React.useState(task.description);
  const [status, setStatus] = React.useState<TaskStatus>(task.status);
  const [priority, setPriority] = React.useState<'low' | 'medium' | 'high'>(task.priority);
  const [date, setDate] = React.useState<Date | undefined>(
    task.dueDate ? new Date(task.dueDate) : undefined
  );
  const [tags, setTags] = React.useState(task.tags.join(', '));
  const [assignee, setAssignee] = React.useState(task.assignee || '');
  const { toast } = useToast();

  // Update local state when task prop changes
  React.useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority);
    setDate(task.dueDate ? new Date(task.dueDate) : undefined);
    setTags(task.tags.join(', '));
    setAssignee(task.assignee || '');
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedTask: Task = {
      ...task,
      title,
      description,
      status,
      priority,
      dueDate: date ? format(date, 'yyyy-MM-dd') : undefined,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      assignee: assignee || undefined,
      // Preserve existing comments
      comments: task.comments || [],
    };
    
    onUpdateTask(updatedTask);
    toast({
      title: "Task updated",
      description: `"${title}" has been updated successfully.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update the task details and save your changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="Enter task title"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="Enter task description"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select
                value={status}
                onValueChange={(value: TaskStatus) => setStatus(value)}
              >
                <SelectTrigger id="edit-status" className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((statusOption) => (
                    <SelectItem key={statusOption.value} value={statusOption.value}>
                      {statusOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-priority" className="text-right">
                Priority
              </Label>
              <Select
                value={priority}
                onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}
              >
                <SelectTrigger id="edit-priority" className="col-span-3">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priorityOption) => (
                    <SelectItem key={priorityOption.value} value={priorityOption.value}>
                      {priorityOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-date" className="text-right">
                Due Date
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>No due date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-assignee" className="text-right">
                Assignee
              </Label>
              <Input
                id="edit-assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="col-span-3"
                placeholder="Enter assignee name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-tags" className="text-right">
                Tags
              </Label>
              <Input
                id="edit-tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="col-span-3"
                placeholder="Enter tags separated by commas"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary-purple hover:bg-secondary-purple">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;

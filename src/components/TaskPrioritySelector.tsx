
import React from 'react';
import { Task } from '@/lib/types';
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

interface TaskPrioritySelectorProps {
  task: Task;
  onPriorityChange: (priority: 'low' | 'medium' | 'high') => void;
}

const TaskPrioritySelector: React.FC<TaskPrioritySelectorProps> = ({ task, onPriorityChange }) => {
  const form = useForm({
    defaultValues: {
      priority: task.priority
    }
  });

  // Update form values when task changes
  React.useEffect(() => {
    form.reset({
      priority: task.priority
    });
  }, [task, form]);

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <div className="font-medium text-sm mb-1">Change Priority</div>
            <FormControl>
              <RadioGroup 
                onValueChange={(value: 'low' | 'medium' | 'high') => {
                  field.onChange(value);
                  onPriorityChange(value);
                }}
                defaultValue={field.value}
                className="flex space-x-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="text-green-600 flex items-center gap-1">
                    <ArrowDown className="h-3 w-3" />
                    Low
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="text-yellow-600 flex items-center gap-1">
                    <ArrowUpDown className="h-3 w-3" />
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="text-red-600 flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />
                    High
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
};

export default TaskPrioritySelector;

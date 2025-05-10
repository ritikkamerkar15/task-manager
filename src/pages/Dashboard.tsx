
import React, { useState } from 'react';
import { mockTasks, getTaskStats, getTasksByStatus } from '@/lib/data';
import { Task, TaskStatus } from '@/lib/types';
import DashboardStats from '@/components/DashboardStats';
import TaskList from '@/components/TaskList';
import CreateTaskDialog from '@/components/CreateTaskDialog';
import { useToast } from '@/components/ui/use-toast';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const stats = getTaskStats();
  const { toast } = useToast();

  const handleCreateTask = (taskData: Task) => {
    // Add the new task to the existing tasks
    setTasks((prevTasks) => [taskData, ...prevTasks]);
    setOpenCreateDialog(false);
    
    toast({
      title: "Task created",
      description: `"${taskData.title}" has been added successfully.`,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Task Overview</h2>
          <DashboardStats stats={stats} />
        </section>
        
        <section className="mt-10">
          <TaskList 
            tasks={tasks} 
            onCreateTask={() => setOpenCreateDialog(true)} 
          />
        </section>
      </div>
      
      <CreateTaskDialog
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default Dashboard;

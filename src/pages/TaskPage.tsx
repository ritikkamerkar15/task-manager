
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTasksByStatus, getTaskStats } from '@/lib/data';
import { Task, TaskStatus } from '@/lib/types';
import TaskList from '@/components/TaskList';
import CreateTaskDialog from '@/components/CreateTaskDialog';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { History } from 'lucide-react';

const routeToStatusMap: Record<string, TaskStatus | 'all'> = {
  '/todo': 'todo',
  '/inprogress': 'inprogress',
  '/completed': 'completed',
  '/blocked': 'blocked',
  '/': 'all',
};

const routeToTitleMap: Record<string, string> = {
  '/todo': 'To Do Tasks',
  '/inprogress': 'In Progress Tasks',
  '/completed': 'Completed Tasks',
  '/blocked': 'Blocked Tasks',
  '/inbox': 'Inbox',
  '/calendar': 'Calendar',
  '/settings': 'Settings',
  '/': 'Dashboard',
};

const TaskPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  // Local state to manage tasks
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [initialized, setInitialized] = useState(false);
  
  const currentPath = location.pathname;
  const status = routeToStatusMap[currentPath] || 'all';
  const pageTitle = routeToTitleMap[currentPath] || 'Tasks';
  
  // Get tasks filtered by status
  const backendTasks = getTasksByStatus(status);
  
  // Initialize local tasks on first render
  React.useEffect(() => {
    if (!initialized && backendTasks.length > 0) {
      setLocalTasks(backendTasks);
      setInitialized(true);
    }
  }, [backendTasks, initialized]);
  
  // Get task stats for history visualization
  const taskStats = getTaskStats();

  const handleCreateTask = (taskData: any) => {
    const newTask: Task = {
      ...taskData,
      id: taskData.id || crypto.randomUUID(),
    };
    
    // In a real app, this would be an API call
    setLocalTasks(prevTasks => [...prevTasks, newTask]);
    
    toast({
      title: "Task created",
      description: `"${taskData.title}" has been added successfully.`,
    });
    setOpenCreateDialog(false);
  };
  
  const handleEditTask = (updatedTask: Task) => {
    // In a real app, this would be an API call
    setLocalTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    
    toast({
      title: "Task updated",
      description: `"${updatedTask.title}" has been updated successfully.`,
    });
  };
  
  const handleDeleteTask = (taskId: string) => {
    // In a real app, this would be an API call
    setLocalTasks(prevTasks => 
      prevTasks.filter(task => task.id !== taskId)
    );
    
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
      variant: "destructive",
    });
  };

  // Navigate to the corresponding status page when clicking on a stat card
  const handleStatCardClick = (statStatus: string) => {
    // Only navigate for clickable statuses (todo and inprogress)
    if (statStatus === 'todo' || statStatus === 'inprogress') {
      navigate(`/${statStatus}`);
    }
  };

  // Chart configuration for the history view
  const chartConfig = {
    todo: { label: 'To Do', color: '#FBBF24' },
    inprogress: { label: 'In Progress', color: '#3B82F6' },
    review: { label: 'Review', color: '#8B5CF6' },
    completed: { label: 'Completed', color: '#10B981' },
    blocked: { label: 'Blocked', color: '#EF4444' },
  };
  
  // Use local tasks if initialized, otherwise use backend tasks
  const displayTasks = initialized ? localTasks.filter(task => status === 'all' || task.status === status) : backendTasks;
  
  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{pageTitle}</h1>
      
      {status === 'all' ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">Dashboard content would go here</div>
      ) : (
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'current' | 'history')}>
          <TabsList className="mb-6">
            <TabsTrigger value="current">Current Tasks</TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>Task History</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <TaskList 
              tasks={displayTasks} 
              onCreateTask={() => setOpenCreateDialog(true)} 
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </TabsContent>
          <TabsContent value="history">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Task History Overview</h2>
              <p className="text-gray-600 mb-6">
                This chart shows the distribution of tasks by status over time.
              </p>
              
              <div className="h-80 w-full">
                <ChartContainer 
                  className="w-full" 
                  config={chartConfig}
                >
                  <BarChart data={taskStats}>
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Bar dataKey="count" fill="var(--color-todo)" radius={[4, 4, 0, 0]} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent 
                          labelFormatter={(value) => 
                            typeof value === 'string' 
                              ? chartConfig[value as keyof typeof chartConfig]?.label || value
                              : value
                          }
                        />
                      }
                    />
                  </BarChart>
                </ChartContainer>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Task Completion Rates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {taskStats.map((stat) => (
                    <div 
                      key={stat.status} 
                      className={`p-4 rounded-lg border border-gray-200 shadow-sm ${
                        (stat.status === 'todo' || stat.status === 'inprogress') 
                          ? 'cursor-pointer hover:border-primary hover:shadow-md transition-all duration-200' 
                          : ''
                      }`}
                      onClick={() => handleStatCardClick(stat.status)}
                      role={stat.status === 'todo' || stat.status === 'inprogress' ? 'button' : undefined}
                      aria-label={stat.status === 'todo' || stat.status === 'inprogress' ? `View ${chartConfig[stat.status]?.label || stat.status} tasks` : undefined}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">
                          {chartConfig[stat.status]?.label || stat.status}
                        </span>
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${chartConfig[stat.status]?.color}20`,
                            color: chartConfig[stat.status]?.color 
                          }}
                        >
                          {stat.percentage}%
                        </span>
                      </div>
                      <div className="text-2xl font-bold">{stat.count}</div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{ 
                            width: `${stat.percentage}%`,
                            backgroundColor: chartConfig[stat.status]?.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
      
      <CreateTaskDialog
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
        onCreateTask={handleCreateTask}
      />
    </motion.div>
  );
};

export default TaskPage;

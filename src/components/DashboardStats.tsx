
import React from 'react';
import { TaskStat } from '@/lib/types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowUp,
  ListTodo, 
  Clock, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

interface DashboardStatsProps {
  stats: TaskStat[];
}

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  percentage: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon, color, percentage }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div className="space-y-1">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardDescription className="text-xs">{percentage}% of tasks</CardDescription>
      </div>
      <div className={`p-2 rounded-full ${color}`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{count}</div>
      <Progress 
        className="h-2 mt-2" 
        value={percentage} 
      />
    </CardContent>
  </Card>
);

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const totalTasks = stats.reduce((acc, stat) => acc + stat.count, 0);
  
  const statCardConfig = {
    todo: {
      title: "To Do",
      icon: <ListTodo className="h-4 w-4 text-white" />,
      color: "bg-gray-500",
    },
    inprogress: {
      title: "In Progress",
      icon: <Clock className="h-4 w-4 text-white" />,
      color: "bg-status-inprogress",
    },
    review: {
      title: "In Review",
      icon: <ArrowUp className="h-4 w-4 text-white" />,
      color: "bg-status-review",
    },
    completed: {
      title: "Completed",
      icon: <CheckCircle className="h-4 w-4 text-white" />,
      color: "bg-status-completed",
    },
    blocked: {
      title: "Blocked",
      icon: <AlertCircle className="h-4 w-4 text-white" />,
      color: "bg-status-blocked",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.status}
          title={statCardConfig[stat.status].title}
          count={stat.count}
          percentage={stat.percentage}
          icon={statCardConfig[stat.status].icon}
          color={statCardConfig[stat.status].color}
        />
      ))}
    </div>
  );
};

export default DashboardStats;

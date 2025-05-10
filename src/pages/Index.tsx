
import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger 
} from '@/components/ui';
import AppSidebar from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';
import TaskPage from '@/pages/TaskPage';

const Index: React.FC = () => {
  const location = useLocation();
  const isRootPath = location.pathname === '/';
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full h-screen overflow-hidden">
        <AppSidebar />
        
        <SidebarInset>
          <div className="p-4 h-full">
            <div className="flex items-center mb-4">
              <SidebarTrigger className="mr-2" />
              <h1 className="text-xl font-bold">
                {isRootPath ? 'Dashboard' : ''}
              </h1>
            </div>
            
            {isRootPath ? (
              <Dashboard />
            ) : (
              <TaskPage />
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;

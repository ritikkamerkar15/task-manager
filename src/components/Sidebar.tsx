
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  ListTodo, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Inbox, 
  Calendar, 
  Settings
} from 'lucide-react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar
} from '@/components/ui';

const menuItems = [
  { name: 'Dashboard', icon: <Home className="w-5 h-5" />, count: null, path: "/" },
  { name: 'To Do', icon: <ListTodo className="w-5 h-5" />, count: 7, path: "/todo" },
  { name: 'In Progress', icon: <Clock className="w-5 h-5" />, count: 3, path: "/inprogress" },
  { name: 'Completed', icon: <CheckCircle className="w-5 h-5" />, count: 12, path: "/completed" },
  { name: 'Blocked', icon: <AlertCircle className="w-5 h-5" />, count: 2, path: "/blocked" },
  { name: 'Inbox', icon: <Inbox className="w-5 h-5" />, count: 5, path: "/inbox" },
  { name: 'Calendar', icon: <Calendar className="w-5 h-5" />, count: null, path: "/calendar" },
  { name: 'Settings', icon: <Settings className="w-5 h-5" />, count: null, path: "/settings" },
];

const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  
  // Determine the current active page
  const currentPath = window.location.pathname;
  
  return (
    <ShadcnSidebar>
      <SidebarHeader className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-sidebar-foreground">TaskFlow</h1>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    tooltip={item.name}
                    isActive={currentPath === item.path}
                    onClick={() => {
                      // Navigate using React Router
                      navigate(item.path);
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    {item.count !== null && (
                      <span className="ml-auto bg-sidebar-accent text-sidebar-accent-foreground text-xs rounded-full px-2 py-1">
                        {item.count}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-sidebar-foreground/70">
          TaskFlow v1.0
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default AppSidebar;

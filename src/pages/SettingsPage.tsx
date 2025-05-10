
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const SettingsPage: React.FC = () => {
  // Sample state for settings
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [compactView, setCompactView] = useState(false);
  
  // Sample function to save settings
  const saveSettings = () => {
    toast.success("Settings saved successfully!");
    // In a real app, we would persist these settings
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your general application preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-save" className="text-base">Auto Save</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save your tasks as you create them
                  </p>
                </div>
                <Switch 
                  id="auto-save" 
                  checked={autoSave} 
                  onCheckedChange={setAutoSave}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact-view" className="text-base">Compact View</Label>
                  <p className="text-sm text-muted-foreground">
                    Display tasks in a more compact layout
                  </p>
                </div>
                <Switch 
                  id="compact-view" 
                  checked={compactView} 
                  onCheckedChange={setCompactView}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Control how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for task reminders and updates
                  </p>
                </div>
                <Switch 
                  id="push-notifications" 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark theme
                  </p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Access administrative and advanced features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">User & Role Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage users, roles, permissions and groups
                    </p>
                  </div>
                </div>
                <Button asChild variant="outline">
                  <Link to="/roles">Manage</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end">
        <Button onClick={saveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default SettingsPage;

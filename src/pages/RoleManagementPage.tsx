
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { User, UserGroup, UserRole } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Shield, UserRound, Users } from "lucide-react";

// Mock data for demonstration purposes
const mockUsers: User[] = [
  { 
    id: '1', 
    email: 'admin@example.com', 
    firstName: 'Admin', 
    lastName: 'User', 
    role: 'super_user',
    groups: ['1'],
    createdAt: new Date().toISOString(),
    active: true
  },
  { 
    id: '2', 
    email: 'manager@example.com', 
    firstName: 'Manager', 
    lastName: 'User', 
    role: 'manager',
    groups: ['2'],
    createdAt: new Date().toISOString(),
    active: true
  },
  { 
    id: '3', 
    email: 'executive@example.com', 
    firstName: 'Executive', 
    lastName: 'User', 
    role: 'executive',
    groups: ['1', '2'],
    createdAt: new Date().toISOString(),
    active: true
  }
];

const mockGroups: UserGroup[] = [
  {
    id: '1',
    name: 'Leadership',
    description: 'Leadership team including executives and management',
    members: [mockUsers[0], mockUsers[2]]
  },
  {
    id: '2',
    name: 'Operations',
    description: 'Team responsible for day-to-day operations',
    members: [mockUsers[1], mockUsers[2]]
  }
];

const RoleManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [groups, setGroups] = useState<UserGroup[]>(mockGroups);
  const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);
  const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    email: '',
    firstName: '',
    lastName: '',
    role: 'user',
    groups: [],
    active: true
  });
  const [newGroup, setNewGroup] = useState<Partial<UserGroup>>({
    name: '',
    description: '',
    members: []
  });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleCreateUser = () => {
    if (!newUser.email || !newUser.firstName || !newUser.lastName || !newUser.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    const user: User = {
      id: (users.length + 1).toString(),
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role as UserRole,
      groups: newUser.groups || [],
      createdAt: new Date().toISOString(),
      active: newUser.active || true
    };

    setUsers([...users, user]);
    setShowCreateUserDialog(false);
    setNewUser({
      email: '',
      firstName: '',
      lastName: '',
      role: 'user',
      groups: [],
      active: true
    });
    toast.success("User created successfully");
  };

  const handleCreateGroup = () => {
    if (!newGroup.name) {
      toast.error("Please provide a group name");
      return;
    }

    const selectedMembers = users.filter(user => selectedUsers.includes(user.id));

    const group: UserGroup = {
      id: (groups.length + 1).toString(),
      name: newGroup.name,
      description: newGroup.description || '',
      members: selectedMembers
    };

    setGroups([...groups, group]);
    setShowCreateGroupDialog(false);
    setNewGroup({
      name: '',
      description: '',
      members: []
    });
    setSelectedUsers([]);
    toast.success("Group created successfully");
  };

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'super_user': return 'bg-red-500';
      case 'admin': return 'bg-purple-500';
      case 'manager': return 'bg-blue-500';
      case 'executive': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Role Management</h1>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Groups</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Roles</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">User Management</h2>
            <Button onClick={() => setShowCreateUserDialog(true)}>Create User</Button>
          </div>
          
          <div className="grid gap-4 grid-cols-1">
            {users.map(user => (
              <Card key={user.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                  <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                    {user.role.replace('_', ' ').toUpperCase()}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={user.active ? "default" : "outline"}>
                        {user.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Groups:</span>
                      <div className="flex flex-wrap gap-1">
                        {user.groups.length > 0 ? (
                          user.groups.map(groupId => {
                            const group = groups.find(g => g.id === groupId);
                            return group ? (
                              <Badge key={groupId} variant="outline">
                                {group.name}
                              </Badge>
                            ) : null;
                          })
                        ) : (
                          <span className="text-muted-foreground text-xs">No groups</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="text-xs">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="groups">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Group Management</h2>
            <Button onClick={() => setShowCreateGroupDialog(true)}>Create Group</Button>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {groups.map(group => (
              <Card key={group.id}>
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Members ({group.members.length})</h3>
                    <div className="space-y-1">
                      {group.members.length > 0 ? (
                        group.members.slice(0, 5).map(member => (
                          <div key={member.id} className="flex items-center justify-between">
                            <span>{member.firstName} {member.lastName}</span>
                            <Badge className={`${getRoleBadgeColor(member.role)}`}>
                              {member.role.replace('_', ' ')}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-xs">No members</span>
                      )}
                      {group.members.length > 5 && (
                        <div className="text-sm text-muted-foreground">
                          +{group.members.length - 5} more members
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Role Definitions</CardTitle>
              <CardDescription>
                Understand the permissions and capabilities of each role in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-red-500">SUPER USER</Badge>
                  </div>
                  <p className="text-sm">
                    Highest level of access. Can create/modify/delete all users, groups, 
                    and system settings. Has unrestricted access to all features.
                  </p>
                </div>
                
                <div className="p-3 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-500">ADMIN</Badge>
                  </div>
                  <p className="text-sm">
                    Administrative access to user and group management. Cannot modify system 
                    settings but can manage all users and groups.
                  </p>
                </div>
                
                <div className="p-3 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-500">MANAGER</Badge>
                  </div>
                  <p className="text-sm">
                    Can manage users in their assigned groups. Limited ability to create new 
                    users with basic roles. Cannot modify system settings.
                  </p>
                </div>
                
                <div className="p-3 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">EXECUTIVE</Badge>
                  </div>
                  <p className="text-sm">
                    Access to analytics and reporting features. Read-only access to user 
                    information. Cannot create or modify users or groups.
                  </p>
                </div>
                
                <div className="p-3 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>USER</Badge>
                  </div>
                  <p className="text-sm">
                    Standard user with limited access. Can access and modify only their own profile 
                    information. No administrative capabilities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Create User Dialog */}
      <Dialog open={showCreateUserDialog} onOpenChange={setShowCreateUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system with specified role and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={newUser.email} 
                onChange={e => setNewUser({...newUser, email: e.target.value})}
                placeholder="user@example.com" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={newUser.firstName} 
                  onChange={e => setNewUser({...newUser, firstName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={newUser.lastName} 
                  onChange={e => setNewUser({...newUser, lastName: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={newUser.role as string} 
                onValueChange={value => setNewUser({...newUser, role: value as UserRole})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_user">Super User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="active" 
                checked={newUser.active} 
                onCheckedChange={checked => setNewUser({...newUser, active: checked})}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateUserDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateUser}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create Group Dialog */}
      <Dialog open={showCreateGroupDialog} onOpenChange={setShowCreateGroupDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>
              Create a new group and assign users to it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input 
                id="groupName" 
                value={newGroup.name} 
                onChange={e => setNewGroup({...newGroup, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                value={newGroup.description} 
                onChange={e => setNewGroup({...newGroup, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="block mb-2">Select Members</Label>
              <div className="border rounded-md p-2 max-h-60 overflow-y-auto">
                {users.map(user => (
                  <div key={user.id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                    <input 
                      type="checkbox" 
                      id={`user-${user.id}`} 
                      checked={selectedUsers.includes(user.id)} 
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded"
                    />
                    <label htmlFor={`user-${user.id}`} className="flex flex-1 justify-between">
                      <span>{user.firstName} {user.lastName}</span>
                      <Badge className={`${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </Badge>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateGroupDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateGroup}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagementPage;

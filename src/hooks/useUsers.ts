
import { useState, useEffect } from 'react';
import { User, mockUsers } from '../data/mockUsers';
import { toast } from 'sonner';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

  const addUser = (newUser: Omit<User, 'id'>) => {
    const user: User = {
      ...newUser,
      id: Date.now().toString(),
    };
    setUsers(prev => [...prev, user]);
    toast.success('User added successfully!');
    return user;
  };

  const updateUser = (id: string, updatedUser: Omit<User, 'id'>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...updatedUser, id } : user
    ));
    toast.success('User updated successfully!');
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    toast.success('User deleted successfully!');
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  return {
    users,
    loading,
    addUser,
    updateUser,
    deleteUser,
    getUserById
  };
};

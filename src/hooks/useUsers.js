
import { useState, useEffect } from 'react';
import { mockUsers } from '../data/mockUsers';
import { toast } from 'sonner';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

  const addUser = (newUser) => {
    const user = {
      ...newUser,
      id: Date.now().toString(),
    };
    setUsers(prev => [...prev, user]);
    toast.success('User added successfully!');
    return user;
  };

  const updateUser = (id, updatedUser) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...updatedUser, id } : user
    ));
    toast.success('User updated successfully!');
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    toast.success('User deleted successfully!');
  };

  const getUserById = (id) => {
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

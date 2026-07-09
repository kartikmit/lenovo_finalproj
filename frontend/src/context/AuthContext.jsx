import { createContext, useState, useEffect } from 'react';
import api from '../utils/axios.js';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // We remove the old useEffect and initialize the state synchronously
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('userInfo');
    return saved ? JSON.parse(saved) : null;
  }, []);
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setUser(res.data);
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      toast.success('Logged in!');
      return true;
    } catch (err) {
      toast.error('Login failed');
      return false;
    }
  };
  const register = async (name, email, password, level) => {
    try {
      const res = await api.post('/auth/register', { name, email, password, level });
      setUser(res.data);
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      toast.success('Registered!');
      return true;
    } catch (err) {
      toast.error('Registration failed');
      return false;
    }
  };
  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    localStorage.removeItem('userInfo');
    toast.success('Logged out');
  };
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};
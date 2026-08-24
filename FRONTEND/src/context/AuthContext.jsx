import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER } from '../data/mockUserData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('learnlens_user');
    return saved ? JSON.parse(saved) : MOCK_USER;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('learnlens_user', JSON.stringify(user));
    }
  }, [user]);

  const login = (email, password) => {
    const loggedUser = {
      ...MOCK_USER,
      email: email || MOCK_USER.email,
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    localStorage.setItem('learnlens_token', 'mock_jwt_token_alex_chen');
    return { success: true };
  };

  const signup = (name, email, password) => {
    const newUser = {
      ...MOCK_USER,
      name: name || 'Learner',
      email: email || 'learner@learnlens.ai',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('learnlens_token', 'mock_jwt_token_new_learner');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('learnlens_token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

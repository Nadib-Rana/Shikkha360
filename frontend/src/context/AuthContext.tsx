// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext<{ isAuthenticated: boolean }>({ isAuthenticated: false });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with real logic

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
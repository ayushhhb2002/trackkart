import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  userId: number | null;
  isLoggedIn: boolean;
  role: string | null;
  login: (id: number, userRole: string) => void;
  logout: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null); 

  const login = (id: number, userRole: string) => {
    setUserId(id);
    setRole(userRole);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserId(null);
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ userId, isLoggedIn, role, login, logout, setIsLoggedIn, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

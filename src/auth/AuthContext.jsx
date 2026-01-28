import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userName=localStorage.getItem("username")
    if (!token || !role) return null;

    return { token, role,userName };
  });

  const login = ({ token, role,userName }) => {
   
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
     localStorage.setItem("username", userName);
    setUser({ token, role,userName });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { React, createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    const today = new Date();
    const currentDate = today.toLocaleDateString();
    const loggedInUser = { username, currentDate };
    setUser(loggedInUser);
    console.log(loggedInUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

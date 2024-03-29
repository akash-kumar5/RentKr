import { createContext, useContext, useDebugValue, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const storeTokenInLs = (userData) => {
    // Assuming userData is an object with properties isUser, isAdmin, and token
    localStorage.setItem("token", userData.token);
  };

  const isAuthenticated = !!user;

  const setIsAuthenticated = (value) => {
    if (value) {
      setUser(value);
    } else {
      setUser(null);
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isAuthenticated,
        storeTokenInLs,
        setIsAuthenticated,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};

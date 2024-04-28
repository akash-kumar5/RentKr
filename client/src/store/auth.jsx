import { createContext, useContext, useDebugValue, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token ,setToken] = useState(localStorage.getItem("token"))

  const storeTokenInLs = (userData) => {
    // Assuming userData is an object with properties isUser, isAdmin, and token
    localStorage.setItem("token", userData);
  };

  const setAdmin = (userData) => {
    // Assuming userData is an object with properties isUser, isAdmin, and token
    localStorage.setItem("admin", userData);
  };

  let isLoggedIn = !!token;
  console.log("auth",isLoggedIn);

  const LogoutUser = () => {
    setToken("")
    setIsAdmin(false); // Set isAdmin to false
    return localStorage.removeItem("token") | localStorage.removeItem("admin") | localStorage.removeItem("userId");
  };

  const isAuthenticated = !!user;

  const setIsAuthenticated = (value) => {
    if (value) {
      setUser(value);
    } else {
      setUser(null);
    }
  };
  
  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user",{
        method: "GET",
        headers : {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.ok){
        const data =await response.json();
        setUser(data);
        localStorage.setItem("userId",data._id);
        console.log("data",data);
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  }

  useEffect(() => {
    console.log("user",user);
    // Set isAdmin based on the value retrieved from localStorage
    const adminValue = localStorage.getItem("admin");
    setIsAdmin(adminValue === "true");
    userAuthentication();
  }, []);

  useEffect(() => {
    userAuthentication();
  },[]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isAuthenticated,
        storeTokenInLs,
        setIsAuthenticated,
        setAdmin,
        setIsAdmin,
        LogoutUser,
        isLoggedIn,
        userAuthentication
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

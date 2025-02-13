import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (token && user) {
      setAuth({ user, token, isAuthenticated: true });
    } else {
      setAuth({ user: null, token: null, isAuthenticated: false });
    }
  }, []);

  return (
    <UserContext.Provider value={{ auth, setAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

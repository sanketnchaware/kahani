import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setAuth({ user, token, isAuthenticated: true });
    } else {
      setAuth({ user: null, token: null, isAuthenticated: false });
    }
  }, []);

  useEffect(() => {
    if (auth?.user) {
      localStorage.setItem("user", JSON.stringify(auth.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [auth?.user]); // 🔄 Syncs `auth` to localStorage

  return (
    <UserContext.Provider value={{ auth, setAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

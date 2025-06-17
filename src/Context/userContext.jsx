import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user:
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
  });
  const login = (user, token = null) => {
    const currentToken = token || localStorage.getItem("token");

    localStorage.setItem("user", JSON.stringify(user));
    if (token) {
      localStorage.setItem("token", token);
    }

    setAuth({ user, token: currentToken });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ user: null, token: null });
  };

  const isAuthenticated = !!(auth.user && auth.token);

  return (
    <UserContext.Provider value={{ ...auth, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

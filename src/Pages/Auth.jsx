import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../userContext/userContext";
import Login from "../Components/LoginPages/Login";
import Signup from "../Components/LoginPages/Signup";

const Auth = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const {
    auth: { isAuthenticated },
  } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return <>{pathname === "/login" ? <Login /> : <Signup />}</>;
};

export default Auth;

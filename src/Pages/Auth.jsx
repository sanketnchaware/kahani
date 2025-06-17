import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../Context/userContext";
import Login from "../Components/LoginPages/Login";
import Signup from "../Components/LoginPages/Signup";

const Auth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user, token } = useContext(UserContext);

  // ✅ Redirect to home only after loading is complete
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return <>{pathname === "/login" ? <Login /> : <Signup />}</>;
};

export default Auth;

// src/Components/AuthSuccess.jsx
import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserContext from "../Context/userContext";
import { showToastMessage } from "../utils/helpers";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useContext(UserContext); // use login method from context

  useEffect(() => {
    const token = searchParams.get("token");
    const userString = searchParams.get("user");

    if (token && userString) {
      try {
        const user = JSON.parse(decodeURIComponent(userString));

        // ✅ Use login from context
        login(user, token);

        showToastMessage("Login successful!", "success");
        navigate("/");
      } catch (err) {
        console.error("Error parsing user data", err);
        showToastMessage("Invalid login data", "error");
        navigate("/login");
      }
    } else {
      showToastMessage("Login failed", "error");
      navigate("/login");
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      Logging you in...
    </div>
  );
};

export default AuthSuccess;

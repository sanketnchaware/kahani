// src/GoogleCallback.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        // Save the token in local storage
        localStorage.setItem("token", token);
        // Redirect to homepage
        navigate("/home");
      } else {
        // Redirect to login if token not found
        navigate("/");
      }
    };

    fetchData();
  }, [history]);

  return <div>Loading...</div>;
};

export default GoogleCallback;

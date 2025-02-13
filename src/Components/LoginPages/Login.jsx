// src/Login.js
import React, { useContext, useState } from "react";
import CommonButton from "../Common/CommonButton";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../Common/TextInput";
import axiosInstance from "../../utils/axiosInstance";
import { showToastMessage } from "../../utils/helpers";
import UserContext from "../../userContext/userContext";

const Login = () => {
  const { setAuth } = useContext(UserContext);

  const fields = { email: "", password: "" };

  const navigate = useNavigate();

  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);

  const handleChange = (e) => {
    const { name, value } = e?.target;

    setParams({ ...params, [name]: value });
  };

  const handleLogin = () => {
    window.open("http://localhost:3333/auth/google");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = params;
    axiosInstance
      .post("/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setAuth({
          user: response.data.user,
          token: response.data.token,
          isAuthenticated: true,
        });
        showToastMessage(response?.data?.message, "success");
        navigate("/");
      })
      .catch((error) => {
        console.log("error:", error);
        showToastMessage(error?.response?.data?.message, "error");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full">
        {/* <p className="text-center text-gray-600 mb-4">
          Kahani Suno, Tum Jubani Suno..
          </p> */}

        <form className="mb-4 space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center ">Sign in </h2>
          <TextInput
            type="email"
            name="email"
            placeholder="Enter Email"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={params?.email}
            onChange={handleChange}
            error={errors?.email}
          />
          <TextInput
            type="password"
            name="password"
            placeholder="Enter Password"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={params?.password}
            onChange={handleChange}
            error={errors?.password}
          />

          <CommonButton size="sm" styles="w-full  text-md">
            Sign In
          </CommonButton>
        </form>

        <button
          onClick={handleLogin}
          className="w-full bg-white  font-semibold py-2 rounded border  hover:bg-blue-50 transition duration-200"
        >
          Sign in with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-500">or</p>

          <Link className="underline text-sm" to="/signup">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import CommonButton from "../Common/CommonButton";
import { Link } from "react-router-dom";
import TextInput from "../Common/TextInput";
import axiosInstance from "../../utils/axiosInstance";
import { showToastMessage } from "../../utils/helpers";
import LoaderContext from "../../Context/loaderContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { setLoading } = useContext(LoaderContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmail("");

    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      showToastMessage(res.data.message, "success");
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong. Try again.";
      setError(message);
      showToastMessage(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full">
        <form method="POST" className="mb-4 space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center">Forgot Password</h2>

          <TextInput
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            error={error}
          />

          <CommonButton type="submit" size="sm" styles="w-full text-md">
            Send Reset Link
          </CommonButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500">or</p>
          <Link className="underline text-sm" to="/login">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

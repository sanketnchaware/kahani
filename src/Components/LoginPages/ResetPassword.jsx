import React, { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import TextInput from "../Common/TextInput";
import CommonButton from "../Common/CommonButton";
import axiosInstance from "../../utils/axiosInstance";
import { showToastMessage } from "../../utils/helpers";
import LoaderContext from "../../Context/loaderContext";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { setLoading } = useContext(LoaderContext);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password1 !== password2) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        token,
        password: password1,
      });
      showToastMessage(res.data.message, "success");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Reset failed.";
      showToastMessage(msg, "error");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full">
        <form onSubmit={handleSubmit} className="mb-4 space-y-4">
          <h2 className="text-3xl font-bold text-center">Reset Password</h2>

          <TextInput
            type="password"
            name="password1"
            placeholder="New Password"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            error={error}
          />

          <TextInput
            type="password"
            name="password2"
            placeholder="Confirm New Password"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            error={error}
          />

          <CommonButton type="submit" size="sm" styles="w-full text-md">
            Reset Password
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

export default ResetPassword;

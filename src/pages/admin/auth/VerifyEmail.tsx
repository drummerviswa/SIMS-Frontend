import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import API from "../../../utils/API";

export default function VerifyEmail() {
  const { verificationCode } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");
  const [status, setStatus] = useState("loading"); // loading, success, error

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await API.post(
          `/admin/auth/verify-email/${verificationCode}`
        );
        setMessage(response.data.message || "Email verified successfully.");
        setStatus("success");

        // Optionally redirect after a few seconds
        setTimeout(() => {
          navigate("/admin/login");
        }, 3000);
      } catch (error) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed.");
      }
    };

    if (verificationCode) verify();
  }, [verificationCode, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        {status === "loading" && (
          <div className="animate-pulse text-blue-500 font-medium">
            {message}
          </div>
        )}
        {status === "success" && (
          <div className="text-green-600 text-lg font-semibold">{message}</div>
        )}
        {status === "error" && (
          <div className="text-red-500 text-lg font-semibold">{message}</div>
        )}
        {status !== "loading" && (
          <p className="text-sm text-gray-600 mt-2">
            Redirecting to login page...
          </p>
        )}
      </div>
    </div>
  );
}

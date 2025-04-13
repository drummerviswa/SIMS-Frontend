import { setAuthToken } from "../../../utils/API";
import useForm from "../../admin/auth/useForm";
import Validate from "../../admin/auth/Validate";
import { useNavigate } from "react-router"; // if using React Router

export default function AdminLogin() {
  const navigate = useNavigate();

  const submitCallback = (data) => {
    // Handle successful login here
    setAuthToken(data.token); // Set the token in the API instance
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("admin", JSON.stringify(data.admin)); // Store user data in local storage
    console.log("Login success:", data);
    navigate("/admin", {
      replace: true,
    });
  };

  const endpoint = "/admin/auth/login"; // your backend endpoint

  const { handleChange, value, handleSubmit, isSubmitting, Errors } = useForm(
    Validate,
    submitCallback,
    endpoint
  );
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-700 z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-0" />

      <div className="bg-white rounded-2xl shadow-lg flex w-[900px] max-w-full overflow-hidden z-10">
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-semibold mb-8 text-center">
            Admin Login
          </h1>

          {/* Display server error if any */}
          {Errors.api && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {Errors.api}
            </p>
          )}

          {/* Email Field */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            {Errors.email && (
              <p className="text-red-500 text-xs mb-1">{Errors.email}</p>
            )}
            <input
              type="email"
              id="email"
              name="email"
              value={value.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            {Errors.password && (
              <p className="text-red-500 text-xs mb-1">{Errors.password}</p>
            )}
            <input
              type="password"
              id="password"
              name="password"
              value={value.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* Sign Up Text */}
          <p className="text-sm text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right Side Illustration */}
        <div className="w-1/2 bg-gray-50 p-10 flex flex-col justify-center items-center text-center">
          <img
            src="../../../../public/SIMS_hero.svg"
            alt="Illustration"
            className="w-64 h-auto mb-6"
          />
        </div>
      </div>
    </div>
  );
}

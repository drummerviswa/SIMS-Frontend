import { IoMdClose } from "react-icons/io";
import API, { setAuthToken } from "../../../utils/API";
import useForm from "../../admin/auth/useForm";
import Validate from "../../admin/auth/Validate";
import { Link, useNavigate } from "react-router";
export default function AdminLogin() {
  const navigate = useNavigate();

  const submitCallback = (data) => {
    setAuthToken(data.token,"admin");
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("admin", JSON.stringify(data.admin));
    API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    console.log("Login success:", data);
    navigate("/admin", {
      replace: true,
    });
  };

  const endpoint = "/admin/auth/login";
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
        <button
          onClick={() => navigate("/",{
            replace: true,
          })}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
          aria-label="Close"
        >
          <IoMdClose size={50} />
        </button>

        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-semibold mb-8 text-center">
            Admin Login
          </h1>
          {Errors.api && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {Errors.api}
            </p>
          )}
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
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link to={"/admin/register"} className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
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

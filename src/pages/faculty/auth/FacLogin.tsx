import { useNavigate } from "react-router";
import useForm from "../../faculty/auth/useForm";
import Validate from "../../faculty/auth/Validate";
import { setAuthToken } from "../../../utils/API";
import { IoMdClose } from "react-icons/io";

export default function FacLogin() {
  const navigate = useNavigate();

  const submitCallback = (data) => {
    setAuthToken(data.token,"faculty");
    localStorage.setItem("facultyToken", data.token);
    localStorage.setItem("faculty", JSON.stringify(data.faculty));
    console.log("Login success:", data);
    navigate("/faculty", {
      replace: true,
    });
  };

  const endpoint = "/faculty/auth/login";
  const { handleChange, value, handleSubmit, isSubmitting, Errors } = useForm(
    Validate,
    submitCallback,
    endpoint
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-700 z-0" />

      <div className="bg-white rounded-2xl shadow-lg flex w-[900px] max-w-full overflow-hidden z-10">
        <button
          onClick={() =>
            navigate("/", {
              replace: true,
            })
          }
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
          aria-label="Close"
        >
          <IoMdClose size={50} />
        </button>
        {/* Left Side - Illustration */}
        <div className="w-1/2 bg-gray-50 p-10 flex flex-col justify-center items-center text-center">
          <img
            src="/SIMS_hero.svg" // corrected path
            alt="Illustration"
            className="w-64 h-auto mb-6"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-semibold mb-8 text-center">
            Faculty Login
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Username
              </label>
              {Errors.username && (
                <p className="text-red-500 text-xs mb-1">{Errors.username}</p>
              )}
              <input
                type="text"
                id="username"
                name="username"
                value={value.username}
                onChange={handleChange}
                placeholder="Enter username"
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            {Errors.api && (
              <p className="text-red-500 text-xs text-center mt-2">
                {Errors.api}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

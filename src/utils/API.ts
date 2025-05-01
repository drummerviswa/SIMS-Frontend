import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL as string;

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// This function sets the token in both axios headers and localStorage
export const setAuthToken = (newToken: string) => {
  if (newToken) {
    localStorage.setItem("adminToken", newToken);
    API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  } else {
    localStorage.removeItem("adminToken");
    delete API.defaults.headers.common["Authorization"];
  }
};

// Load token from storage (e.g., on app init)
const token = localStorage.getItem("adminToken");
if (token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  setAuthToken(token);
  console.log("Token loaded from localStorage:", token);
  
}

// Optional utility functions
export const getAuthToken = () => localStorage.getItem("adminToken");
export const getFacultyToken = () => localStorage.getItem("facultyToken");
export const getDepartmentToken = () => localStorage.getItem("departmentToken");
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export default API;

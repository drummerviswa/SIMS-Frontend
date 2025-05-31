import axios from "axios";

// Base URL from your .env
const baseURL = import.meta.env.VITE_API_URL as string;

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ==============================
// Token Key Definitions
// ==============================
export const TOKEN_KEYS = {
  admin: "adminToken",
  faculty: "facultyToken",
  department: "departmentToken",
};

// ==============================
// Set Token
// ==============================
export const setAuthToken = (token: string | null, role: keyof typeof TOKEN_KEYS) => {
  const key = TOKEN_KEYS[role];

  if (token) {
    localStorage.setItem(key, token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem(key);
    delete API.defaults.headers.common["Authorization"];
  }
};

// ==============================
// Get Token
// ==============================
export const getAuthToken = (role: keyof typeof TOKEN_KEYS): string | null =>
  localStorage.getItem(TOKEN_KEYS[role]);

// ==============================
// Optional: Role Tracker (for token persistence across sessions)
// ==============================
export const setActiveRole = (role: keyof typeof TOKEN_KEYS) => {
  localStorage.setItem("activeRole", role);
};

export const getActiveRole = (): keyof typeof TOKEN_KEYS | null => {
  return localStorage.getItem("activeRole") as keyof typeof TOKEN_KEYS | null;
};

export const clearActiveRole = () => {
  localStorage.removeItem("activeRole");
};

// ==============================
// Auto-load token from active role on init
// ==============================
const activeRole = getActiveRole();
if (activeRole) {
  const token = getAuthToken(activeRole);
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log(`[${activeRole}] token loaded on init:`, token);
  }
}

// ==============================
// Global Axios Interceptor
// ==============================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear all tokens and role
      Object.values(TOKEN_KEYS).forEach((key) => localStorage.removeItem(key));
      clearActiveRole();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;

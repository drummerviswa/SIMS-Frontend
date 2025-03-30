import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL as string;
const token = localStorage.getItem("token") || "";

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const setAuthToken = (newToken: string) => {
  if (newToken) {
    API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export default API;

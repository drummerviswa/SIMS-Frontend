import React, { createContext, useState, useEffect, useContext } from "react";
import {
  loginAdmin,
  loginFaculty,
  loginDepartment,
  logout,
} from "../services/authServices";

const AdminAuthContext = createContext(undefined);

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token && userRole) {
      setUser({ token });
      setRole(userRole);
    }
  }, []);

  const AdminLogin = async (email, password, userType) => {
    let data;
    if (userType === "admin") {
      data = await loginAdmin(email, password);
    } else if (userType === "faculty") {
      data = await loginFaculty(email, password);
    } else if (userType === "department") {
      data = await loginDepartment(email, password);
    }
    setUser({ token: data.token });
    setRole(userType);
  };

  const handleAdminLogout = async () => {
    await logout();
    setUser(null);
    setRole(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{ user, role, AdminLogin, handleAdminLogout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

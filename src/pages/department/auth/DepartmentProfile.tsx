import { useState, useEffect } from "react";
import axios from "axios";
import defaultImage from "./image.png";
import API from "../../../utils/API";
import { Link } from "react-router";

export default function DepartmentProfile() {
  const [departmentData, setDepartmentData] = useState({
    deptid: "",
    deptName: "",
    username: "",
    photo: null,
  });
  const departmentCredentials = localStorage.getItem("department");
  const department = JSON.parse(departmentCredentials || "{}");

  useEffect(() => {
    API.get(`/department/auth/profile/${department.deptid}`)
      .then((res) => {
        const { deptid, deptName, username, photo } = res.data;
        setDepartmentData({
          deptid: deptid || "",
          deptName: deptName || "",
          username: username || "",
          photo: photo || null,
        });
      })
      .catch((error) => {
        console.error("Could not load department data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Department Profile</h2>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-300">
          <div className="flex items-center space-x-6">
            <img
              src={departmentData.photo || defaultImage}
              alt="Department"
              onError={(e) => (e.currentTarget.src = defaultImage)}
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
            <div className="space-y-1">
              <p className="text-gray-600">ID: {departmentData.deptid}</p>
              <h3 className="text-xl font-bold">
                Deparment of {departmentData.deptName}
              </h3>
              <p className="text-gray-600">
                Username: {departmentData.username}
              </p>
              <div className="text-gray-600 flex flex-col gap-2">
                <p className="underline ">For changing the password</p>
                <Link
                  to={"/department/contactadmin"}
                  className="px-4 py-2 text-center rounded-lg bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
                >
                  Contact Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import API from "../../../utils/API";
import defaultImage from "./image.png";

export default function FacultyProfile() {
  const [facultyData, setFacultyData] = useState({
    facName: "",
    username: "",
    primaryDept: "",
    designation: "",
  });
  const facultyCredentials = localStorage.getItem("faculty");
  const faculty = JSON.parse(facultyCredentials || "{}");
  useEffect(() => {
    API.get(`/faculty/auth/profile/${faculty.facid}`)
      .then((res) => {
        const { facName, username, primaryDept, designation, photo } = res.data;

        setFacultyData({
          facName: facName || "",
          username: username || "",
          primaryDept: primaryDept || "",
          designation: designation || "",
        });
      })
      .catch((error) => {
        console.error("Could not load faculty data, showing default:", error);
      });
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Faculty Profile</h2>

        {/* Personal Info */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-300">
          <h4 className="font-semibold text-lg">Faculty Information</h4>
          <div className="flex items-center space-x-6">
            <img
              src={defaultImage}
              alt="Faculty"
              className="w-24 h-24 rounded-full object-cover border border-gray-300 m-4"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-gray-700">
            <div>
              <span className="font-medium">Full Name:</span>{" "}
              {facultyData.facName}
            </div>
            <div>
              <span className="font-medium">Username:</span>{" "}
              {facultyData.username}
            </div>
            <div>
              <span className="font-medium">Primary Department:</span>{" "}
              {facultyData.primaryDept}
            </div>
            <div>
              <span className="font-medium">Designation:</span>{" "}
              {facultyData.designation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

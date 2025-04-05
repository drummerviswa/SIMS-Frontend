import { useState, useEffect } from "react";
import axios from "axios";
import defaultImage from "./image.png"; // Import default image from the same folder

export default function DepartmentForm() {
  const [deptData, setDeptData] = useState({
    name: "Default Name",
    username: "default_username",
    photo: defaultImage, // Set default image
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/department")
      .then(response => {
        if (response.data && Object.keys(response.data).length > 0) {
          setDeptData({
            name: response.data.name || "Default Name",
            username: response.data.username || "default_username",
            photo: response.data.photo || defaultImage,
          });
        }
      })
      .catch(error => {
        console.error("Error fetching admin data:", error);
      });
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg mt-8">

      <h2 className="text-xl font-bold mb-4">Department Profile</h2>
      <div className="mt-4 p-4 border rounded shadow text-center">
        <img
          src={deptData.photo}
          alt="Admin"
          className="w-24 h-24 rounded-full mx-auto mb-2"
          onError={(e) => (e.currentTarget.src = defaultImage)} // Fallback if image fails
        />
        <p><strong>Name:</strong> {deptData.name}</p>
        <p><strong>Username:</strong> {deptData.username}</p>
      </div>
    </div>
  );
}


import { useState, useEffect } from "react";
import axios from "axios";
import defaultImage from "./image.png"; // Import default image from the same folder

export default function AdminForm() {
  const [adminData, setAdminData] = useState({
    name: "Default Name",
    username: "default_username",
    photo: defaultImage, // Set default image
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin")
      .then(response => {
        if (response.data && Object.keys(response.data).length > 0) {
          setAdminData({
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
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Admin Profile</h2>
      <div className="mt-4 p-4 border rounded shadow text-center">
        <img
          src={adminData.photo}
          alt="Admin"
          className="w-24 h-24 rounded-full mx-auto mb-2"
          onError={(e) => (e.currentTarget.src = defaultImage)} // Fallback if image fails
        />
        <p><strong>Name:</strong> {adminData.name}</p>
        <p><strong>Username:</strong> {adminData.username}</p>
      </div>
    </div>
  );
}

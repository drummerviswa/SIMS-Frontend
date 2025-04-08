import { useState, useEffect } from "react";
import axios from "axios";
import defaultImage from "./image.png";

export default function AdminProfile() {
  const [adminData, setAdminData] = useState({
    firstName: "Jack",
    lastName: "Adams",
    email: "jackadams@gmail.com",
    phone: "(213) 555-1234",
    bio: "Product Designer",
    photo: defaultImage,
    state: "California, USA",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin")
      .then((res) => {
        const { firstName, lastName, email, phone, bio, photo, state } = res.data;

        setAdminData({
          firstName: firstName || "Jack",
          lastName: lastName || "Adams",
          email: email || "jackadams@gmail.com",
          phone: phone || "(213) 555-1234",
          bio: bio || "Product Designer",
          photo: photo || defaultImage,
          state: state || "California, USA",
        });
      })
      .catch((error) => {
        console.error("Could not load admin data, showing default:", error);
      });
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setAdminData((prev) => ({ ...prev, photo: imageUrl }));

    const formData = new FormData();
    formData.append("photo", file);

    axios
      .post("http://localhost:5000/api/admin/photo", formData)
      .then(() => console.log("Photo uploaded successfully"))
      .catch((error) => console.error("Error uploading photo:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Admin Profile</h2>

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-300">
          <div className="flex items-center space-x-6">
            <img
              src={adminData.photo}
              alt="Admin"
              onError={(e) => (e.currentTarget.src = defaultImage)}
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
            <div className="space-y-1">
              <h3 className="text-xl font-bold">
                {adminData.firstName} {adminData.lastName}
              </h3>
              <p className="text-gray-600">{adminData.bio}</p>
              <p className="text-gray-500 text-sm">{adminData.state}</p>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mt-2 text-sm text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-300">
          <h4 className="font-semibold text-lg mb-4">Personal Information</h4>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-gray-700">
            <div>
              <span className="font-medium">First Name:</span> {adminData.firstName}
            </div>
            <div>
              <span className="font-medium">Last Name:</span> {adminData.lastName}
            </div>
            <div>
              <span className="font-medium">Email address:</span> {adminData.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {adminData.phone}
            </div>
            <div>
              <span className="font-medium">Bio:</span> {adminData.bio}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


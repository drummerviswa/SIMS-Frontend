import { useEffect, useState } from "react";
import defaultImage from "./image.png";
import API from "../../../utils/API";
import { Modal } from "../../../components/ui/modal";

export default function AdminProfile() {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    profile_pic: null,
  });

  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showEditEmailModal, setShowEditEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    API.get("/admin/auth/profile", authHeader)
      .then((res) => setAdminData(res.data))
      .catch((err) => console.error("Failed to load admin data", err));
  }, []);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_pic", file);

    try {
      const res = await API.put("/admin/auth/update-profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setAdminData((prev) => ({
        ...prev,
        profile_pic: res.data.imageUrl,
      }));
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleSaveName = async () => {
    try {
      await API.put("/admin/auth/update-name", { name: newName }, authHeader);
      setAdminData((prev) => ({ ...prev, name: newName }));
      setShowEditNameModal(false);
    } catch (error) {
      console.error("Name update failed", error);
    }
  };

  const handleSaveEmail = async () => {
    try {
      await API.put(
        "/admin/auth/update-email",
        { email: newEmail },
        authHeader
      );
      setAdminData((prev) => ({ ...prev, email: newEmail }));
      setShowEditEmailModal(false);
    } catch (error) {
      console.error("Email update failed", error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      await API.put(
        "/admin/auth/change-password",
        {
          email: adminData.email,
          oldPassword,
          newPassword,
        },
        authHeader
      );
      setOldPassword("");
      setNewPassword("");
      setShowPasswordModal(false);
    } catch (error) {
      console.error("Password update failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Admin Profile</h2>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-300">
          <div className="flex items-center space-x-6">
            <img
              src={adminData.profile_pic || defaultImage}
              alt="Profile"
              onError={(e) => (e.currentTarget.src = defaultImage)}
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
            <div className="space-y-1">
              <h3 className="text-xl font-bold">{adminData.name}</h3>
              <p className="text-gray-600">{adminData.email}</p>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mt-2 text-sm text-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
          <h4 className="font-semibold text-lg mb-4">Account Info</h4>
          <div className="grid grid-cols-1 gap-y-4 text-gray-700">
            <div>
              <span className="font-medium">Name:</span> {adminData.name}
              <button
                onClick={() => {
                  setNewName(adminData.name);
                  setShowEditNameModal(true);
                }}
                className="ml-4 text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
            </div>
            <div>
              <span className="font-medium">Email:</span> {adminData.email}
              <button
                onClick={() => {
                  setNewEmail(adminData.email);
                  setShowEditEmailModal(true);
                }}
                className="ml-4 text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
            </div>
            <div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="ml-2 text-red-500 hover:underline text-sm"
              >
                Change Password?
              </button>
            </div>
          </div>
        </div>

        <Modal
          className="max-w-[500px] p-4"
          isOpen={showEditNameModal}
          onClose={() => setShowEditNameModal(false)}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Update Name</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <button
              onClick={handleSaveName}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </Modal>

        <Modal
          className="max-w-[500px] p-4"
          isOpen={showEditEmailModal}
          onClose={() => setShowEditEmailModal(false)}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Update Email</h3>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <button
              onClick={handleSaveEmail}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </Modal>

        <Modal
          className="max-w-[500px] p-4"
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Change Password</h3>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <button
              onClick={handlePasswordChange}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

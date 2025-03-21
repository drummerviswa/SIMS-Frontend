import { useState } from "react";
// import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";

// Interface for Department
interface Department {
  id: number;
  name: string;
  username: string;
  password: string;
}

export default function ManageDepartment() {
  // const { openModal, closeModal } = useModal();
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: "Department of Mathematics",
      username: "dom",
      password: "domlab.local",
    },
  ]);
  const [formData, setFormData] = useState<Department>({
    id: 0,
    name: "",
    username: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // New state to control modal visibility

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open Modal for Adding
  const handleAddClick = () => {
    setFormData({ id: 0, name: "", username: "", password: "" }); // Clear form
    setIsEditing(false);
    setIsModalOpen(true); // Open modal
  };

  // Open Modal for Editing
  const handleEditClick = (department: Department) => {
    setFormData(department);
    setIsEditing(true);
    setIsModalOpen(true); // Open modal
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Add or Update Department
  const handleSave = () => {
    if (isEditing) {
      setDepartments(
        departments.map((dept) => (dept.id === formData.id ? formData : dept))
      );
    } else {
      setDepartments([
        ...departments,
        { ...formData, id: departments.length + 1 },
      ]);
    }
    setIsModalOpen(false); // Close modal after saving
  };

  // Delete Department
  const handleDelete = (id: number) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  // Filtered Data
  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(search.toLowerCase()) ||
      dept.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="dark:bg-gray-dark bg-white px-4 py-2 rounded-xl">
        {/* Controls */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search departments..."
            className="border p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddClick} // Open form when clicked
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add Department
          </button>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Department Name</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Password</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            {filteredDepartments.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No department found
                </td>
              </tr>
            )}
            <tbody>
              {filteredDepartments.map((dept, index) => (
                <tr
                  key={dept.id}
                  className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{dept.name}</td>
                  <td className="px-6 py-4">{dept.username}</td>
                  <td className="px-6 py-4">{dept.password}</td>
                  <td className="px-6 py-4 flex gap-x-2">
                    <button
                      onClick={() => handleEditClick(dept)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          className="max-w-[500px] m-4"
        >
          <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8">
            <h2 className="text-lg font-bold mb-4 p-4 text-gray-800 dark:text-white">
              {isEditing ? "Edit Department" : "Add Department"}
            </h2>

            <div className="px-4">
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Department Name
              </p>
              <input
                type="text"
                name="name"
                className="block w-full p-2 border rounded mb-3"
                value={formData.name}
                onChange={handleChange}
              />

              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Username
              </p>
              <input
                type="text"
                name="username"
                className="block w-full p-2 border rounded mb-3"
                value={formData.username}
                onChange={handleChange}
              />

              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Password
              </p>
              <input
                type="text"
                name="password"
                className="block w-full p-2 border rounded mb-4"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-2 px-4 pb-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

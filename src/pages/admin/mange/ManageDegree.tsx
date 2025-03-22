import { useState } from "react";

// Interface for Degree
interface Degree {
  id: number;
  degreeId: string;
  degreeName: string;
  duration: string;
  graduation: string;
  department: string;
}

// Mock Departments
const departments = ["Mathematics", "Computer Science", "Physics", "Chemistry"];

export default function ManageDegrees() {
  const [degrees, setDegrees] = useState<Degree[]>([
    { id: 1, degreeId: "CS101", degreeName: "BSc Computer Science", duration: "3 Years", graduation: "UG", department: "Computer Science" },
  ]);

  const [formData, setFormData] = useState<Degree>({
    id: 0,
    degreeId: "",
    degreeName: "",
    duration: "",
    graduation: "",
    department: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open Modal for Adding
  const handleAddClick = () => {
    setFormData({ id: 0, degreeId: "", degreeName: "", duration: "", graduation: "", department: "" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open Modal for Editing
  const handleEditClick = (degree: Degree) => {
    setFormData(degree);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Add or Update Degree
  const handleSave = () => {
    if (isEditing) {
      setDegrees(degrees.map((deg) => (deg.id === formData.id ? formData : deg)));
    } else {
      setDegrees([...degrees, { ...formData, id: degrees.length + 1 }]);
    }
    setIsModalOpen(false); // Close modal after saving
  };

  // Delete Degree
  const handleDelete = (id: number) => {
    setDegrees(degrees.filter((deg) => deg.id !== id));
  };

  // Filtered Degrees
  const filteredDegrees = degrees.filter(
    (deg) =>
      deg.degreeName.toLowerCase().includes(search.toLowerCase()) ||
      deg.degreeId.toLowerCase().includes(search.toLowerCase()) ||
      deg.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="dark:bg-gray-dark bg-white px-4 py-2 rounded-xl">
        {/* Controls */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search degrees..."
            className="border p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddClick} // Open form when clicked
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add Degree
          </button>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Degree ID</th>
                <th className="px-6 py-3">Degree Name</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Graduation</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDegrees.map((deg, index) => (
                <tr key={deg.id} className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{deg.degreeId}</td>
                  <td className="px-6 py-4">{deg.degreeName}</td>
                  <td className="px-6 py-4">{deg.duration}</td>
                  <td className="px-6 py-4">{deg.graduation}</td>
                  <td className="px-6 py-4">{deg.department}</td>
                  <td className="px-6 py-4 flex gap-x-2">
                    <button
                      onClick={() => handleEditClick(deg)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(deg.id)}
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

        {/* Modal - Only shows when isModalOpen is true */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit Degree" : "Add Degree"}</h2>
              <p className="mb-2">Degree ID</p>
              <input
                type="text"
                name="degreeId"
                // placeholder="Degree ID"
                className="block w-full p-2 border rounded mb-2"
                value={formData.degreeId}
                onChange={handleChange}
              />
    <p className="mb-2">Degree Name</p>
              <input
                type="text"
                name="degreeName"
                // placeholder="Degree Name"
                className="block w-full p-2 border rounded mb-2"
                value={formData.degreeName}
                onChange={handleChange}
              />
              <p className="mb-2">Degree Name</p>
              <input
                type="text"
                name="duration"
                // placeholder="Duration"
                className="block w-full p-2 border rounded mb-2"
                value={formData.duration}
                onChange={handleChange}
              />
              <p className="mb-2">Degree Name</p>
              <input
                type="text"
                name="graduation"
                // placeholder="Graduation (UG/PG)"
                className="block w-full p-2 border rounded mb-2"
                value={formData.graduation}
                onChange={handleChange}
              />
              <select
                name="department"
                className="block w-full p-2 border rounded mb-2"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button onClick={handleCloseModal} className="bg-gray-400 text-white px-4 py-2 rounded">
                  Cancel
                </button>
                <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

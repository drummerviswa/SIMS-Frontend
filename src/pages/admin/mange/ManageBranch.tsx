import { useState } from "react";

// Interface for Branch
interface Branch {
  id: number;
  branchId: string;
  branchName: string;
  degree: string;
}

// Mock Degrees
const degrees = ["BSc Computer Science", "BSc Mathematics", "BSc Physics", "BCom Accounting"];

export default function ManageBranches() {
  const [branches, setBranches] = useState<Branch[]>([
    { id: 1, branchId: "CS101-AI", branchName: "Artificial Intelligence", degree: "BSc Computer Science" },
  ]);

  const [formData, setFormData] = useState<Branch>({
    id: 0,
    branchId: "",
    branchName: "",
    degree: "",
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
    setFormData({ id: 0, branchId: "", branchName: "", degree: "" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open Modal for Editing
  const handleEditClick = (branch: Branch) => {
    setFormData(branch);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Add or Update Branch
  const handleSave = () => {
    if (isEditing) {
      setBranches(branches.map((br) => (br.id === formData.id ? formData : br)));
    } else {
      setBranches([...branches, { ...formData, id: branches.length + 1 }]);
    }
    setIsModalOpen(false); // Close modal after saving
  };

  // Delete Branch
  const handleDelete = (id: number) => {
    setBranches(branches.filter((br) => br.id !== id));
  };

  // Filtered Branches
  const filteredBranches = branches.filter(
    (br) =>
      br.branchName.toLowerCase().includes(search.toLowerCase()) ||
      br.branchId.toLowerCase().includes(search.toLowerCase()) ||
      br.degree.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="dark:bg-gray-dark bg-white px-4 py-2 rounded-xl">
        {/* Controls */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search branches..."
            className="border p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddClick} // Open form when clicked
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add Branch
          </button>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Branch ID</th>
                <th className="px-6 py-3">Branch Name</th>
                <th className="px-6 py-3">Degree</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((br, index) => (
                <tr key={br.id} className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{br.branchId}</td>
                  <td className="px-6 py-4">{br.branchName}</td>
                  <td className="px-6 py-4">{br.degree}</td>
                  <td className="px-6 py-4 flex gap-x-2">
                    <button
                      onClick={() => handleEditClick(br)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(br.id)}
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
              <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit Branch" : "Add Branch"}</h2>
              <p className="mb-2">Branch ID</p>
              <input
                type="text"
                name="branchId"
                // placeholder="Branch ID"
                className="block w-full p-2 border rounded mb-2"
                value={formData.branchId}
                onChange={handleChange}
              />
              <p className="mb-2">Branch Name </p>
              <input
                type="text"
                name="branchName"
                // placeholder="Branch Name"
                className="block w-full p-2 border rounded mb-2"
                value={formData.branchName}
                onChange={handleChange}
              />
              
              <select 
                name="degree"
                className="block w-full p-2 border rounded mb-2"
                value={formData.degree}
                onChange={handleChange}
              >
                <option value="">Select Degree</option>
                {degrees.map((deg) => (
                  <option key={deg} value={deg}>
                    {deg}
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

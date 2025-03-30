/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import API from "../../utils/API";
import { IoIosRefresh } from "react-icons/io";

interface Column {
  key: string;
  label: string;
}
interface Entity {
  [key: string]: any;
}
interface InputOption {
  key: string;
  label: string;
  type: "text" | "select" | "date" | "email" | "number";
  fetchEndpoint?: string;
  fetchKey?: string;
  selectLabel?: string[];
  selectMultiple?: boolean;
}

interface ManageEntityProps {
  entityName: string;
  apiEndpoint: string;
  columns: Column[];
  initialState: Entity;
  inputOptions: InputOption[];
  uniqueKey: string;
}

export default function ManageEntity({
  entityName,
  apiEndpoint,
  columns,
  initialState,
  inputOptions,
  uniqueKey, // Destructure uniqueKey
}: ManageEntityProps) {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [formData, setFormData] = useState<Entity>(initialState);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState<{
    [key: string]: { value: any; label: any }[];
  }>({});

  useEffect(() => {
    // Fetch entities from backend
    const fetchEntities = async () => {
      try {
        const response = await API.get(apiEndpoint);
        setEntities(response.data);
      } catch (error) {
        //Manage 404 error
        if (error?.response?.status === 404) {
          console.error(`No ${entityName.toLowerCase()}s found.`);
          setEntities([]); // Set entities to empty array if not found
        }
        // Handle other errors
        else
          console.error(`Error fetching ${entityName.toLowerCase()}s:`, error);
      }
    };
    // Fetch dropdown options for select fields
    const fetchDropdownOptions = async () => {
      const newOptions: { [key: string]: { value: any; label: string }[] } = {};
    
      for (const input of inputOptions) {
        if (input.type === "select" && input.fetchEndpoint) {
          try {
            const response = await API.get(input.fetchEndpoint);
            console.log(`Fetched data for ${input.fetchEndpoint}:`, response.data);
    
            if (!Array.isArray(response.data)) {
              console.error(`Invalid data format for ${input.fetchEndpoint}`, response.data);
              return;
            }
    
            newOptions[input.key] = response.data.map((item: any) => ({
              value: item[input.fetchKey], // Ensure deptid exists in API response
              label: input.selectLabel
                ? input.selectLabel.map((key: string) => item[key]).join(" | ")
                : item[input.fetchKey],
            }));
    
            console.log("Processed dropdown options:", newOptions[input.key]);
          } catch (error) {
            console.error(`Error fetching options for ${input.label}:`, error);
          }
        }
      }
    
      setOptions(newOptions);
    };    

    fetchEntities();
    fetchDropdownOptions();
  }, [apiEndpoint, entityName, inputOptions, uniqueKey, isEditing]);
  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e?.target?.name]: e?.target?.value });
  };
  // Handle Form Submit
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await API.put(`${apiEndpoint}/${formData[uniqueKey]}`, formData);
      } else {
        await API.post(apiEndpoint, formData);
      }
      setIsModalOpen(false);
      setFormData(initialState);
      setIsEditing(false);
      // Refresh entities after adding/editing
      const response = await API.get(apiEndpoint);
      setEntities(response.data);
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "adding"} ${entityName}:`,
        error
      );
    }
  };
  return (
    <div>
      <div className="dark:bg-gray-dark bg-white px-4 py-2 rounded-xl">
        {/* Add / Search Controls */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder={`Search ${entityName.toLowerCase()}s...`}
            className="border p-2 rounded text-gray-500 dark:text-gray-400 dark:bg-gray-800 border-none outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              setFormData(initialState);
              setIsModalOpen(true);
              setIsEditing(false);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add {entityName}
          </button>
        </div>
        {/* Refresh button which retrieves new entries */}
        <button
          type="button"
          onClick={async () => {
            try {
              const response = await API.get(apiEndpoint);
              setEntities(response.data);
            } catch (error) {
              console.error(
                `Error fetching ${entityName.toLowerCase()}s:`,
                error
              );
            }
          }}
          className=" text-white font-bold py-2 px-4 rounded"
        >
          <IoIosRefresh />
        </button>
        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg no-scrollbar">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-25 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                {columns?.map((col) => (
                  <th key={col?.key} className="px-6 py-3">
                    {col?.label}
                  </th>
                ))}
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {entities?.length > 0 ? (
                entities?.map((ent) => (
                  <tr
                    key={ent[uniqueKey]} // Use uniqueKey here
                    className="bg-white border-b dark:border-b-0 dark:bg-gray-800 hover:bg-gray-50"
                  >
                    {columns?.map((col) => (
                      <td key={col?.key} className="px-6 py-4">
                        {ent[col?.key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 flex gap-x-2">
                      <button
                        onClick={() => {
                          setFormData(ent);
                          setIsModalOpen(true);
                          setIsEditing(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setEntities(
                            entities?.filter(
                              (e) => e[uniqueKey] !== ent[uniqueKey]
                            ) // Use uniqueKey here
                          )
                        }
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b dark:border-b-0 dark:bg-gray-800 hover:bg-gray-50">
                  <td
                    colSpan={columns?.length + 1}
                    className="text-center py-4"
                  >
                    No {entityName?.toLowerCase()}s found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="max-w-[500px] m-4"
        >
          <div className="relative w-full max-w-full p-4 max-h-[85vh] overflow-y-auto bg-white rounded-3xl dark:bg-gray-900 lg:p-8 no-scrollbar">
            <h2 className="text-lg font-bold mb-4 p-4 text-gray-800 dark:text-white">
              {isEditing ? `Edit ${entityName}` : `Add ${entityName}`}
            </h2>
            <div className="px-4">
              {inputOptions?.map((input) => (
                <div key={input?.key}>
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                    {input?.label}
                  </p>
                  {input?.type === "select" ? (
                    <select
                      name={input?.key}
                      className="block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white"
                      value={formData?.[input?.key] || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select {input?.label}</option>
                      {options[input?.key]?.map((opt) => (
                        <option key={opt?.value} value={opt.value}>
                          {opt?.label}
                        </option>
                      ))}
                    </select>
                  ) : input?.type === "date" ? (
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        id="datepicker-actions"
                        datepicker-buttons
                        datepicker-autoselect-today
                        type="date"
                        className="ps-10 block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white"
                        placeholder="Select date"
                      />
                    </div>
                  ) : input?.type === "email" ? (
                    <input
                      type="email"
                      name={input.key}
                      className="block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white"
                      value={formData[input?.key]}
                      onChange={handleChange}
                    />
                  ) : input?.type === "number" ? (
                    <input
                      type="number"
                      name={input?.key}
                      className="block [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white"
                      value={formData[input?.key]}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type="text"
                      name={input?.key}
                      className="block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white"
                      value={formData[input?.key]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 px-4 pb-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
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

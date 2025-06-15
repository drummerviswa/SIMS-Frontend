/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import API from "../../utils/API";
import moment from "moment";
import { IoIosRefresh } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Column {
  key: string;
  label: string;
  fetchKey?: string;
  render?: (value: any) => string | number;
}
interface Entity {
  [key: string]: any;
}

interface InputOption {
  key: string;
  label: string;
  type: "text" | "select" | "date" | "email" | "number" | "textarea";
  fetchEndpoint?: string;
  fetchKey?: string;
  selectLabel?: string[];
  selectMultiple?: boolean;
  static?: boolean;
  options?: { key: string | number; label: string | number }[];
  dependencies?: { key: string; label: string }[];
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
  uniqueKey,
}: ManageEntityProps) {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [formData, setFormData] = useState<Entity>(initialState);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState<{
    [key: string]: { value: any; label: any; raw: any }[];
  }>({});

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await API.get(apiEndpoint);
        setEntities(response.data);
      } catch (error) {
        if (error?.response?.status === 404) {
          setEntities([]);
        } else {
          toast.error(`Error fetching ${entityName.toLowerCase()}s`);
          console.error(`Error fetching ${entityName.toLowerCase()}s:`, error);
        }
      }
    };

    const fetchDropdownOptions = async () => {
      const newOptions: {
        [key: string]: { value: any; label: string; raw: any }[];
      } = {};

      for (const input of inputOptions) {
        if (input.type === "select" && input.fetchEndpoint) {
          try {
            const response = await API.get(input.fetchEndpoint);
            if (!Array.isArray(response.data)) return;

            newOptions[input.key] = response.data.map((item: any) => ({
              value: item[input.fetchKey],
              label: input.selectLabel
                ? input.selectLabel.map((key: string) => item[key]).join(" | ")
                : item[input.fetchKey],
              raw: item,
            }));
          } catch (error) {
            toast.error(`Error fetching options for ${input.label}`);
            console.error(`Error fetching options for ${input.label}:`, error);
          }
        }
      }
      setOptions(newOptions);
    };

    fetchEntities();
    fetchDropdownOptions();
  }, [apiEndpoint, entityName, inputOptions, uniqueKey, isEditing]);

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    const newValue =
      type === "date" ? moment(value).format("YYYY-MM-DD") : value;
    let newFormData = { ...formData, [name]: newValue };

    const input = inputOptions.find((input) => input.key === name);
    if (!input) return;
    if (input.dependencies?.length > 0) {
      input.dependencies.forEach(async (dep) => {
        newFormData = { ...newFormData, [dep.key]: "" };

        try {
          const response = await API.get(input.fetchEndpoint);
          input.dependencies.forEach((dep) => {
            newFormData[dep.key] = response.data[0][dep.label];
          });
        } catch (err) {
          toast.error(`Failed to fetch dependencies for ${input.label}`);
          console.error(`Failed to fetch dependencies for ${input.label}`, err);
        }
      });
    }

    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    try {
      const formattedData: Entity = { ...formData };

      inputOptions.forEach((input) => {
        if (input.type === "date" && formattedData[input.key]) {
          formattedData[input.key] = moment(formattedData[input.key]).format(
            "YYYY-MM-DD"
          );
        }
      });

      if (isEditing) {
        await API.put(`${apiEndpoint}/${formData[uniqueKey]}`, formattedData);
        toast.info(`${entityName} updated successfully`);
      } else {
        await API.post(apiEndpoint, formattedData);
        toast.success(`${entityName} added successfully`);
      }

      setIsModalOpen(false); // Close modal BEFORE refetching data
      setFormData(initialState);
      setIsEditing(false);

      const response = await API.get(apiEndpoint);
      setEntities(response.data);
    } catch (error) {
      setIsModalOpen(false); // 👈 Ensure modal closes on error
      toast.error(
        ` ${
          error.response?.data?.error ||
          `Error ${isEditing ? "updating" : "adding"} ${entityName}` ||
          error.response?.data?.message
        }`
      );
      console.error(
        `Error ${isEditing ? "updating" : "adding"} ${entityName}:`,
        error
      );
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const response = await API.get(`${apiEndpoint}/${id}`);
      setFormData(response.data);
      setIsEditing(true);
      setIsModalOpen(true);
      toast.info(`${entityName} updated successfully`);
    } catch (error) {
      toast.error(
        ` ${
          error.response?.data?.error ||
          `Error fetching ${entityName} with ID ${id}` ||
          error.response?.data?.message
        }`
      );
      console.error(`Error fetching ${entityName} with ID ${id}:`, error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await API.delete(`${apiEndpoint}/${id}`);
      setEntities(entities.filter((entity) => entity[uniqueKey] !== id));
      toast.error(`${entityName} deleted successfully`);
    } catch (error) {
      toast.error(
        `${error.response?.data?.error || `Error deleting ${entityName}`}` ||
          error.response?.data?.message
      );
      console.error(`Error deleting ${entityName} with ID ${id}:`, error);
    }
  };

  const filteredEntities = entities?.filter((entity) =>
    Object.values(entity).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="dark:bg-gray-dark bg-white px-4 py-2 rounded-xl">
      <ToastContainer
        draggable
        closeOnClick
        position="top-right"
        autoClose={3000}
        newestOnTop
        toastClassName="dark:bg-gray-800 dark:text-white shadow-lg !mt-16 !z-[99999]"
      />

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder={`Search ${entityName.toLowerCase()}s...`}
          className="p-2 rounded text-gray-500 dark:text-gray-400 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <button
        type="button"
        onClick={async () => {
          try {
            const response = await API.get(apiEndpoint);
            setEntities(response.data);
          } catch (error) {
            toast.error(`Error fetching ${entityName.toLowerCase()}s`);
            console.error(
              `Error fetching ${entityName.toLowerCase()}s:`,
              error
            );
          }
        }}
        className="text-white font-bold py-2 px-4 rounded"
      >
        <IoIosRefresh className="text-gray-600" />
      </button>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg no-scrollbar">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 dark:text-gray-25 uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns?.map((col) => (
                <th key={col?.key} className="px-6 py-3 text-nowrap">
                  {col?.label}
                </th>
              ))}
              <th className="px-6 py-3 text-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntities?.length > 0 ? (
              filteredEntities.map((ent) => (
                <tr
                  key={ent[uniqueKey]}
                  className="bg-white border-b dark:border-b-0 dark:bg-gray-800 hover:bg-gray-50"
                >
                  {columns?.map((col) => (
                    <td key={col?.key} className="px-6 py-4 text-nowrap">
                      {col?.label.includes("date") ||
                      col?.label.includes("Date")
                        ? moment(
                            ent[col?.fetchKey ? col?.fetchKey : col?.key]
                          ).format("DD-MM-YYYY")
                        : ent[col?.fetchKey ? col?.fetchKey : col?.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 flex gap-x-2">
                    <button
                      onClick={() => handleUpdate(ent[uniqueKey])}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ent[uniqueKey])}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b dark:border-b-0 dark:bg-gray-800 hover:bg-gray-50">
                <td colSpan={columns?.length + 1} className="text-center py-4">
                  No {entityName?.toLowerCase()}s found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
                  !input.static ? (
                    <select
                      name={input?.key}
                      className="block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white bg-gray-100 border outline-blue-500 focus:outline-blue-500"
                      value={formData?.[input?.key] ?? ""}
                      onChange={handleChange}
                    >
                      <option key={""} value="">
                        Select {input?.label}
                      </option>
                      {options[input?.key]?.map((opt) => (
                        <option key={opt?.value} value={opt.value}>
                          {opt?.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      name={input?.key}
                      className="block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white bg-gray-100 border outline-blue-500 focus:outline-blue-500"
                      value={formData?.[input?.key] ?? ""}
                      onChange={handleChange}
                      multiple={input?.selectMultiple}
                    >
                      {input?.options?.map((opt) => (
                        <option key={opt?.key} value={opt.key}>
                          {opt?.label}
                        </option>
                      ))}
                    </select>
                  )
                ) : input.type === "date" ? (
                  <input
                    type={input.type}
                    name={input.key}
                    value={
                      formData?.[input?.key]
                        ? moment(formData[input.key]).format("YYYY-MM-DD")
                        : ""
                    }
                    onChange={handleChange}
                    className="block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white bg-gray-100 border outline-blue-500 focus:outline-blue-500"
                  />
                ) : input.type === "textarea" ? (
                  <textarea
                    name={input.key}
                    value={formData?.[input?.key] ?? ""}
                    onChange={handleChange}
                    className="block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white bg-gray-100 border outline-blue-500 focus:outline-blue-500"
                  ></textarea>
                ) : (
                  <input
                    type={input.type}
                    name={input.key}
                    value={formData?.[input?.key] ?? ""}
                    onChange={handleChange}
                    className="block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white bg-gray-100 border outline-blue-500 focus:outline-blue-500"
                  />
                )}
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2.5"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

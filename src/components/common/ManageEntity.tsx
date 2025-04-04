/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import API from "../../utils/API";
import moment from "moment";
import { IoIosRefresh } from "react-icons/io";

interface Column {
  key: string;
  label: string;
  fetchKey?: string;
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
  static?: boolean;
  options?: { key: string; label: string }[];
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
    [key: string]: { value: any; label: any }[];
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
          console.error(`Error fetching ${entityName.toLowerCase()}s:`, error);
        }
      }
    };

    const fetchDropdownOptions = async () => {
      const newOptions: { [key: string]: { value: any; label: string }[] } = {};

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
            }));
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "date" ? moment(value).format("YYYY-MM-DD") : value, // Ensure correct date format
    });
  };

  const handleSubmit = async () => {
    try {
      const formattedData: Entity = { ...formData };

      // Ensure all date fields are in the correct format before sending
      inputOptions.forEach((input) => {
        if (input.type === "date" && formattedData[input.key]) {
          formattedData[input.key] = moment(formattedData[input.key]).format(
            "YYYY-MM-DD"
          );
        }
      });

      if (isEditing) {
        await API.put(`${apiEndpoint}/${formData[uniqueKey]}`, formattedData);
      } else {
        await API.post(apiEndpoint, formattedData);
      }
      setIsModalOpen(false);
      setFormData(initialState);
      setIsEditing(false);
      const response = await API.get(apiEndpoint);
      setEntities(response.data);
    } catch (error) {
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
    } catch (error) {
      console.error(`Error fetching ${entityName} with ID ${id}:`, error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await API.delete(`${apiEndpoint}/${id}`);
      setEntities(entities.filter((entity) => entity[uniqueKey] !== id));
    } catch (error) {
      console.error(`Error deleting ${entityName} with ID ${id}:`, error);
    }
  };

  const filteredEntities = entities?.filter((entity) =>
    Object.values(entity).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );
  console.log("formData", formData);

  return (
    <div className="dark:bg-gray-dark bg-white px-4 py-2 rounded-xl">
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
            console.error(
              `Error fetching ${entityName.toLowerCase()}s:`,
              error
            );
          }
        }}
        className="text-white font-bold py-2 px-4 rounded"
      >
        <IoIosRefresh />
      </button>

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
            {filteredEntities?.length > 0 ? (
              filteredEntities.map((ent) => (
                <tr
                  key={ent[uniqueKey]}
                  className="bg-white border-b dark:border-b-0 dark:bg-gray-800 hover:bg-gray-50"
                >
                  {columns?.map((col) => (
                    <td key={col?.key} className="px-6 py-4">
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
                      className="block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white"
                      value={formData?.[input?.key] || ""}
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
                      className="block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white"
                      value={formData?.[input?.key] || ""}
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
                    className="block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white"
                  />
                ) : (
                  <input
                    type={input.type}
                    name={input.key}
                    value={formData?.[input?.key] || ""}
                    onChange={handleChange}
                    className="block w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white"
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

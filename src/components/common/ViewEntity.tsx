/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import API from "../../utils/API";
import { IoIosRefresh } from "react-icons/io";

interface Column {
  key: string;
  label: string;
}
interface Entity {
  [key: string]: any;
}
interface ManageEntityProps {
  entityName: string;
  apiEndpoint: string;
  columns: Column[];
  initialState: Entity;
  uniqueKey: string;
}

export default function ViewEntity({
  entityName,
  apiEndpoint,
  columns,
  initialState,
  uniqueKey,
}: ManageEntityProps) {
  const [entities, setEntities] = useState<Entity[]>([initialState]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // fetchEntities();
    // fetchDropdownOptions();
  }, []);

  // Fetch entities from backend
  const fetchEntities = async () => {
    try {
      const response = await API.get(apiEndpoint);
      setEntities(response.data);
    } catch (error) {
      console.error(`Error fetching ${entityName.toLowerCase()}s:`, error);
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
          className=" text-white font-bold py-2 px-4 rounded"
        >
          <IoIosRefresh />
        </button>
        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg no-scrollbar">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-25 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-6 py-3">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entities.map((ent, index) => (
                <tr
                  key={ent[uniqueKey]} // Use uniqueKey here
                  className="bg-white border-b dark:border-b-0 dark:bg-gray-800 hover:bg-gray-50"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4">
                      {ent[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

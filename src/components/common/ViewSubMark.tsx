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

export default function ViewSubMark({
  entityName,
  apiEndpoint,
  columns,
  initialState,
  uniqueKey,
}: ManageEntityProps) {
  const [entities, setEntities] = useState<Entity[]>([initialState]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEntities();
  }, [apiEndpoint]);

  const fetchEntities = async () => {
    try {
      const response = await API.get(apiEndpoint);
      setEntities(response.data);
    } catch (error) {
      console.error(`Error fetching ${entityName.toLowerCase()}s:`, error);
    }
  };

  const flattenEntities = () => {
    return entities
      .filter(
        (ent) =>
          ent.regNo?.toString().includes(search) ||
          ent.sName?.toLowerCase().includes(search.toLowerCase())
      )
      .flatMap((ent) =>
        ent.mainSplitups.flatMap((main: any) =>
          main.subSplitups.length > 0
            ? main.subSplitups.map((sub: any, j: number) => ({
                regNo: ent.regNo,
                sName: ent.sName,
                criteriaName: main.criteriaName,
                mainWeightage: main.mainWeightage,
                subCriteria: sub.subCriteria,
                enteredMark: sub.enteredMark,
                subWeightage: sub.subWeightage,
                isLocked: sub.isLocked,
              }))
            : [
                {
                  regNo: ent.regNo,
                  sName: ent.sName,
                  criteriaName: main.criteriaName,
                  mainWeightage: main.mainWeightage,
                  subCriteria: "—",
                  enteredMark: "—",
                  subWeightage: "—",
                  isLocked: false,
                },
              ]
        )
      );
  };

  const flattenedData = flattenEntities();

  return (
    <div>
      <div className="dark:bg-gray-dark bg-white px-4 py-2 rounded-xl">
        {/* Search and Refresh */}
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
            onClick={fetchEntities}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full ml-2"
          >
            <IoIosRefresh size={20} />
          </button>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg no-scrollbar">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-200 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-6 py-3">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flattenedData.map((row: any, index: number) => (
                <tr
                  key={`${row.regNo}-${index}`}
                  className="bg-white border-b dark:border-b-0 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 align-top">
                      {col.key === "enteredMark"
                        ? `${row.enteredMark} / ${row.subWeightage}${
                            row.isLocked ? " 🔒" : ""
                          }`
                        : row[col.key]}
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

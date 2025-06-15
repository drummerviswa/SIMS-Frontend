import React, { useState } from "react";
import { FaUnlock, FaLock } from "react-icons/fa";
import { FaSortUp, FaSortDown } from "react-icons/fa";

export default function CombinedMarksTable({ rawMarks, regulation }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  if (!rawMarks || rawMarks.length === 0) return <p>No marks available.</p>;

  const shouldShowRow = (subCriteria) => {
    return !(regulation !== "R2023" && subCriteria.toLowerCase().includes("assignment"));
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortedData = (data) => {
    const filtered = data.filter((row) => shouldShowRow(row.subCriteria));
    if (!sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      const valA = a[sortConfig.key] ?? "";
      const valB = b[sortConfig.key] ?? "";

      if (typeof valA === "number" && typeof valB === "number") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }

      return sortConfig.direction === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="space-y-8">
      {rawMarks.map((item, idx) => (
        <div key={idx} className="overflow-x-auto">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
            {item.tenure === "assess1"
              ? "Assessment 1"
              : item.tenure === "assess2"
              ? "Assessment 2"
              : "Final Exam"}
          </h2>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {[
                  { label: "Reg No", key: "regNo" },
                  { label: "Name", key: "studentName" },
                  { label: "Sub-Criteria", key: "subCriteria" },
                  { label: "Weightage", key: "subWeightage" },
                  { label: "Mark", key: "enteredMark" },
                ].map(({ label, key }) => (
                  <th
                    key={key}
                    className="px-4 py-2 text-left cursor-pointer text-gray-900 dark:text-gray-400"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center gap-1">
                      {label}
                      {renderSortIcon(key)}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-400">Lock</th>
              </tr>
            </thead>
            <tbody>
              {getSortedData(item.StudentMarksBreakdown).map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="bg-white dark:bg-gray-900 border-b dark:border-gray-700"
                >
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-400">{row.regNo}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-400">{row.studentName}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-400">{row.subCriteria}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-400">{row.subWeightage}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-400">
                    {row.enteredMark ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-400">
                    {row.isLocked ? <FaLock size={18} /> : <FaUnlock size={18} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

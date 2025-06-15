import React from "react";

export default function TotalMarksTable({ marks, regulation }) {
  if (!marks || marks.length === 0) return <p>No marks available.</p>;

  const showAssignment = regulation === "R2023";

  return (
    <div className="overflow-x-auto my-4">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
        Overall
      </h2>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-400">
              Reg No
            </th>
            <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-400">
              Name
            </th>
            <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-400">
              Assessment 1
            </th>
            <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-400">
              Assessment 2
            </th>
            {showAssignment && (
              <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-400">
                Assignment
              </th>
            )}
            <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-400">
              Total Marks
            </th>
          </tr>
        </thead>
        <tbody>
          {marks.map((row, idx) => (
            <tr
              key={idx}
              className="bg-white dark:bg-gray-900 border-b dark:border-gray-700"
            >
              <td className="px-4 py-2 text-gray-900 dark:text-gray-400">
                {row.regNo}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-400">
                {row.studentName}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-400">
                {row.assess1Marks}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-400">
                {row.assess2Marks}
              </td>
              {showAssignment && (
                <td className="px-4 py-2 text-gray-900 dark:text-gray-400">
                  {row.assignmentMarks}
                </td>
              )}
              <td className="px-4 py-2 text-gray-900 dark:text-gray-400">
                {row.totalMarks}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

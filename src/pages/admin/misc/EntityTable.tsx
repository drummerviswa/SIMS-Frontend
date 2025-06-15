import React, { useEffect, useState } from "react";
import PDFDownloadButton from "./PDFDownloadButton";
import API from "../../../utils/API";

const typeToEndpoint = {
  Department: "departments",
  Faculty: "faculties",
  Student: "students",
  Regulation: "regulations",
  Subject: "subjects",
  Branch: "branches",
  Degree: "degrees",
  Batch: "batches",
  Grievance: "grievances",
  Mark: "marks",
};

export default function EntityTable({ type }) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const endpoint = typeToEndpoint[type] || `${type.toLowerCase()}s`;

    API.get(`/report/${endpoint}`)
      .then((res) => {
        const contentType =
          res.headers["content-type"] || res.headers["Content-Type"];
        if (!res.status || res.status >= 400) {
          throw new Error(`API returned status ${res.status}`);
        }
        if (contentType && contentType.includes("application/json")) {
          return res.data;
        } else {
          throw new Error(
            `Expected JSON response but received content-type: ${contentType}`
          );
        }
      })
      .then((data) => {
        setRows(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [type]);

  if (loading) return <div>Loading {type} report...</div>;
  if (error)
    return (
      <div>
        Failed to fetch data for <strong>{type}</strong>. <br />
        Error: {error}
      </div>
    );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{type} Report</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">PDF</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No {type.toLowerCase()} data found.
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              // Dynamically pick id and name keys since backend may have different fields
              const id = row.id || row.deptid || row.facid || row.regNo;
              const name =
                row.name ||
                row.deptName ||
                row.facName ||
                row.sName ||
                row.batchName;
              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{id}</td>
                  <td className="border px-4 py-2">{name}</td>
                  <td className="border px-4 py-2 text-center">
                    <PDFDownloadButton type={type} id={id} />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import API from "../../../utils/API";

function PDFDownloadButton({ type, id }) {
  const baseURL = import.meta.env.VITE_API_URL as string;
  const handleDownload = () => {
    const url = `${baseURL}/report/pdf/${type.toLowerCase()}/${id}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
    >
      Download
    </button>
  );
}

function EntityTable({ type }) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get(`/report/${type.toLowerCase()}s`)
      .then((res) => setRows(res.data))
      .catch((err) => setError(err.message));
  }, [type]);

  if (error)
    return (
      <div>
        Failed to load {type} report: {error}
      </div>
    );

  return (
    <div>
      <h2 className="text-xl font-semibold mt-8 mb-4">{type} Report</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">PDF</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="border px-2 py-1">{row.id}</td>
              <td className="border px-2 py-1">{row.name}</td>
              <td className="border px-2 py-1">
                <PDFDownloadButton type={type} id={row.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminReports() {
  const [departmentData, setDepartmentData] = useState([]);
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      API.get("/report/departments"),
      API.get("/report/facultys"),
      API.get("/report/students"),
    ])
      .then(([depRes, facRes]) => {
        setDepartmentData(depRes.data);
        setFacultyData(facRes.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading charts...</div>;
  if (error) return <div>Error loading reports: {error}</div>;

  // Example chart for departments: count each department as 1
  const depSeries = [
    { name: "Departments", data: departmentData.map(() => 1) },
  ];
  const depOptions = {
    chart: { id: "department-chart" },
    xaxis: { categories: departmentData.map((d) => d.name) },
  };

  // Example chart for faculties similarly
  const facSeries = [{ name: "Facultys", data: facultyData.map(() => 1) }];
  const facOptions = {
    chart: { id: "facultys-chart" },
    xaxis: { categories: facultyData.map((f) => f.name) },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Reports Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Department Chart</h2>
        <Chart
          options={depOptions}
          series={depSeries}
          type="bar"
          height={300}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Faculty Chart</h2>
        <Chart
          options={facOptions}
          series={facSeries}
          type="bar"
          height={300}
        />
      </section>

      <EntityTable type="Department" />
      <EntityTable type="Faculty" />
      <EntityTable type="Student" />
      {/* Add more EntityTable components for Students, Batches, etc. */}
    </div>
  );
}

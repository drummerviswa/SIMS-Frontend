import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function SummaryCharts({ data }) {
  if (!data.departments) return <p>Loading charts...</p>;

  const chartData = [
    { name: "Departments", value: data.departments },
    { name: "Faculties", value: data.faculties },
    { name: "Students", value: data.students },
    { name: "Subjects", value: data.subjects },
  ];

  return (
    <PieChart width={400} height={300}>
      <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
        {chartData.map((entry, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

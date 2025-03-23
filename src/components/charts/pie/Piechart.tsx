import Chart from "react-apexcharts";

const PieChart = () => {
  const options = {
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: "bottom"
        }
      }
    }]
  };

  const series = [44, 55, 13, 43, 22]; // Data values

  return (
    <div className="col-span-6">
      <Chart options={options} series={series} type="pie" width={400} />
    </div>
  );
};

export default PieChart;

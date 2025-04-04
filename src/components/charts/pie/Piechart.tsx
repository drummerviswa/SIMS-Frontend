import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type

interface ChartdataProps {
  chartdata?: {
    labels: string[];
    series: number[];
  };
}

const PieChart = ({ chartdata }: ChartdataProps) => {
  const options: ApexOptions = {
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    colors: ["#FF4560", "#008FFB", "#00E396", "#775DD0", "#FFE3B3"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        colors: ["#000000"],
      },
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "14px",
        fontFamily: "Outfit, sans-serif",
      },
      x: {
        show: true,
      },
      y: {
        formatter: (val: number) => val.toString(),
      },
    },
    chart: {
      fontFamily: "Outfit, sans-serif",
      width: "100%",
    },
    legend: {
      show: true,
      position: "right", // Ensure it's a valid string literal type
      fontSize: "14px",
      labels: {
        colors: ["#000000"],
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 350,
            width: 275,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 350,
            height: 350,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: 400,
            height: 400,
          },
          legend: {
            position: "right",
          },
        },
      },
      {
        breakpoint: 1280,
        options: {
          chart: {
            width: 400,
            height: 400,
          },
          legend: {
            position: "right",
          },
        },
      },
      {
        breakpoint: 1536,
        options: {
          chart: {
            width: 400,
            height: 400,
          },
          legend: {
            position: "right",
          },
        },
      },
      {
        breakpoint: 1920,
        options: {
          chart: {
            width: 400,
            height: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [44, 55, 13, 43, 22];

  return (
    <div className="lg:col-span-6 col-span-1">
      <Chart options={options} series={series} type="pie" width="100%" />
    </div>
  );
};

export default PieChart;

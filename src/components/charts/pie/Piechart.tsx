import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type

interface PiechartProps { // Renamed from ChartdataProps for clarity
  title: string; // Added a title prop
  chartData: { // Renamed from chartdata to chartData for consistency
    labels: string[];
    series: number[];
  };
  colors?: string[]; // Allow custom colors
}

const DEFAULT_COLORS = ["#008FFB", "#00E396", "#FFBF00", "#FF4560", "#775DD0", "#00E396", "#FF9800", "#FF7799"]; // Expanded default colors

const Piechart = ({ title, chartData, colors = DEFAULT_COLORS }: PiechartProps) => {
  // Fallback if chartData is not provided or empty
  if (!chartData || !chartData.labels || chartData.labels.length === 0 || !chartData.series || chartData.series.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px] bg-white dark:bg-gray-800 rounded shadow p-4">
        <p className="text-gray-500 dark:text-gray-400">No data available for this chart.</p>
      </div>
    );
  }

  const options: ApexOptions = {
    labels: chartData.labels,
    colors: colors, // Use prop colors or default
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "10px",
        colors: ["#ffffff"],
        fontFamily: "Outfit, sans-serif",
        fontWeight: 500, // Changed data label color for better contrast on colored slices
      },
      dropShadow: { // Added drop shadow for better readability
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.45
      }
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "14px",
        
        fontFamily: "Outfit, sans-serif",
      },
      y: {
        formatter: (val: number) => `${val.toLocaleString()} items`, // More descriptive tooltip
      },
    },
    chart: {
      fontFamily: "Outfit, sans-serif",
      width: "100%",
    },
    legend: {
      show: true,
      position: "bottom", // Usually better for space on smaller screens
      fontSize: "14px",
      labels: {
        colors: ["#374151"], // Dark gray for text in light mode
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    title: { // Add title to ApexCharts options
      text: title,
      align: 'left',
      margin: 20,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize:  '18px',
        fontWeight: 'bold',
        fontFamily: "Outfit, sans-serif",
        color:  '#111827' // Dark gray
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 280, // Slightly smaller for very small screens
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
            width: '100%', // Take full width
            height: 320,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1024, // On larger screens, put legend on right if preferred
        options: {
          chart: {
            width: '100%',
            height: 350,
          },
          legend: {
            position: "right",
          },
        },
      },
    ],
  };

  // Dark mode adjustments for text colors
  if (document.documentElement.classList.contains('dark')) {
    options.dataLabels.style.colors = ["#ffffff"];
    options.legend.labels.colors = ["#cbd5e1"]; // Light gray for text in dark mode
    options.title.style.color = '#e2e8f0'; // Lighter gray for title in dark mode
    options.tooltip.theme = "dark"; // Ensure tooltip theme is dark
  } else {
     options.dataLabels.style.colors = ["#374151"]; // Dark gray for text in light mode
     options.legend.labels.colors = ["#374151"];
     options.title.style.color = '#374151';
     options.tooltip.theme = "light"; // Ensure tooltip theme is light
  }


  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 lg:col-span-6 col-span-1 min-h-[350px] flex flex-col justify-between"> {/* Added min-h and flex for consistent sizing */}
      <Chart options={options} series={chartData.series} type="pie" width="100%" height="auto" />
    </div>
  );
};

export default Piechart;
import PageMeta from "../../components/common/PageMeta";
// Ensure this path is correct if you've moved ShowcaseCard to a 'common' folder
import ShowcaseCard from "../../components/ecommerce/ShowcaseCard";
import Piechart from "../../components/charts/pie/Piechart";
// ComponentCard is not strictly needed as Piechart handles its own card styling
// import ComponentCard from "../../components/common/ComponentCard";
import { GroupIcon } from "../../icons"; // Assuming GroupIcon exists in your /icons directory
import { useEffect, useState, useCallback } from "react";
import { FaSchoolFlag } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import { Link } from "react-router"; // Corrected import for react-router-dom Link

import API from "../../utils/API";

// Define interface for count API responses
interface CountResponse {
  length: number; // Assuming the API returns an array, and we take its length
}

export default function AdminHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [countStudents, setCountStudents] = useState(0);
  const [countFaculty, setCountFaculty] = useState(0);
  const [countDepartment, setCountDepartment] = useState(0);
  const [countDegrees, setCountDegrees] = useState(0);

  // Static dummy data for charts - replace with actual API calls when ready
  const staticStudentsByDepartment = {
    labels: [
      "Computer Science",
      "Information Tech",
      "Electronics",
      "Mechanical",
      "Civil",
    ],
    series: [1250, 900, 550, 700, 450], // Example student counts
  };

  const staticFacultyByDepartment = {
    labels: [
      "Computer Science",
      "Information Tech",
      "Electronics",
      "Mechanical",
      "Civil",
    ],
    series: [50, 35, 20, 25, 18], // Example faculty counts
  };

  const staticDegreesByType = {
    labels: ["B.E", "B.Tech","M.E", "M.Tech", "M.Sc Int", "Ph.D", "M.Sc"],
    series: [2800, 450, 180, 600, 300], // Example degree enrollment counts
  };

  // --- Data Fetching Logic (Only for counts, charts use static data now) ---
  const fetchCounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [studentsRes, facultyRes, departmentRes, degreesRes] =
        await Promise.all([
          API.get<CountResponse[]>("admin/manage/student"),
          API.get<CountResponse[]>("admin/manage/faculty"),
          API.get<CountResponse[]>("admin/manage/department"),
          API.get<CountResponse[]>("admin/manage/degree"),
        ]);

      setCountStudents(studentsRes.data.length);
      setCountFaculty(facultyRes.data.length);
      setCountDepartment(departmentRes.data.length);
      setCountDegrees(degreesRes.data.length);
    } catch (err) {
      // Explicitly type err as 'any' or 'AxiosError'
      console.error("Failed to fetch dashboard counts:", err);
      setError("Failed to load dashboard counts. Please try again.");
      // Set counts to 0 on error
      setCountStudents(0);
      setCountFaculty(0);
      setCountDepartment(0);
      setCountDegrees(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Loading your admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Admin Dashboard | College Management System"
        description="Comprehensive administration dashboard for managing college data."
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, {JSON.parse(localStorage.getItem("admin")).name}!
        </h1>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 dark:bg-red-900 dark:text-red-100">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => setError(null)}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.197l-2.651 2.652a1.2 1.2 0 1 1-1.697-1.697L8.303 10 5.651 7.348a1.2 1.2 0 0 1 1.697-1.697L10 8.303l2.651-2.652a1.2 1.2 0 0 1 1.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      {/* Key Metrics Section */}
      <section className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              title: "Total Students",
              icon: (
                <GroupIcon className="text-blue-500 size-6 dark:text-blue-400" />
              ),
              count: countStudents,
              link: "/admin/manage/student",
            },
            {
              title: "Total Faculty",
              icon: (
                <GiTeacher className="text-green-500 size-6 dark:text-green-400" />
              ),
              count: countFaculty,
              link: "/admin/manage/faculty",
            },
            {
              title: "Departments",
              icon: (
                <FaSchoolFlag className="text-purple-500 size-6 dark:text-purple-400" />
              ),
              count: countDepartment,
              link: "/admin/manage/department",
            },
            {
              title: "Academic Degrees",
              icon: (
                <IoSchool className="text-orange-500 size-6 dark:text-orange-400" />
              ),
              count: countDegrees,
              link: "/admin/manage/degree",
            },
          ].map((item, index) => (
            <Link to={item.link} key={index}>
              <ShowcaseCard
                icon={item.icon}
                title={item.title}
                count={item.count}
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Key Distributions
        </h2>
        {/* Using Flexbox to keep charts side-by-side */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-around items-stretch">
          <div className="flex-1 min-w-0">
            {" "}
            {/* Wrapper to allow shrinking */}
            <Piechart
              title="Students by Department"
              chartData={staticStudentsByDepartment}
            />
          </div>
          <div className="flex-1 min-w-0">
            {" "}
            {/* Wrapper to allow shrinking */}
            <Piechart
              title="Faculty by Department"
              chartData={staticFacultyByDepartment}
            />
          </div>
          <div className="flex-1 min-w-0">
            {" "}
            {/* Wrapper to allow shrinking */}
            <Piechart title="Degrees Offered" chartData={staticDegreesByType} />
          </div>
        </div>
      </section>
      {/* You can add more sections here, e.g., Recent Activity, Statistics Charts etc. */}
    </>
  );
}

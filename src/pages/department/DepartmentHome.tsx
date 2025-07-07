import PageMeta from "../../components/common/PageMeta";
import ShowcaseCard from "../../components/ecommerce/ShowcaseCard";
import Piechart from "../../components/charts/pie/Piechart"; // Using common Piechart

import { useEffect, useState, useCallback } from "react";
// Icons similar to AdminHome, but potentially adapted for department context
import { GroupIcon } from "../../icons"; // For students
import { GiTeacher } from "react-icons/gi"; // For faculty
import { FaBookOpen } from "react-icons/fa"; // For courses
import { IoSchool } from "react-icons/io5"; // For academic programs/degrees within department

import { Link } from "react-router"; // Correct import for react-router-dom Link

import API from "../../utils/API"; // Your API utility

// Define interface for count API responses (assuming a similar structure to AdminHome)
interface CountResponse {
  length: number; // For array length-based counts
}

// You might define an interface for aggregated data if you plan to fetch it later
// interface AggregatedData {
//   label: string;
//   value: number;
// }

export default function DepartmentHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Department-specific counts (will fetch from mock API or be static for now)
  const [countDepartmentStudents, setCountDepartmentStudents] = useState(0);
  const [countDepartmentFaculty, setCountDepartmentFaculty] = useState(0);
  const [countDepartmentCourses, setCountDepartmentCourses] = useState(0);
  const [countDepartmentPrograms, setCountDepartmentPrograms] = useState(0); // E.g., UG, PG programs in dept

  // Static dummy data for charts - mirrors the AdminHome pattern
  const staticStudentStatusData = {
    labels: ["Active", "On Leave", "Graduated (This Year)", "Withdrawn"],
    series: [1200, 50, 150, 20], // Example breakdown for students in this department
  };

  const staticFacultyRolesData = {
    labels: ["Professors", "Associate Profs", "Assistant Profs", "Lecturers"],
    series: [10, 15, 20, 5], // Example breakdown for faculty roles in this department
  };

  const staticCourseTypeData = {
    labels: ["Core", "Elective", "Lab", "Seminar"],
    series: [40, 25, 15, 5], // Example breakdown of course types in this department
  };

  // --- Data Fetching Logic (Only for counts, charts use static data now) ---
  const fetchDepartmentCounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // These API calls are MOCKS/placeholders for department-specific endpoints.
      // In a real app, these would likely be /department/{id}/students, /department/{id}/faculty, etc.
      // For now, they use a mock API or your existing admin ones if they return a 'length'.
      const [
        studentsRes,
        facultyRes,
        coursesRes,
        programsRes,
      ] = await Promise.all([
        // Mocking API responses for department context.
        // In reality, these would be specific to *this* department.
        API.get<CountResponse[]>("mock/department/students"), // Simulating a department-specific endpoint
        API.get<CountResponse[]>("mock/department/faculty"),
        API.get<CountResponse[]>("mock/department/courses"),
        API.get<CountResponse[]>("mock/department/programs"),
      ]);

      setCountDepartmentStudents(studentsRes.data.length > 0 ? studentsRes.data.length : 1420); // Dummy count
      setCountDepartmentFaculty(facultyRes.data.length > 0 ? facultyRes.data.length : 50);     // Dummy count
      setCountDepartmentCourses(coursesRes.data.length > 0 ? coursesRes.data.length : 85);     // Dummy count
      setCountDepartmentPrograms(programsRes.data.length > 0 ? programsRes.data.length : 4);   // Dummy count

    } catch (err: any) { // Explicitly type err for TypeScript
      console.error("Failed to fetch department dashboard counts:", err);
      setError("Failed to load department counts. Please try again.");
      // Set counts to 0 on error
      setCountDepartmentStudents(0);
      setCountDepartmentFaculty(0);
      setCountDepartmentCourses(0);
      setCountDepartmentPrograms(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartmentCounts();
  }, [fetchDepartmentCounts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Loading your department dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Department Dashboard | SIMS - Student Information Management System"
        description="Comprehensive dashboard for managing department-specific student, faculty, and course data."
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, Department Head!
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

      {/* --- Key Department Metrics Section (Like AdminHome's Overview) --- */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Department Snapshot
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              title: "Total Students",
              icon: (
                <GroupIcon className="text-blue-500 size-6 dark:text-blue-400" />
              ),
              count: countDepartmentStudents,
              link: "/department/manage/students", // Department-specific links
            },
            {
              title: "Total Faculty",
              icon: (
                <GiTeacher className="text-green-500 size-6 dark:text-green-400" />
              ),
              count: countDepartmentFaculty,
              link: "/department/manage/faculty",
            },
            {
              title: "Active Courses",
              icon: (
                <FaBookOpen className="text-yellow-500 size-6 dark:text-yellow-400" />
              ),
              count: countDepartmentCourses,
              link: "/department/manage/courses",
            },
            {
              title: "Academic Programs",
              icon: (
                <IoSchool className="text-purple-500 size-6 dark:text-purple-400" />
              ),
              count: countDepartmentPrograms,
              link: "/department/manage/programs",
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

      {/* --- Department Charts Section (Like AdminHome's Key Distributions) --- */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Key Department Distributions
        </h2>
        {/* Force all 3 charts into a single row, adapting from AdminHome's pattern */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Piechart
            title="Student Status Breakdown"
            chartData={staticStudentStatusData}
          />
          <Piechart
            title="Faculty Roles"
            chartData={staticFacultyRolesData}
          />
          <Piechart
            title="Course Types"
            chartData={staticCourseTypeData}
          />
        </div>
      </section>

      {/* You can add more sections here, e.g., a list of recent grades, upcoming events */}
    </>
  );
}
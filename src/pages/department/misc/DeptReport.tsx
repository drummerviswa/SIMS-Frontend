import React, { useEffect, useState, useCallback } from "react";
import API from "../../../utils/API"; // Adjust path as needed
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { utils, writeFile } from "xlsx";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from "recharts";

// --- COMMON UI COMPONENTS / HELPERS (Can be moved to a shared folder) ---
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6B6B"];

interface CardButtonProps {
  label: string;
  onClick: () => void;
  active?: boolean;
}

const CardButton: React.FC<CardButtonProps> = React.memo(({ label, onClick, active = false }) => (
  <div
    className={`bg-white dark:bg-gray-800 border hover:border-blue-500 hover:shadow-md cursor-pointer p-4 rounded text-center w-full md:w-64 transition-all ${
      active ? "border-blue-500 shadow-md" : "border-gray-200 dark:border-gray-700"
    }`}
    onClick={onClick}
  >
    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{label}</h4>
  </div>
));


interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = React.memo(({ title, value, icon = null }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center hover:shadow-md transition-shadow">
    {icon && <div className="text-2xl mb-2">{icon}</div>}
    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h3>
    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{value}</p>
  </div>
));

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  tooltipFormatter?: (value: any, name: string, props: any) => [string | number, string];
}

const ChartContainer: React.FC<ChartContainerProps> = React.memo(({ title, children, className = "", tooltipFormatter }) => (
  <div className={`mb-8 ${className}`}>
    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
    <div className="bg-white dark:bg-gray-800 shadow rounded p-4 hover:shadow-md transition-shadow">
      <ResponsiveContainer width="100%" height={300}>
        {children}
        {tooltipFormatter && <Tooltip formatter={tooltipFormatter} />}
      </ResponsiveContainer>
    </div>
  </div>
));

interface ExportButtonsProps {
  data: any[];
  filename: string;
  reportId: string;
  disabled?: boolean;
}

const ExportButtons: React.FC<ExportButtonsProps> = React.memo(({ data, filename, reportId, disabled = false }) => (
  <div className="flex gap-4 justify-end mb-6">
    <button
      onClick={() => downloadPDF(reportId)}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors"
      disabled={disabled}
    >
      Download PDF
    </button>
    <button
      onClick={() => exportToExcel(data, filename)}
      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400 transition-colors"
      disabled={disabled}
    >
      Export Excel
    </button>
  </div>
));

// Utility functions for PDF/Excel
const downloadPDF = async (id: string) => {
  const input = document.getElementById(id);
  if (!input) return;

  const canvas = await html2canvas(input, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
  pdf.save(`${id}-report.pdf`);
};

const exportToExcel = (data: any[], filename: string) => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Report");
  writeFile(wb, `${filename}-${new Date().toISOString().slice(0, 10)}.xlsx`);
};

// --- TYPE DEFINITIONS ---
interface StoredDepartment {
  deptid: string;
  deptName: string;
}

interface SimplifiedDepartmentData {
  department: {
    deptid: string;
    deptName: string;
  };
  totalStudents: number;
  totalFaculty: number;
  totalCourses: number;
  performanceTrend: Array<{ semester: string; average: number; collegeAverage: number }>;
  gradeDistribution: Array<{ grade: string; count: number }>;
  averageDepartmentCGPA?: string;
}

interface Faculty {
  facid: string;
  facName: string;
  deptName?: string;
}

interface FacultyData {
  faculty: Faculty;
  currentCourses: Array<{ subName: string; students: number; batch?: string }>;
  evaluations: Array<{ subName: string; avgMark?: number; avgRating?: number }>;
  averageRating?: string;
  performanceTrend: Array<{ semester: string; avgRating: number; departmentAvg: number }>;
}

interface Student {
  regNo: string;
  sName: string;
  batchName: string;
  branchName: string;
  degName: string;
  cgpa?: string;
  departmentName?: string;
}

interface StudentCourse {
  subName: string;
  facName: string;
  assess1: number;
  assess2: number;
  endsem: number;
  total: number;
  grade: string;
}

interface StudentData {
  student: Student;
  currentSemester: StudentCourse[];
  attendance: Array<{ subName: string; percentage: number }>;
  performanceTrend: Array<{ semester: string; average: number; batchAverage: number }>;
  gradeDistribution: Array<{ grade: string; count: number }>;
}

// --- DEPTREPORT COMPONENT ---
export default function DeptReport() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loggedInDepartment, setLoggedInDepartment] = useState<StoredDepartment | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview"); // 'overview', 'students', 'faculty'

  // Overview states
  const [departmentOverviewData, setDepartmentOverviewData] = useState<SimplifiedDepartmentData | null>(null);

  // Student states
  const [studentReg, setStudentReg] = useState<string>("");
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [studentError, setStudentError] = useState<string | null>(null);

  // Faculty states
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(null);
  const [facultyData, setFacultyData] = useState<FacultyData | null>(null);
  const [facultyListError, setFacultyListError] = useState<string | null>(null);


  // --- General Data Fetching Utility ---
  const fetchData = useCallback(async <T,>(url: string, setter: React.Dispatch<React.SetStateAction<T | null>>, onErrorCallback?: () => void) => {
    setLoading(true);
    setError(null); // Clear general errors
    try {
      const res = await API.get<T>(url);
      setter(res.data);
    } catch (err: any) {
      setError("Failed to fetch data.");
      console.error(err);
      setter(null);
      onErrorCallback();
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Initial Load: Get Logged-in Department from LocalStorage ---
  useEffect(() => {
    const storedDept = localStorage.getItem("department");
    if (storedDept) {
      try {
        const parsedDept: StoredDepartment = JSON.parse(storedDept);
        if (parsedDept && parsedDept.deptid && parsedDept.deptName) {
          setLoggedInDepartment(parsedDept);
          // Auto-fetch overview data when component loads and dept is known
          fetchData<SimplifiedDepartmentData>(`/reports/department?id=${parsedDept.deptid}`, setDepartmentOverviewData);
        } else {
          setError("Invalid department data in your login session. Please re-login.");
          setLoggedInDepartment(null);
          setLoading(false);
        }
      } catch (e) {
        console.error("Error parsing department from localStorage:", e);
        setError("Could not read your department session. Please re-login.");
        setLoggedInDepartment(null);
        setLoading(false);
      }
    } else {
      setError("No department found in your login session. Please ensure you are logged in correctly.");
      setLoggedInDepartment(null);
      setLoading(false);
    }
  }, [fetchData]); // Dependency ensures this runs once or if fetchData changes


  // --- Navigation between tabs ---
  const navigateToTab = useCallback((tab: string) => {
    setActiveTab(tab);
    // Reset specific nested states when switching tabs
    setError(null); // Clear general error
    setStudentError(null); // Clear student error
    setFacultyListError(null); // Clear faculty list error
    setSelectedFacultyId(null); // Clear selected faculty
    setFacultyData(null); // Clear faculty data
    setStudentData(null); // Clear student data
    setStudentReg(""); // Clear student reg number
  }, []);


  // --- Student Section Logic ---
  const fetchStudentByRegNo = useCallback(async () => {
    if (!studentReg) {
      setStudentError("Please enter a student registration number.");
      return;
    }
    if (!/^\d{10}$/.test(studentReg)) {
      setStudentError("Registration number must be 10 digits.");
      return;
    }
    if (!loggedInDepartment?.deptid) {
        setStudentError("Department not identified. Cannot fetch student data.");
        return;
    }

    setLoading(true);
    setStudentError(null);
    try {
      // NOTE: The backend's /reports/student/:id endpoint doesn't currently filter by department ID.
      // If this is a security concern (department users seeing students from other departments),
      // the backend query in getStudentReport would need to be updated to include the department check.
      const res = await API.get<StudentData>(`/reports/student/${studentReg}`);
      
      // Basic client-side check for department match (for display purposes, not security)
      if (res.data.student.departmentName !== loggedInDepartment.deptName) {
        setStudentError(`Student ${studentReg} does not belong to ${loggedInDepartment.deptName}.`);
        setStudentData(null);
      } else {
        setStudentData(res.data);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
          setStudentError("Student not found for the given registration number.");
      } else {
          setStudentError("Failed to fetch student report. Please try again.");
      }
      setStudentData(null);
    } finally {
      setLoading(false);
    }
  }, [studentReg, loggedInDepartment]);


  // --- Faculty Section Logic ---
  const fetchFacultyList = useCallback(async () => {
    if (!loggedInDepartment?.deptid) {
        setFacultyListError("Department not identified. Cannot fetch faculty list.");
        setLoading(false);
        return;
    }
    setLoading(true);
    setFacultyListError(null);
    try {
      // Assuming this endpoint exists and returns faculty for a given department
      const res = await API.get<Faculty[]>(`/admin/manage/faculty/department/${loggedInDepartment.deptid}`);
      setFacultyList(res.data);
    } catch (err) {
      setFacultyListError("Failed to fetch faculty list for your department.");
      setFacultyList([]);
      console.error("Error fetching faculty list:", err);
    } finally {
      setLoading(false);
    }
  }, [loggedInDepartment]);

  const fetchFacultyReport = useCallback(async (facId: string) => {
    setLoading(true);
    setError(null); // Use general error for individual faculty fetch
    try {
      const res = await API.get<FacultyData>(`/reports/faculty/${facId}`);
      setFacultyData(res.data);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
          setError("Faculty report not found.");
      } else {
          setError("Failed to fetch faculty report. Please try again.");
      }
      setFacultyData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger faculty list fetch when activeTab is 'faculty' and no faculty is selected
  useEffect(() => {
    if (activeTab === "faculty" && !selectedFacultyId && loggedInDepartment) {
      fetchFacultyList();
    }
  }, [activeTab, selectedFacultyId, loggedInDepartment, fetchFacultyList]);

  // Trigger individual faculty report fetch when selectedFacultyId changes
  useEffect(() => {
    if (selectedFacultyId && !facultyData) { // Only fetch if ID set and data not loaded
      fetchFacultyReport(selectedFacultyId);
    }
  }, [selectedFacultyId, facultyData, fetchFacultyReport]);


  // Display nothing or a loading spinner until initial department check is done
  if (loading && !loggedInDepartment && !error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
          <p className="text-lg">Loading your department session...</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-screen-xl mx-auto dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        {loggedInDepartment?.deptName ? `Department Dashboard: ${loggedInDepartment.deptName}` : "Department Dashboard"}
      </h1>

      {/* General Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error}</span>
          <button className="absolute top-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            &times;
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      {loggedInDepartment && ( // Only show tabs if a department is successfully loaded
        <div className="flex flex-wrap gap-4 mb-8">
          {["overview", "students", "faculty"].map((tab) => (
            <CardButton
              key={tab}
              label={tab.charAt(0).toUpperCase() + tab.slice(1)}
              onClick={() => navigateToTab(tab)}
              active={activeTab === tab}
            />
          ))}
        </div>
      )}

      {/* --- OVERVIEW SECTION --- */}
      {activeTab === "overview" && loggedInDepartment && departmentOverviewData && (
        <div id="department-overview-content">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Overview for {departmentOverviewData.department.deptName}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Students" value={departmentOverviewData.totalStudents} />
            <StatCard title="Total Faculty" value={departmentOverviewData.totalFaculty} />
            <StatCard title="Total Courses" value={departmentOverviewData.totalCourses} />
            {departmentOverviewData.averageDepartmentCGPA && (
              <StatCard title="Average CGPA (Proxy)" value={departmentOverviewData.averageDepartmentCGPA} />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartContainer title="Department Performance Over Semesters">
              <LineChart data={departmentOverviewData.performanceTrend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis domain={[0, 100]} />
                <Legend />
                <Line type="monotone" dataKey="average" stroke="#00C49F" name="Department Average" />
                <Line type="monotone" dataKey="collegeAverage" stroke="#FFBB28" name="College Average" />
              </LineChart>
            </ChartContainer>

            <ChartContainer title="Department-wide Grade Distribution">
              <PieChart>
                <Pie
                  data={departmentOverviewData.gradeDistribution || []}
                  dataKey="count"
                  nameKey="grade"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {(departmentOverviewData.gradeDistribution || []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Students/Subjects"]} />
                <Legend />
              </PieChart>
            </ChartContainer>
          </div>

          <ExportButtons
            data={[
              {
                "Department Name": departmentOverviewData.department.deptName,
                "Total Students": departmentOverviewData.totalStudents,
                "Total Faculty": departmentOverviewData.totalFaculty,
                "Total Courses": departmentOverviewData.totalCourses,
                "Average Department CGPA (Proxy)": departmentOverviewData.averageDepartmentCGPA
              },
              ...(departmentOverviewData.performanceTrend?.map(p => ({
                "Semester": p.semester,
                "Department Average": p.average,
                "College Average": p.collegeAverage
              })) || []),
              ...(departmentOverviewData.gradeDistribution?.map(g => ({
                "Grade": g.grade,
                "Count": g.count
              })) || [])
            ]}
            filename={`department_overview_${departmentOverviewData.department.deptName.replace(/\s+/g, '_')}`}
            reportId="department-overview-content"
            disabled={loading}
          />
        </div>
      )}

      {activeTab === "overview" && loggedInDepartment && !departmentOverviewData && !loading && !error && (
        <p className="text-gray-600 dark:text-gray-400 mt-4">No overview data available for your department.</p>
      )}

      {/* --- STUDENTS SECTION --- */}
      {activeTab === "students" && loggedInDepartment && (
        <div className="py-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Search Student in {loggedInDepartment.deptName}</h2>
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Enter Student Register Number:</label>
                <input
                  type="text"
                  className="border p-2 rounded w-64 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={studentReg}
                  onChange={(e) => setStudentReg(e.target.value)}
                  placeholder="Enter 10-digit Reg No"
                />
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={fetchStudentByRegNo}
                disabled={loading}
              >
                {loading ? "Fetching..." : "Fetch Student Report"}
              </button>
            </div>
            {studentError && <p className="text-red-600 mt-2">{studentError}</p>}
          </div>

          {studentData && (
            <div id="student-report-content"> {/* ID for PDF export */}
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Report for {studentData.student.sName} ({studentData.student.regNo})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard title="Name" value={studentData.student.sName} />
                <StatCard title="Register No" value={studentData.student.regNo} />
                <StatCard title="Batch" value={studentData.student.batchName} />
                <StatCard title="CGPA" value={studentData.student.cgpa || 'N/A'} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartContainer title="Current Semester Marks">
                  <BarChart data={studentData.currentSemester || []}>
                    <XAxis dataKey="subName" />
                    <YAxis domain={[0, 100]} />
                    <Legend />
                    <Bar dataKey="assess1" stackId="a" fill="#8884d8" name="Assessment 1" />
                    <Bar dataKey="assess2" stackId="a" fill="#82ca9d" name="Assessment 2" />
                    <Bar dataKey="endsem" stackId="a" fill="#ffc658" name="End Sem" />
                  </BarChart>
                </ChartContainer>

                <ChartContainer title="Attendance Percentage">
                  <BarChart data={studentData.attendance || []}>
                    <XAxis dataKey="subName" />
                    <YAxis domain={[0, 100]} />
                    <Legend />
                    <Bar dataKey="percentage" fill="#FF8042" name="Attendance %" />
                  </BarChart>
                </ChartContainer>
              </div>

              <ChartContainer title="Performance Trend (Average Marks)">
                <LineChart data={studentData.performanceTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis domain={[0, 100]} />
                  <Legend />
                  <Line type="monotone" dataKey="average" stroke="#0088FE" name="Your Average" />
                  <Line type="monotone" dataKey="batchAverage" stroke="#00C49F" name="Batch Average" />
                </LineChart>
              </ChartContainer>

              <ChartContainer title="Grade Distribution" className="mb-12">
                <PieChart>
                  <Pie
                    data={studentData.gradeDistribution || []}
                    dataKey="count"
                    nameKey="grade"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {(studentData.gradeDistribution || []).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Courses"]} />
                  <Legend />
                </PieChart>
              </ChartContainer>

              <ExportButtons
                data={[
                  ...(studentData.currentSemester?.map(s => ({
                    "Subject": s.subName,
                    "Assessment 1": s.assess1,
                    "Assessment 2": s.assess2,
                    "End Semester": s.endsem,
                    "Total Marks": s.total,
                    "Grade": s.grade
                  })) || []),
                  ...(studentData.attendance?.map(a => ({
                    "Subject": a.subName,
                    "Attendance Percentage": a.percentage
                  })) || []),
                  ...(studentData.performanceTrend?.map(p => ({
                    "Semester": p.semester,
                    "Your Average": p.average,
                    "Batch Average": p.batchAverage
                  })) || [])
                ]}
                filename={`student_${studentData.student.regNo}`}
                reportId="student-report-content"
                disabled={loading}
              />
            </div>
          )}
        </div>
      )}

      {/* --- FACULTY SECTION --- */}
      {activeTab === "faculty" && loggedInDepartment && (
        <div className="py-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Faculty in {loggedInDepartment.deptName}</h2>

          {!selectedFacultyId && ( // Show list of faculty if none is selected
            <>
              {facultyListError && <p className="text-red-600 mb-4">{facultyListError}</p>}
              {facultyList.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {facultyList.map((faculty) => (
                    <CardButton
                      key={faculty.facid}
                      label={faculty.facName}
                      onClick={() => setSelectedFacultyId(faculty.facid)}
                    />
                  ))}
                </div>
              ) : (
                !loading && <p className="text-gray-600 dark:text-gray-400">No faculty found in your department.</p>
              )}
            </>
          )}

          {selectedFacultyId && facultyData && ( // Show individual faculty report
            <div id="faculty-report-content"> {/* ID for PDF export */}
              <button
                onClick={() => { setSelectedFacultyId(null); setFacultyData(null); setError(null); }}
                className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ← Back to Faculty List
              </button>

              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Report for {facultyData.faculty.facName}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard title="Faculty" value={facultyData?.faculty?.facName} />
                <StatCard title="Department" value={facultyData?.faculty?.deptName || 'N/A'} />
                <StatCard title="Courses Teaching" value={facultyData?.currentCourses?.length} />
                <StatCard title="Average Rating" value={`${facultyData?.averageRating || 'N/A'}/5`} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartContainer title="Courses Taught (Current)">
                  <BarChart data={facultyData.currentCourses || []}>
                    <XAxis dataKey="subName" />
                    <YAxis />
                    <Legend />
                    <Bar dataKey="students" fill="#8884d8" name="Students" />
                  </BarChart>
                </ChartContainer>

                <ChartContainer title="Student Evaluations">
                  <BarChart data={facultyData.evaluations || []}>
                    <XAxis dataKey="subName" />
                    <YAxis domain={[0, 5]} />
                    <Legend />
                    <Bar dataKey="avgRating" fill="#FFBB28" name="Average Rating" />
                  </BarChart>
                </ChartContainer>
              </div>

              <ChartContainer title="Performance Over Time">
                <LineChart data={facultyData.performanceTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis domain={[0, 5]} />
                  <Legend />
                  <Line type="monotone" dataKey="avgRating" stroke="#FF8042" name="Your Average Rating" />
                  <Line type="monotone" dataKey="departmentAvg" stroke="#0088FE" name="Department Average Rating" />
                </LineChart>
              </ChartContainer>

              <ExportButtons
                data={[
                  ...(facultyData.currentCourses?.map(c => ({
                    "Course": c.subName,
                    "Students": c.students,
                    "Batch": c.batch || 'N/A'
                  })) || []),
                  ...(facultyData.evaluations?.map(e => ({
                    "Course": e.subName,
                    "Average Rating": e.avgRating || 'N/A',
                    "Average Marks (Proxy)": e.avgMark || 'N/A'
                  })) || [])
                ]}
                filename={`faculty_${facultyData.faculty.facName.replace(/\s+/g, '_')}`}
                reportId="faculty-report-content"
                disabled={loading}
              />
            </div>
          )}
        </div>
      )}

      {/* Message if no department is logged in */}
      {!loggedInDepartment && !loading && (
        <p className="text-red-600 dark:text-red-400 mt-8 text-center text-lg">
          No department information found. Please ensure you are logged in as a department user.
        </p>
      )}
    </div>
  );
}
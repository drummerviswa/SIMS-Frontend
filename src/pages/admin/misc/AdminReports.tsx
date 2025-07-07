import React, { useEffect, useState, useCallback } from "react";
import API from "../../../utils/API";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { utils, writeFile } from "xlsx";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from "recharts";

// --- UPDATED TYPE DEFINITIONS ---
interface Breadcrumb {
  type: string;
  id: string;
  label: string;
}

interface Department {
  deptid: string;
  deptName: string;
}

interface Faculty {
  facid: string;
  facName: string;
  deptName?: string; // Added as backend now returns it
}

interface Student {
  regNo: string;
  sName: string;
  batchName: string;
  branchName: string;
  degName: string;
  cgpa?: string; // Added for new CGPA calculation
  departmentName?: string; // Added from backend
}

interface OverallData {
  totals: {
    students: number;
    faculty: number;
    departments: number;
    courses: number;
  };
  studentsByDept: Array<{ department: string; count: number }>;
  facultyByDept: Array<{ department: string; count: number }>; // Added for new backend data
  courses: Array<{ course: string; students: number }>;
  deptPerformance: Array<{ department: string; average: number }>;
}

interface DepartmentData {
  department: {
    deptid: string;
    deptName: string;
  };
  students: Array<{ regNo: string; sName: string }>; // Updated to be more specific
  faculty: Array<{ facid: string; facName: string }>; // Updated to be more specific
  courses: Array<{ subid: string; subName: string }>; // Updated to be more specific
  performance: Array<{
    subName: string;
    averageMark: number;
    passPercentage: number; // Added for new backend data
  }>;
  batchEnrollment: Array<{ batch: string; students: number }>; // Added for new backend data
  performanceTrend: Array<{ semester: string; average: number; collegeAverage: number }>; // Added for new backend data
}

interface FacultyData {
  faculty: Faculty;
  currentCourses: Array<{ subName: string; students: number; batch?: string }>; // Renamed for clarity, added batch
  evaluations: Array<{ subName: string; avgMark?: number; avgRating?: number }>; // avgMark now optional, avgRating added
  averageRating?: string; // Now a string to match backend's toFixed(2)
  performanceTrend: Array<{ semester: string; avgRating: number; departmentAvg: number }>; // Added for new backend data
}

interface StudentCourse {
  subName: string;
  facName: string;
  assess1: number;
  assess2: number;
  endsem: number;
  total: number; // Added for calculated total marks
  grade: string; // Added for calculated grade
}

interface StudentData {
  student: Student;
  currentSemester: StudentCourse[]; // Renamed for clarity, reflects current semester only
  performanceTrend: Array<{ semester: string; average: number; batchAverage: number }>; // Added for new backend data
  gradeDistribution: Array<{ grade: string; count: number }>; // Added for new backend data
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6B6B"];

const AdminReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overall");
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [overallData, setOverallData] = useState<OverallData | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [departmentData, setDepartmentData] = useState<DepartmentData | null>(null);
  const [selectedFacultyDept, setSelectedFacultyDept] = useState<string | null>(null);
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(null);
  const [facultyData, setFacultyData] = useState<FacultyData | null>(null);
  const [studentReg, setStudentReg] = useState<string>("");
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [studentError, setStudentError] = useState<string | null>(null);

  // Navigation handlers
  const resetNestedStates = useCallback(() => {
    setSelectedDeptId(null);
    setDepartmentData(null);
    setSelectedFacultyDept(null);
    setFacultyList([]); // Ensure faculty list is cleared too
    setSelectedFacultyId(null);
    setFacultyData(null);
    setStudentReg("");
    setStudentData(null);
    setStudentError(null);
  }, []);

  const navigateToTab = useCallback((tab: string) => {
    setActiveTab(tab);
    setBreadcrumbs([{ type: 'tab', id: tab, label: tab.charAt(0).toUpperCase() + tab.slice(1) }]);
    resetNestedStates(); // Reset all specific selections when navigating to a new main tab
  }, [resetNestedStates]);

  const navigateToDept = useCallback((dept: Department) => {
    setActiveTab('department');
    setBreadcrumbs([
      { type: 'tab', id: 'department', label: 'Department' },
      { type: 'department', id: dept.deptid, label: dept.deptName }
    ]);
    setSelectedDeptId(dept.deptid);
    setDepartmentData(null); // Clear previous data
    // Reset other specific selections
    setSelectedFacultyDept(null);
    setFacultyList([]);
    setSelectedFacultyId(null);
    setFacultyData(null);
    setStudentReg("");
    setStudentData(null);
  }, []);

  const navigateToFacultyDept = useCallback((dept: Department) => {
    setActiveTab('faculty');
    setBreadcrumbs([
      { type: 'tab', id: 'faculty', label: 'Faculty' },
      { type: 'facultyDept', id: dept.deptid, label: dept.deptName }
    ]);
    setSelectedFacultyDept(dept.deptid);
    setFacultyList([]); // Clear previous faculty list
    setSelectedFacultyId(null); // Clear selected faculty
    setFacultyData(null); // Clear faculty data
    // Reset other specific selections
    setSelectedDeptId(null);
    setDepartmentData(null);
    setStudentReg("");
    setStudentData(null);
  }, []);

  const navigateToFaculty = useCallback((faculty: Faculty) => {
    setActiveTab('faculty');
    setBreadcrumbs(prev => {
      const baseBreadcrumbs = prev.filter(crumb => crumb.type === 'tab' || crumb.type === 'facultyDept');
      return [
        ...baseBreadcrumbs,
        { type: 'faculty', id: faculty.facid, label: faculty.facName }
      ];
    });
    setSelectedFacultyId(faculty.facid);
    setFacultyData(null); // Clear previous faculty data
    // Reset other specific selections
    setSelectedDeptId(null);
    setDepartmentData(null);
    setStudentReg("");
    setStudentData(null);
  }, []);

  const handleBreadcrumbClick = useCallback((crumb: Breadcrumb, index: number) => {
    if (index === breadcrumbs.length - 1) return;

    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);

    if (crumb.type === 'tab') {
      setActiveTab(crumb.id);
      resetNestedStates();
    } else if (crumb.type === 'department') {
      setActiveTab('department');
      setSelectedDeptId(crumb.id);
      setSelectedFacultyDept(null);
      setSelectedFacultyId(null);
      setStudentReg("");
      setStudentData(null);
    } else if (crumb.type === 'facultyDept') {
      setActiveTab('faculty');
      setSelectedFacultyDept(crumb.id);
      setSelectedFacultyId(null);
      setStudentReg("");
      setStudentData(null);
      setSelectedDeptId(null);
    } else if (crumb.type === 'faculty') {
      setActiveTab('faculty');
      setSelectedFacultyId(crumb.id);
      const facultyDeptCrumb = newBreadcrumbs.find(b => b.type === 'facultyDept');
      if (facultyDeptCrumb) {
        setSelectedFacultyDept(facultyDeptCrumb.id);
      } else {
        setSelectedFacultyDept(null);
      }
      setStudentReg("");
      setStudentData(null);
      setSelectedDeptId(null);
    } else if (crumb.type === 'student') {
      setActiveTab('student');
      setStudentReg(crumb.id);
      setSelectedDeptId(null);
      setSelectedFacultyDept(null);
      setSelectedFacultyId(null);
    }
  }, [breadcrumbs, resetNestedStates]);

  const handleBack = useCallback(() => {
    if (breadcrumbs.length > 1) {
      const prevCrumb = breadcrumbs[breadcrumbs.length - 2];
      handleBreadcrumbClick(prevCrumb, breadcrumbs.length - 2);
    } else {
      navigateToTab("overall");
    }
  }, [breadcrumbs, handleBreadcrumbClick, navigateToTab]);

  // Data fetching utility
  const fetchData = useCallback(async <T,>(url: string, setter: React.Dispatch<React.SetStateAction<T | null>>, onError?: () => void) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get<T>(url);
      setter(res.data);
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
      setter(null); // Clear data on error
      onError && onError(); // Execute custom error handler if provided
    } finally {
      setLoading(false);
    }
  }, []);

  // UseEffects for data fetching based on activeTab and selected IDs
  useEffect(() => {
    if (activeTab === "overall") {
      fetchData<OverallData>("/reports/overall", setOverallData);
    } else if (activeTab === "department" && !selectedDeptId) {
      // Fetch list of departments only if not viewing a specific department
      fetchData<Department[]>("/reports/departmentlist", setDepartments); // Updated route
    } else if (activeTab === "faculty" && !selectedFacultyDept && !selectedFacultyId) {
      // Fetch list of departments for faculty selection only if not viewing specific dept/faculty
      fetchData<Department[]>("/reports/departmentlist", setDepartments); // Updated route
    }
  }, [activeTab, selectedDeptId, selectedFacultyDept, selectedFacultyId, fetchData]);


  useEffect(() => {
    if (selectedDeptId) {
      fetchData<DepartmentData>(`/reports/department/${selectedDeptId}`, setDepartmentData);
    } else {
      setDepartmentData(null); // Clear data when no department is selected
    }
  }, [selectedDeptId, fetchData]);

  useEffect(() => {
    // Only fetch faculty list if a department is selected AND we're in the faculty tab, but no specific faculty is selected
    if (selectedFacultyDept && activeTab === 'faculty' && !selectedFacultyId) {
      fetchData<Faculty[]>(`/admin/manage/faculty/department/${selectedFacultyDept}`, setFacultyList); // Assuming this route still works or adjust
    } else {
      setFacultyList([]); // Clear list when no department is selected for faculty
    }
  }, [selectedFacultyDept, activeTab, selectedFacultyId, fetchData]);

  useEffect(() => {
    if (selectedFacultyId) {
      fetchData<FacultyData>(`/reports/faculty/${selectedFacultyId}`, setFacultyData);
    } else {
      setFacultyData(null); // Clear data when no faculty is selected
    }
  }, [selectedFacultyId, fetchData]);

  const fetchStudentByRegNo = useCallback(async (regNoToFetch?: string) => {
    const reg = regNoToFetch || studentReg;
    if (!/^\d{10}$/.test(reg)) {
      setStudentError("Registration number must be 10 digits.");
      setStudentData(null);
      return;
    }

    setLoading(true);
    setStudentError(null);
    try {
      const res = await API.get<StudentData>(`/reports/student/${reg}`);
      setStudentData(res.data);
      // Only update breadcrumbs if this function is called from the input, not a breadcrumb click
      const isCalledFromInput = !regNoToFetch;
      if (isCalledFromInput) {
        setBreadcrumbs([
          { type: 'tab', id: 'student', label: 'Student' },
          { type: 'student', id: reg, label: res.data.student.sName }
        ]);
      }
    } catch (err: any) { // Type the error as 'any' for simpler handling
      if (err.response && err.response.status === 404) {
          setStudentError("Student not found for the given registration number.");
      } else {
          setStudentError("Failed to fetch student report. Please try again.");
      }
      setStudentData(null);
    } finally {
      setLoading(false);
    }
  }, [studentReg]);

  useEffect(() => {
    if (activeTab === 'student' && !studentReg && studentData) {
      // If on student tab, but studentReg is cleared, clear studentData
      setStudentData(null);
      setStudentError(null);
    }
  }, [studentReg, activeTab, studentData, studentError, fetchStudentByRegNo]);


  // UI Components (Remain unchanged in their core structure)
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
    tooltipFormatter?: (value: any, name: string, props: any) => [string | number, string]; // Added for flexible tooltip formatting
  }

  const ChartContainer: React.FC<ChartContainerProps> = React.memo(({ title, children, className = "", tooltipFormatter }) => (
    <div className={`mb-8 ${className}`}>
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
      <div className="bg-white dark:bg-gray-800 shadow rounded p-4 hover:shadow-md transition-shadow">
        <ResponsiveContainer width="100%" height={300}>
          {children}
          {tooltipFormatter && <Tooltip formatter={tooltipFormatter} />} {/* Apply formatter if provided */}
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

  // Utility functions (Remain unchanged)
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

  return (
    <div className="p-6 max-w-screen-xl mx-auto dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Admin Reports Dashboard</h1>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="flex items-center mb-6 flex-wrap gap-2">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.id}>
              <span
                className={`cursor-pointer ${index === breadcrumbs.length - 1 ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:underline'}`}
                onClick={() => handleBreadcrumbClick(crumb, index)}
              >
                {crumb.label}
              </span>
              {index < breadcrumbs.length - 1 && <span className="mx-2 text-gray-400">/</span>}
            </React.Fragment>
          ))}
          {breadcrumbs.length > 1 && (
            <button
              onClick={handleBack}
              className="ml-4 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
          )}
        </div>
      )}

      {/* Loading and Error States */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
            <p className="text-lg">Loading data...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error}</span>
          <button className="absolute top-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}

      {/* Main Navigation Tabs */}
      {!selectedDeptId && !selectedFacultyDept && !selectedFacultyId && !studentData && (
        <div className="flex flex-wrap gap-4 mb-8">
          {["overall", "department", "faculty", "student"].map((tab) => (
            <CardButton
              key={tab}
              label={tab.charAt(0).toUpperCase() + tab.slice(1)}
              onClick={() => navigateToTab(tab)}
              active={activeTab === tab}
            />
          ))}
        </div>
      )}

      {/* Render content based on activeTab and selected IDs */}
      {activeTab === "overall" && overallData && (
        <div id="overall-report">
          {/* Overall Report content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Students" value={overallData.totals.students} />
            <StatCard title="Total Faculty" value={overallData.totals.faculty} />
            <StatCard title="Total Departments" value={overallData.totals.departments} />
            <StatCard title="Total Courses" value={overallData.totals.courses} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartContainer title="Students by Department">
              <PieChart>
                <Pie
                  data={overallData.studentsByDept || []}
                  dataKey="count"
                  nameKey="department"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {(overallData.studentsByDept || []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Students"]} />
                <Legend />
              </PieChart>
            </ChartContainer>

            <ChartContainer title="Faculty Distribution by Department">
              <PieChart>
                <Pie
                  data={overallData.facultyByDept || []}
                  dataKey="count"
                  nameKey="department"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {(overallData.facultyByDept || []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Faculty"]} />
                <Legend />
              </PieChart>
            </ChartContainer>
          </div>

          <ChartContainer title="Course Enrollments (Top 10)">
            <BarChart data={(overallData.courses || []).slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Legend />
              <Bar dataKey="students" fill="#8884d8" name="Enrollments (Batches)" />
            </BarChart>
          </ChartContainer>

          <ChartContainer title="Average Marks by Department">
            <LineChart data={overallData.deptPerformance || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis domain={[0, 100]} />
              <Legend />
              <Line type="monotone" dataKey="average" stroke="#82ca9d" name="Average Score" />
            </LineChart>
          </ChartContainer>

          <ExportButtons
            data={[
              ...overallData.studentsByDept?.map(d => ({ "Department": d.department, "Students": d.count })) || [],
              ...overallData.facultyByDept?.map(d => ({ "Department": d.department, "Faculty": d.count })) || [], // Export faculty data
              ...overallData.courses?.map(c => ({ "Course": c.course, "Enrollments": c.students })) || []
            ]}
            filename="overall_report"
            reportId="overall-report"
          />
        </div>
      )}

      {activeTab === "department" && (
        <>
          {!selectedDeptId && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {departments?.map((dept) => (
                <CardButton
                  key={dept?.deptid}
                  label={dept?.deptName}
                  onClick={() => navigateToDept(dept)}
                />
              ))}
            </div>
          )}

          {selectedDeptId && departmentData && (
            <div id="department-report">
              {/* Department Report content */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard title="Department" value={departmentData?.department?.deptName} />
                <StatCard title="Students" value={departmentData?.students?.length} />
                <StatCard title="Faculty" value={departmentData?.faculty?.length} />
                <StatCard title="Courses" value={departmentData?.courses?.length} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartContainer title="Subject Performance">
                  <BarChart data={departmentData.performance || []}>
                    <XAxis dataKey="subName" />
                    <YAxis domain={[0, 100]} />
                    <Legend />
                    <Bar dataKey="averageMark" fill="#00C49F" name="Average Score" />
                    <Bar dataKey="passPercentage" fill="#FFBB28" name="Pass Percentage" />
                  </BarChart>
                </ChartContainer>

                <ChartContainer title="Enrollment by Batch">
                  <BarChart data={departmentData.batchEnrollment || []}>
                    <XAxis dataKey="batch" />
                    <YAxis />
                    <Legend />
                    <Bar dataKey="students" fill="#FFBB28" name="Students" />
                  </BarChart>
                </ChartContainer>
              </div>

              <ChartContainer title="Performance Over Semesters">
                <LineChart data={departmentData.performanceTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis domain={[0, 100]} />
                  <Legend />
                  <Line type="monotone" dataKey="average" stroke="#FF8042" name="Department Average" />
                  <Line type="monotone" dataKey="collegeAverage" stroke="#0088FE" name="College Average" />
                </LineChart>
              </ChartContainer>

              <ExportButtons
                data={[
                  ...departmentData.performance?.map(p => ({
                    "Subject": p.subName,
                    "Average Score": `${p.averageMark}%`,
                    "Pass Percentage": `${p.passPercentage}%`
                  })) || [],
                  ...departmentData.batchEnrollment?.map(b => ({
                    "Batch": b.batch,
                    "Students": b.students
                  })) || []
                ]}
                filename={`department_${departmentData?.department?.deptName.replace(/\s+/g, '_')}`}
                reportId="department-report"
              />
            </div>
          )}
        </>
      )}

      {activeTab === "faculty" && (
        <>
          {!selectedFacultyDept && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {departments?.map((dept) => (
                <CardButton
                  key={dept?.deptid}
                  label={dept?.deptName}
                  onClick={() => navigateToFacultyDept(dept)}
                />
              ))}
            </div>
          )}

          {selectedFacultyDept && !selectedFacultyId && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {facultyList?.map((faculty) => (
                <CardButton
                  key={faculty.facid}
                  label={faculty.facName}
                  onClick={() => navigateToFaculty(faculty)}
                />
              ))}
            </div>
          )}

          {selectedFacultyId && facultyData && (
            <div id="faculty-report">
              {/* Faculty Report content */}
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
                    "Average Marks (Proxy)": e.avgMark || 'N/A' // Indicate if avgMark is just a proxy
                  })) || [])
                ]}
                filename={`faculty_${facultyData.faculty.facName.replace(/\s+/g, '_')}`}
                reportId="faculty-report"
              />
            </div>
          )}
        </>
      )}

      {activeTab === "student" && (
        <>
          {/* Student search input always visible when student tab is active */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Enter Register Number:</label>
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
                onClick={() => fetchStudentByRegNo()}
                disabled={loading}
              >
                {loading ? "Fetching..." : "Fetch Report"}
              </button>
              {studentError && <p className="text-red-600 mt-2 md:mt-0">{studentError}</p>}
            </div>
          </div>

          {studentData && (
            <div id="student-report">
              {/* Student Report content */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard title="Name" value={studentData.student.sName} />
                <StatCard title="Register No" value={studentData.student.regNo} />
                <StatCard title="Batch" value={studentData.student.batchName} />
                <StatCard title="CGPA" value={studentData.student.cgpa || 'N/A'} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
                  ...(studentData.performanceTrend?.map(p => ({
                    "Semester": p.semester,
                    "Your Average": p.average,
                    "Batch Average": p.batchAverage
                  })) || [])
                ]}
                filename={`student_${studentData.student.regNo}`}
                reportId="student-report"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminReports;
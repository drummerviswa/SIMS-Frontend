import React, { useEffect, useState, useCallback } from "react";
import API from "../../utils/API";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { utils, writeFile } from "xlsx";
import {
  LineChart, Line, // LineChart for student performance trend
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
    className={`bg-white dark:bg-gray-800 border hover:border-blue-500 hover:shadow-md cursor-pointer p-4 rounded text-center w-full md:w-auto transition-all ${ // Adjusted width
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

// --- TYPE DEFINITIONS FOR FACULTY REPORT ---
interface LoggedInFaculty {
  facid: string;
  facName: string;
  deptid: string; // Assuming deptid is also stored
  deptName?: string;
}

interface StudentPerformance {
  regNo: string;
  sName: string;
  assess1: number;
  assess2: number;
  endsem: number;
  total: number; // Sum of assess1, assess2, endsem
  grade: string;
}

interface FacultySubjectDetails {
  subid: string;
  subName: string;
  batchName: string;
  avgMarks: number;
  studentPerformance: StudentPerformance[];
  gradeDistribution: { grade: string; count: number }[];
}

interface FacultyReportData {
  faculty: {
    facid: string;
    facName: string;
    deptName: string;
  };
  subjectsTaught: FacultySubjectDetails[];
}

// --- TYPE DEFINITIONS FOR STUDENT REPORT (MODIFIED: ATTENDANCE REMOVED) ---
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
  // attendance: Array<{ subName: string; percentage: number }>; // REMOVED: No attendance in DB
  performanceTrend: Array<{ semester: string; average: number; batchAverage: number }>;
  gradeDistribution: Array<{ grade: string; count: number }>;
}


// --- FACREPORT COMPONENT ---
export default function FacReport() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loggedInFaculty, setLoggedInFaculty] = useState<LoggedInFaculty | null>(null);
  const [facultyReportData, setFacultyReportData] = useState<FacultyReportData | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("mySubjects"); // 'mySubjects', 'studentSearch'

  // Student search states
  const [studentReg, setStudentReg] = useState<string>("");
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [studentError, setStudentError] = useState<string | null>(null);


  // --- Data Fetching Utility ---
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
      onErrorCallback && onErrorCallback();
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Initial Load: Get Logged-in Faculty from LocalStorage ---
  useEffect(() => {
    const storedFac = localStorage.getItem("faculty");
    if (storedFac) {
      try {
        const parsedFac: LoggedInFaculty = JSON.parse(storedFac);
        if (parsedFac && parsedFac.facid && parsedFac.facName) {
          setLoggedInFaculty(parsedFac);
          // Fetch faculty's own subjects report on initial load if tab is "mySubjects"
          if (activeTab === "mySubjects") {
            fetchData<FacultyReportData>(`/reports/faculty/${parsedFac.facid}/detailed`, setFacultyReportData);
          }
        } else {
          setError("Invalid faculty data in your login session. Please re-login.");
          setLoggedInFaculty(null);
          setLoading(false);
        }
      } catch (e) {
        console.error("Error parsing faculty from localStorage:", e);
        setError("Could not read your faculty session. Please re-login.");
        setLoggedInFaculty(null);
        setLoading(false);
      }
    } else {
      setError("No faculty found in your login session. Please ensure you are logged in correctly.");
      setLoggedInFaculty(null);
      setLoading(false);
    }
  }, [fetchData, activeTab]); // Added activeTab to dependency to refetch if tab changes

  // Handle subject selection from the list
  const handleSubjectSelect = useCallback((subid: string) => {
    setSelectedSubjectId(subid);
  }, []);

  // Handle back to subject list
  const handleBackToSubjectList = useCallback(() => {
    setSelectedSubjectId(null);
  }, []);

  // --- Tab Navigation ---
  const navigateToTab = useCallback((tab: string) => {
    setActiveTab(tab);
    // Reset specific nested states when switching tabs
    setError(null); // Clear general error
    setStudentError(null); // Clear student error
    setStudentData(null); // Clear student data
    setStudentReg(""); // Clear student reg number
    setSelectedSubjectId(null); // Clear selected subject in 'mySubjects' tab
    // Refetch 'mySubjects' data if switching back to it
    if (tab === "mySubjects" && loggedInFaculty && !facultyReportData) {
      fetchData<FacultyReportData>(`/reports/faculty/${loggedInFaculty.facid}/detailed`, setFacultyReportData);
    }
  }, [loggedInFaculty, facultyReportData, fetchData]);


  // --- Student Search Logic ---
  const fetchStudentByRegNo = useCallback(async () => {
    if (!studentReg) {
      setStudentError("Please enter a student registration number.");
      return;
    }
    // Basic validation: 10 digits
    if (!/^\d{10}$/.test(studentReg)) {
      setStudentError("Registration number must be 10 digits.");
      return;
    }

    setLoading(true);
    setStudentError(null); // Clear previous student-specific errors
    try {
      // This endpoint should provide the full student report
      const res = await API.get<StudentData>(`/reports/student/${studentReg}`);
      setStudentData(res.data);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
          setStudentError("Student not found for the given registration number.");
      } else {
          setStudentError("Failed to fetch student report. Please try again.");
      }
      setStudentData(null); // Clear student data on error
    } finally {
      setLoading(false);
    }
  }, [studentReg]);


  // Display nothing or a loading spinner until initial check is done
  if (loading && !facultyReportData && !studentData && !error) { // Adjust loading check
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
          <p className="text-lg">Loading your faculty dashboard...</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const selectedSubject = selectedSubjectId
    ? facultyReportData?.subjectsTaught.find(sub => sub.subid === selectedSubjectId)
    : null;

  return (
    <div className="p-6 max-w-screen-xl mx-auto dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Faculty Dashboard: {loggedInFaculty?.facName || "Loading..."}
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
      {loggedInFaculty && (
        <div className="flex flex-wrap gap-4 mb-8">
          {["mySubjects", "studentSearch"].map((tab) => (
            <CardButton
              key={tab}
              label={tab === "mySubjects" ? "My Subjects" : "Student Search"}
              onClick={() => navigateToTab(tab)}
              active={activeTab === tab}
            />
          ))}
        </div>
      )}

      {/* --- MY SUBJECTS SECTION --- */}
      {activeTab === "mySubjects" && loggedInFaculty && facultyReportData ? (
        <>
          {!selectedSubjectId && ( // Show overall view and subject list
            <div id="faculty-overall-report">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Overall Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <StatCard title="Total Subjects Taught" value={facultyReportData.subjectsTaught.length} />
                <StatCard title="Department" value={facultyReportData.faculty.deptName} />
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-white">Subjects Taught</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Click on a subject to see its detailed report.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {facultyReportData.subjectsTaught.map(subject => (
                  <div
                    key={subject.subid}
                    className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-md cursor-pointer transition-shadow"
                    onClick={() => handleSubjectSelect(subject.subid)}
                  >
                    <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">{subject.subName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Batch: {subject.batchName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Marks: {subject.avgMarks.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <ExportButtons
                data={[
                  {
                    "Faculty Name": facultyReportData.faculty.facName,
                    "Department": facultyReportData.faculty.deptName,
                  },
                  ...(facultyReportData.subjectsTaught?.map(s => ({
                    "Subject ID": s.subid,
                    "Subject Name": s.subName,
                    "Batch": s.batchName,
                    "Average Marks": s.avgMarks,
                  })) || [])
                ]}
                filename={`faculty_${loggedInFaculty?.facName?.replace(/\s+/g, '_')}_overview`}
                reportId="faculty-overall-report"
                disabled={loading}
              />
            </div>
          )}

          {selectedSubject && ( // Show detailed report for the selected subject
            <div id="faculty-subject-report">
              <button
                onClick={handleBackToSubjectList}
                className="mb-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ← Back to All Subjects
              </button>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Subject Report: {selectedSubject.subName} ({selectedSubject.batchName})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <StatCard title="Subject" value={selectedSubject.subName} />
                <StatCard title="Batch" value={selectedSubject.batchName} />
                <StatCard title="Avg Marks" value={selectedSubject.avgMarks.toFixed(2)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartContainer title="Student Performance (Total Marks)">
                  <BarChart data={selectedSubject.studentPerformance.sort((a,b) => b.total - a.total)}>
                    <XAxis dataKey="sName" interval={0} angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value, name) => [value, "Total Marks"]} />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" name="Total Marks" />
                  </BarChart>
                </ChartContainer>

                <ChartContainer title="Grade Distribution for this Subject">
                  <PieChart>
                    <Pie
                      data={selectedSubject.gradeDistribution || []}
                      dataKey="count"
                      nameKey="grade"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {(selectedSubject.gradeDistribution || []).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, "Students"]} />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">Detailed Student Marks</h3>
              {selectedSubject.studentPerformance.length > 0 ? (
                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow p-4">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reg No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assess 1</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assess 2</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">End Sem</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedSubject.studentPerformance.map((student) => (
                        <tr key={student.regNo}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{student.regNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{student.sName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{student.assess1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{student.assess2}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{student.endsem}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{student.total}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{student.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No student performance data available for this subject.</p>
              )}

              <ExportButtons
                data={[
                  {
                    "Subject Name": selectedSubject.subName,
                    "Batch": selectedSubject.batchName,
                    "Average Marks": selectedSubject.avgMarks,
                  },
                  ...(selectedSubject.studentPerformance?.map(s => ({
                    "Reg No": s.regNo,
                    "Student Name": s.sName,
                    "Assess 1": s.assess1,
                    "Assess 2": s.assess2,
                    "End Sem": s.endsem,
                    "Total": s.total,
                    "Grade": s.grade
                  })) || []),
                  ...(selectedSubject.gradeDistribution?.map(g => ({
                    "Grade": g.grade,
                    "Count": g.count
                  })) || [])
                ]}
                filename={`faculty_${loggedInFaculty?.facName?.replace(/\s+/g, '_')}_subject_${selectedSubject.subName.replace(/\s+/g, '_')}`}
                reportId="faculty-subject-report"
                disabled={loading}
              />
            </div>
          )}
        </>
      ) : activeTab === "mySubjects" && !loading && !error && (
        <p className="text-gray-600 dark:text-gray-400 mt-4">No subjects data available for your faculty profile.</p>
      )}


      {/* --- STUDENT SEARCH SECTION --- */}
      {activeTab === "studentSearch" && loggedInFaculty && (
        <div className="py-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Search Student Performance</h2>
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
                {/* Current Semester Marks Bar Chart - already shows split-up via stacked bars */}
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

                {/* Grade Distribution */}
                <ChartContainer title="Grade Distribution">
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
              </div>

              {/* Detailed Current Semester Marks Table - Explicitly showing split-ups */}
              <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">Current Semester Detailed Marks</h3>
              {studentData.currentSemester.length > 0 ? (
                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow p-4 mb-8">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Faculty</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assess 1</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assess 2</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">End Sem</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {studentData.currentSemester.map((course, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{course.subName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{course.facName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{course.assess1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{course.assess2}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{course.endsem}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{course.total}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{course.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 mb-8">No current semester marks data available for this student.</p>
              )}


              <ChartContainer title="Performance Trend (Average Marks)" className="mb-12">
                <LineChart data={studentData.performanceTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis domain={[0, 100]} />
                  <Legend />
                  <Line type="monotone" dataKey="average" stroke="#0088FE" name="Your Average" />
                  <Line type="monotone" dataKey="batchAverage" stroke="#00C49F" name="Batch Average" />
                </LineChart>
              </ChartContainer>

              <ExportButtons
                data={[
                  // Student Info
                  {
                    "Student Name": studentData.student.sName,
                    "Register No": studentData.student.regNo,
                    "Batch": studentData.student.batchName,
                    "Branch": studentData.student.branchName,
                    "Degree": studentData.student.degName,
                    "CGPA": studentData.student.cgpa || 'N/A'
                  },
                  // Current Semester Marks
                  ...(studentData.currentSemester?.map(s => ({
                    "Subject": s.subName,
                    "Faculty": s.facName,
                    "Assessment 1": s.assess1,
                    "Assessment 2": s.assess2,
                    "End Semester": s.endsem,
                    "Total Marks": s.total,
                    "Grade": s.grade
                  })) || []),
                  // Performance Trend (removed attendance from here)
                  ...(studentData.performanceTrend?.map(p => ({
                    "Semester": p.semester,
                    "Your Average": p.average,
                    "Batch Average": p.batchAverage
                  })) || []),
                  // Grade Distribution
                  ...(studentData.gradeDistribution?.map(g => ({
                    "Grade": g.grade,
                    "Count": g.count
                  })) || [])
                ]}
                filename={`student_report_${studentData.student.regNo}`}
                reportId="student-report-content"
                disabled={loading}
              />
            </div>
          )}
        </div>
      )}

      {/* Message if no faculty is logged in */}
      {!loggedInFaculty && !loading && (
        <p className="text-red-600 dark:text-red-400 mt-8 text-center text-lg">
          No faculty information found. Please ensure you are logged in as a faculty member.
        </p>
      )}
    </div>
  );
}
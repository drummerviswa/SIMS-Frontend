import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Home";
import AdminLayout from "./layout/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import ManageDepartment from "./pages/admin/mange/ManageDepartment";
import ManageFaculty from "./pages/admin/mange/ManageFaculty";
import ManageStudents from "./pages/admin/mange/ManageStudents";
import ManageRegulation from "./pages/admin/mange/ManageRegulation";
import ManageBranch from "./pages/admin/mange/ManageBranch";
import ManageBatch from "./pages/admin/mange/ManageBatch";
import ManageDegree from "./pages/admin/mange/ManageDegree";
import ManageSubject from "./pages/admin/mange/ManageSubject";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import AdminRegister from "./pages/admin/auth/AdminRegister";
import AdminReports from "./pages/admin/misc/AdminReports";
import AdminAcademics from "./pages/admin/academic/AdminAcademicCalendar";
import AdminBackup from "./pages/admin/misc/AdminBackup";
import AdminDeptQuery from "./pages/admin/query/AdminDeptQuery";
import AdminFacQuery from "./pages/admin/query/AdminFacQuery";
import AdminAcademicCalendar from "./pages/admin/academic/AdminAcademicCalendar";
import AdminAcademicSchedule from "./pages/admin/academic/AdminAcademicSchedule";
import DepartmentLayout from "./layout/department/DepartmentLayout";
import DepartmentHome from "./pages/department/DepartmentHome";
import AdminProfile from "./pages/admin/auth/AdminProfile";
import DepartmentProfile from "./pages/department/auth/DepartmentProfile";
import DepartmentLogin from "./pages/department/auth/DepartmentLogin";
import ViewFaculties from "./pages/department/view/ViewFaculties";
import ViewBranches from "./pages/department/view/ViewBranches";
import DeptManageSubjects from "./pages/department/manage/DeptManageSubjects";
import DeptFacQuery from "./pages/department/query/DeptFacQuery";
import DeptManageBatches from "./pages/department/manage/DeptManageBatches";
import ManageFacSubjects from "./pages/department/manage/ManageFacSubjects";
import DeptManageStudents from "./pages/department/manage/DeptManageStudents";
import DeptReport from "./pages/department/misc/DeptReport";
import ContactAdmin from "./pages/department/contact/ContactAdmin";
import ViewDegrees from "./pages/department/view/ViewDegrees";
import DeptAcademic from "./pages/department/academic/DeptAcademic";
import NotFound from "./pages/OtherPage/NotFound";
import FacultyLayout from "./layout/faculty/FacultyLayout";
import FacultyHome from "./pages/faculty/FacultyHome";
import FacReport from "./pages/faculty/FacReport";
import FacLogin from "./pages/faculty/auth/FacLogin";
import FacProfile from "./pages/faculty/auth/FacProfile";
import FacViewSubjects from "./pages/faculty/view/FacViewSubjects";
import FacViewBatches from "./pages/faculty/view/FacViewBatches";
import ManageSplitup from "./pages/faculty/marks/ManageSplitup";
import ViewMarksSubject from "./pages/faculty/marks/ViewMarksSubject";
import UploadMarks from "./pages/faculty/marks/UploadMarks";
import FacAcademicCal from "./pages/faculty/academics/FacAcademicCal";
import FacContactAdmin from "./pages/faculty/contact/FacContactAdmin";
import FacContactDept from "./pages/faculty/contact/FacContactDept";
import MarksSubject from "./pages/faculty/marks/MarksSubject";
import ViewMarks from "./pages/faculty/marks/ViewMarks";
import React, { useEffect, useState } from "react";
import Format from "./pages/faculty/marks/Format";
import Regulation from "./pages/faculty/marks/Regulation";
import ManageAssessComp from "./pages/admin/mange/ManageAssessComp";
import Criteria from "./pages/faculty/marks/Criteria";
import Marks from "./pages/faculty/marks/Marks";
import MarkGrant from "./pages/faculty/marks/MarkGrant";
import MarkSplit from "./pages/faculty/marks/MarkSplit";
import ManageDegrees from "./pages/admin/mange/ManageDegree";
import ManageSubjectDepartment from "./pages/admin/mange/ManageSubjectDepartment";
interface ChildLayout {
  element: React.ReactNode;
}
export default function App() {
  useEffect(() => {
    document.title = "SIMS | Student Internals Management System";
  }, []);
  const PublicRouteAdmin = ({ element }: ChildLayout) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    useEffect(() => {
      const token = localStorage.getItem("adminToken");
      setIsAuth(!!token);
    }, []);

    if (isAuth === null) return <div>Loading...</div>;

    return isAuth ? <Navigate to="/admin" /> : element;
  };
  const ProtectedRouteAdmin = ({ element }: ChildLayout) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    useEffect(() => {
      const token = localStorage.getItem("adminToken");
      setIsAuth(!!token);
    }, []);

    if (isAuth === null) return <div>Loading...</div>;

    return isAuth ? element : <Navigate to="/admin/login" />;
  };
  const ProtectedRouteFac = ({ element }: ChildLayout) => {
    const [isAuth] = useState(true);
    return isAuth ? element : <Navigate to="/faculty/login" />;
  };
  const ProtectedRouteDept = ({ element }: ChildLayout) => {
    const [isAuth] = useState(true);
    return isAuth ? element : <Navigate to="/department/login" />;
  };
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Dashboard */}
          <Route element={<ProtectedRouteAdmin element={<AdminLayout />} />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route
              path="/admin/manage/department"
              element={<ManageDepartment />}
            />
            <Route path="/admin/manage/faculty" element={<ManageFaculty />} />
            <Route
              path="/admin/manage/subdept"
              element={<ManageSubjectDepartment />}
            />
            <Route path="/admin/manage/student" element={<ManageStudents />} />
            <Route
              path="/admin/manage/regulation"
              element={<ManageRegulation />}
            />
            <Route path="/admin/manage/branch" element={<ManageBranch />} />
            <Route path="/admin/manage/batch" element={<ManageBatch />} />
            <Route
              path="/admin/manage/assesscomp"
              element={<ManageAssessComp />}
            />
            <Route path="/admin/manage/degree" element={<ManageDegree />} />
            <Route path="/admin/manage/subject" element={<ManageSubject />} />
            <Route path="/admin/report" element={<AdminReports />} />
            <Route path="/admin/academic" element={<AdminAcademics />} />
            <Route path="/admin/backup" element={<AdminBackup />} />
            <Route
              path="/admin/greivance/department"
              element={<AdminDeptQuery />}
            />
            <Route
              path="/admin/greivance/faculty"
              element={<AdminFacQuery />}
            />
            <Route path="/admin/calendar" element={<AdminAcademicCalendar />} />
            <Route path="/admin/schedule" element={<AdminAcademicSchedule />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>
          <Route
            path="/admin/login"
            element={<PublicRouteAdmin element={<AdminLogin />} />}
          />
          <Route
            path="/admin/register"
            element={<PublicRouteAdmin element={<AdminRegister />} />}
          />

          {/* Faculty Dashboard */}
          <Route element={<ProtectedRouteFac element={<FacultyLayout />} />}>
            <Route path="/faculty" element={<FacultyHome />} />
            <Route path="/faculty/report" element={<FacReport />} />
            <Route path="/faculty/view/subject" element={<FacViewSubjects />} />
            <Route path="/faculty/view/batch" element={<FacViewBatches />} />
            <Route path="/faculty/marks/all" element={<MarksSubject />} />
            <Route path="/faculty/criteria" element={<Criteria />} />
            <Route
              path="/faculty/marks/splitup/:subCode/:acid/:batchName"
              element={<ManageSplitup />}
            />
            <Route path="/faculty/marks/viewall" element={<ViewMarks />} />
            <Route
              path="/faculty/marks/view/:subCode/:batchName"
              element={<ViewMarksSubject />}
            />
            <Route path="/faculty/marks/upload" element={<Marks />} />
            <Route
              path="/faculty/marks/upload/:subCode/:batchName"
              element={<UploadMarks />}
            />
            <Route
              path="/faculty/marks/upload/:subCode/:batchName/:tenure"
              element={<MarkGrant />}
            />
            <Route
              path="/faculty/marks/upload/:subCode/:batchName/:tenure/:msid"
              element={<MarkSplit />}
            />
            <Route
              path="/faculty/marks/regulation/:regName"
              element={<Format />}
            />
            <Route path="/faculty/marks/regulation" element={<Regulation />} />
            <Route path="/faculty/view/report" element={<FacReport />} />
            <Route path="/faculty/academic" element={<FacAcademicCal />} />
            <Route
              path="/faculty/contact/admin"
              element={<FacContactAdmin />}
            />
            <Route
              path="/faculty/contact/department"
              element={<FacContactDept />}
            />
            {/* <Route */}
          </Route>
          <Route path="/faculty/login" element={<FacLogin />} />
          <Route path="/faculty/profile" element={<FacProfile />} />

          {/* Department Dashboard */}
          <Route
            element={<ProtectedRouteDept element={<DepartmentLayout />} />}
          >
            <Route path="/department" element={<DepartmentHome />} />
            <Route path="/department/calendar" element={<DeptAcademic />} />
            <Route
              path="/department/view/faculty"
              element={<ViewFaculties />}
            />
            <Route path="/department/view/branch" element={<ViewBranches />} />
            <Route path="/department/view/degree" element={<ViewDegrees />} />
            <Route
              path="/department/manage/subjects"
              element={<DeptManageSubjects />}
            />
            <Route
              path="/department/manage/batch"
              element={<DeptManageBatches />}
            />
            <Route
              path="/department/manage/facsub"
              element={<ManageFacSubjects />}
            />
            <Route
              path="/department/manage/student"
              element={<DeptManageStudents />}
            />
            <Route
              path="/department/grievance/faculty"
              element={<DeptFacQuery />}
            />
            <Route path="/department/report" element={<DeptReport />} />
            <Route path="/department/contactadmin" element={<ContactAdmin />} />
          </Route>
          <Route path="/department/profile" element={<DepartmentProfile />} />
          <Route path="/department/login" element={<DepartmentLogin />} />

          {/* Main App Layout */}
          <Route index path="/" element={<Home />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

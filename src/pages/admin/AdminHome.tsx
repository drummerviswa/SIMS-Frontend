import PageMeta from "../../components/common/PageMeta";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import ShowcaseCard from "../../components/ecommerce/ShowcaseCard";
import { GroupIcon } from "../../icons";
import { useEffect, useState } from "react";
import { FaSchoolFlag } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import { Link } from "react-router";
import Piechart from "../../components/charts/pie/Piechart";
import ComponentCard from "../../components/common/ComponentCard";
import API from "../../utils/API";
export default function AdminHome() {
  const [countStudents, setCountStudents] = useState(0);
  const [countFaculty, setCountFaculty] = useState(0);
  const [countDepartment, setCountDepartment] = useState(0);
  const [countDegrees, setCountDegrees] = useState(0);

  useEffect(() => {
    const fetchStudentsCount = async () => {
      const response = await API.get("admin/manage/student");
      const data = await response.data;
      setCountStudents(data.length);
    };
    const fetchFacultyCount = async () => {
      const response = await API.get("admin/manage/faculty");
      const data = await response.data;
      setCountFaculty(data.length);
    };
    const fetchDepartmentCount = async () => {
      const response = await API.get("admin/manage/department");
      const data = await response.data;
      setCountDepartment(data.length);
    };
    const fetchDegreesCount = async () => {
      const response = await API.get("admin/manage/degree");
      const data = await response.data;
      setCountDegrees(data.length);
    };
    fetchStudentsCount();
    fetchFacultyCount();
    fetchDepartmentCount();
    fetchDegreesCount();
  }, []);
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          {
            title: "Students",
            icon: (
              <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            ),
            count: countStudents,
            link: "/admin/manage/student",
          },
          {
            title: "Faculty",
            icon: (
              <GiTeacher className="text-gray-800 size-6 dark:text-white/90" />
            ),
            count: countFaculty,
            link: "/admin/manage/faculty",
          },
          {
            title: "Department",
            icon: (
              <FaSchoolFlag className="text-gray-800 size-6 dark:text-white/90" />
            ),
            count: countDepartment,
            link: "/admin/manage/department",
          },
          {
            title: "Degrees",
            icon: (
              <IoSchool className="text-gray-800 size-6 dark:text-white/90" />
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

      <ComponentCard title="Piechart" className="w-full my-4">
        <div className="lg:col-span-12 col-span-1 justify-around xl:col-span-5 flex flex-col lg:flex-row gap-4">
          <Piechart />
          <Piechart />
        </div>
      </ComponentCard>

      <div className="col-span-12 my-4">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5 my-4">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7 my-4">
        <RecentOrders />
      </div>
    </>
  );
}

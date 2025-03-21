
import PageMeta from "../../components/common/PageMeta";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import ShowcaseCard from "../../components/ecommerce/ShowcaseCard";
import { GroupIcon } from "../../icons";
import { useState } from "react";
import { FaSchoolFlag } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import { Link } from "react-router";
import Piechart from "../../components/charts/pie/Piechart";
import ComponentCard from "../../components/common/ComponentCard";
export default function AdminHome() {
  const [countStudents, setCountStudents] = useState(0);
  const [countFaculty, setCountFaculty] = useState(0);
  const [countDepartment, setCountDepartment] = useState(0);
  const [countDegrees, setCountDegrees] = useState(0);
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
            {[
              {
                title: "Students",
                icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
                count: countStudents,
                link: "/admin/manage/student"
              },
              {
                title: "Faculty",
                icon: <GiTeacher className="text-gray-800 size-6 dark:text-white/90" />,
                count: countFaculty,
                link: "/admin/manage/faculty"
              },
              {
                title: "Department",
                icon: <FaSchoolFlag className="text-gray-800 size-6 dark:text-white/90" />,
                count: countDepartment,
                link: "/admin/manage/department"
              },
              {
                title: "Degrees",
                icon: <IoSchool className="text-gray-800 size-6 dark:text-white/90" />,
                count: countDepartment,
                link: "/admin/manage/degree"
              }
            ].map((item) => (
              <Link to={item.link}>

                <ShowcaseCard
                  icon={item.icon} title={item.title}
                  count={item.count}
                />
              </Link>
            ))}
          </div>

          <ComponentCard title="Piechart" className="w-full">
            <div className="col-span-12 justify-around xl:col-span-5 flex flex-row">
              {/* <MonthlyTarget /> */}
              <Piechart />
              <Piechart />
            </div>
          </ComponentCard>

          <div className="col-span-12">
            <StatisticsChart />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <DemographicCard />
          </div>

          <div className="col-span-12 xl:col-span-7">
            <RecentOrders />
          </div>
        </div>
      </div>
    </>
  );
}

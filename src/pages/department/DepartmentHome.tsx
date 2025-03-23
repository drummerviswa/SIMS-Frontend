
import PageMeta from "../../components/common/PageMeta";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import ShowcaseCard from "../../components/ecommerce/ShowcaseCard";

export default function DepartmentHome() {
  return (
    <>
      <PageMeta
        title="Department Dashboard | SIMS - Student Information Management System"
        description="This is Department Dashboard page for SIMS - Student Information Management System"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <ShowcaseCard />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

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
    </>
  );
}

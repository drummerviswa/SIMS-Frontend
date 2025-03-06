import { DepartmentSidebarProvider, useSidebar } from "../../context/DepartmentSidebarContext";
import { Outlet } from "react-router";
import DepartmentBackdrop from "./DepartmentBackdrop";
import DepartmentSidebar from "./DepartmentSidebar";
import DepartmentHeader from "./DepartmentHeader";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <DepartmentSidebar />
        <DepartmentBackdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <DepartmentHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const DepartmentLayout: React.FC = () => {
  return (
    <DepartmentSidebarProvider>
      <LayoutContent />
    </DepartmentSidebarProvider>
  );
};

export default DepartmentLayout;

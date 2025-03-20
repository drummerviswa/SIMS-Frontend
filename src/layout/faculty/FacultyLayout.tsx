import { FacultySidebarProvider, useSidebar } from "../../context/FacultySidebarContext";
import { Outlet } from "react-router";
import FacultyBackdrop from "./FacultyBackdrop";
import FacultyHeader from "./FacultyHeader";
import FacultySidebar from "./FacultySidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <FacultySidebar />
        <FacultyBackdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <FacultyHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const FacultyLayout: React.FC = () => {
  return (
    <FacultySidebarProvider>
      <LayoutContent />
    </FacultySidebarProvider>
  );
};

export default FacultyLayout;

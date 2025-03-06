import { useSidebar } from "../../context/DepartmentSidebarContext";

const DepartmentBackdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50/50 lg:hidden"
      onClick={toggleMobileSidebar}
    />
  );
};

export default DepartmentBackdrop;

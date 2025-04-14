import ViewEntity from "../../../components/common/ViewEntity";

export default function ViewBranches() {
  const department = localStorage.getItem("department");
  const departmentData = department ? JSON.parse(department) : null;
  const departmentId = departmentData ? departmentData.deptid : null;
  return (
    <div>
      <ViewEntity
        apiEndpoint={`/department/view/${departmentId}/branch`}
        entityName="View Branches"
        uniqueKey="bid"
        columns={[
          { key: "bid", label: "Branch ID" },
          { key: "degName", label: "Degree" },
          { key: "degSym", label: "Degree Symbol" },
          { key: "branchName", label: "Branch Name" },
        ]}
        initialState={{}}
      />
    </div>
  );
}

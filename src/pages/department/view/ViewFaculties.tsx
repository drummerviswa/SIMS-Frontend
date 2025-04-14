import React from "react";
import ViewEntity from "../../../components/common/ViewEntity";

export default function ViewFaculties() {
  const department = localStorage.getItem("department");
  const departmentData = department ? JSON.parse(department) : null;
  const departmentId = departmentData ? departmentData.deptid : null;
  return (
    <div>
      <ViewEntity
        entityName="View Faculties"
        apiEndpoint={`/department/view/${departmentId}/faculty`}
        columns={[
          { key: "facid", label: "FID" },
          { key: "facName", label: "Name" },
          { key: "username", label: "Username" },
          { key: "password", label: "Password" },
          { key: "deptName", label: "Department" },
          { key: "designation", label: "Designation" },
        ]}
        initialState={{}}
        uniqueKey="fid"
      />
    </div>
  );
}

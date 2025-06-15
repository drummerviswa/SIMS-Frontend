import React from "react";
import ViewEntity from "../../../components/common/ViewEntity";

export default function ViewDegrees() {
  const department = localStorage.getItem("department");
  const departmentData = department ? JSON.parse(department) : null;
  const departmentId = departmentData ? departmentData.deptid : null;
  return (
    <div>
      <ViewEntity
        entityName="View Degrees"
        apiEndpoint={`/department/view/${departmentId}/degree`}
        uniqueKey="degid"
        columns={[
          { key: "degid", label: "Degree ID" },
          { key: "degName", label: "Degree Name" },
          { key: "degSym", label: "Degree Symbol" },
          { key: "duration", label: "Duration" },
          { key: "graduation", label: "Graduation" },
          { key: "deptName", label: "Department" },
        ]}
        initialState={{}}
      />
    </div>
  );
}

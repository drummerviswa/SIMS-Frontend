import React from "react";
import ViewEntity from "../../../components/common/ViewEntity";

export default function ViewDegrees() {
  return (
    <div>
      <ViewEntity
        entityName="View Degrees"
        apiEndpoint={`/department/view/${1}/degree`}
        uniqueKey="degid"
        columns={[
          { key: "degid", label: "Degree ID" },
          { key: "degName", label: "Degree Name" },
          { key: "duration", label: "Duration" },
          { key: "graduation", label: "Graduation" },
          { key: "deptName", label: "Department" },
        ]}
        initialState={{}}
      />
    </div>
  );
}

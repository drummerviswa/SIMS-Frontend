import React from "react";
import ViewEntity from "../../../components/common/ViewEntity";

export default function ViewDegrees() {
  return (
    <div>
      <ViewEntity
        entityName="View Degrees"
        apiEndpoint="/degree"
        uniqueKey="degreeId"
        columns={[
          { key: "degreeId", label: "Degree ID" },
          { key: "degreeName", label: "Degree Name" },
          { key: "degreeCode", label: "Degree Code" },
          { key: "duration", label: "Duration" },
        ]}
        initialState={{}}
      />
    </div>
  );
}

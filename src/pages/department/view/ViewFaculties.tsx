import React from "react";
import ViewEntity from "../../../components/common/ViewEntity";

export default function ViewFaculties() {
  return (
    <div>
      <ViewEntity
        entityName="View Faculties"
        apiEndpoint={`/department/view/${1}/faculty`}
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

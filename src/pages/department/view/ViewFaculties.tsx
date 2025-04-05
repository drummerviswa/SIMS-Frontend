import React from "react";
import ViewEntity from "../../../components/common/ViewEntity";

export default function ViewFaculties() {
  return (
    <div>
      <ViewEntity
        entityName="View Faculties"
        apiEndpoint="/faculty"
        columns={[
          { key: "fid", label: "FID" },
          { key: "facultyName", label: "Faculty Name" },
          { key: "username", label: "Username" },
          { key: "password", label: "Password" },
          { key: "designation", label: "Designation" },
          { key: "department", label: "Department" },
        ]}
        initialState={{}}
        uniqueKey="fid"
      />
    </div>
  );
}

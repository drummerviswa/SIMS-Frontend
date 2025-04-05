import ManageEntity from "../../../components/common/ManageEntity";
import ViewEntity from "../../../components/common/ViewEntity";

export default function AdminFacQuery() {
  return (
    <div>
      <ManageEntity
        apiEndpoint={`admin/grievance/faculty`}
        columns={[
          { key: "gid", label: "Grievance ID" },
          { key: "facName", label: "Faculty Name" },
          { key: "deptName", label: "Department Name" },
          { key: "gMessage", label: "Grievance Message" },
          { key: "sender", label: "From" },
        ]}
        entityName="Department Grievance"
        initialState={{}}
        inputOptions={[
          { key: "gMessage", label: "Grievance Message", type: "text" },
          { key: "department", label: "Department Id", type: "number" },
          { key: "faculty", label: "Faculty Id", type: "number" },
          { key: "sender", label: "From", type: "text" },
          { key: "reciever", label: "To", type: "text" },
        ]}
        uniqueKey="gid"
      />
    </div>
  );
}

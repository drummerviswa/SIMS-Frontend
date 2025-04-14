import ManageEntity from "../../../components/common/ManageEntity";

export default function DeptFacQuery() {
  const department = localStorage.getItem("department");
  const departmentData = department ? JSON.parse(department) : null;
  const departmentId = departmentData ? departmentData.deptid : null;
  return (
    <div>
      <ManageEntity
        apiEndpoint={`/department/grievance/faculty/${departmentId}`}
        columns={[
          { key: "gid", label: "Grievance ID" },
          { key: "facName", label: "Faculty Name" },
          { key: "deptName", label: "Department Name" },
          { key: "gMessage", label: "Grievance Message" },
          { key: "sender", label: "From" },
        ]}
        entityName="Faculty Grievance"
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

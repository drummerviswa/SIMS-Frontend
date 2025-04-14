import GrievanceEntity from "../../../components/common/GrievanceEntity";

export default function ContactAdmin() {
  const department = localStorage.getItem("department");
  const departmentData = department ? JSON.parse(department) : null;
  const departmentId = departmentData ? departmentData.deptid : null;
  return (
    <div>
      <GrievanceEntity
        apiEndpoint={`/department/grievance/contactAdmin/${departmentId}`}
        columns={[
          { key: "gid", label: "gid" },
          { key: "gMessage", label: "Message" },
        ]}
        entityName="Contact Admin"
        initialState={{
          gMessage: "",
          sender: "department",
          reciever: "admin",
          department: 1,
          faculty: null,
        }}
        inputOptions={[
          {
            key: "gMessage",
            label: "Message",
            type: "textarea",
          },
        ]}
        uniqueKey="gid"
      />
    </div>
  );
}

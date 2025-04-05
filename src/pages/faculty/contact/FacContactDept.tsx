import GrievanceEntity from "../../../components/common/GrievanceEntity";

export default function FacContactDept() {
  return (
    <div>
      <GrievanceEntity
        apiEndpoint={`/faculty/grievance/contactDepartment/${1}`}
        columns={[
          { key: "gid", label: "gid" },
          { key: "gMessage", label: "Message" },
        ]}
        entityName="Contact Department"
        initialState={{
          gMessage: "",
          sender: "faculty",
          reciever: "department",
          department: null,
          faculty: 1,
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

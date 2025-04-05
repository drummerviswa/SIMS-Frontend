import GrievanceEntity from "../../../components/common/GrievanceEntity";

export default function ContactAdmin() {
  return (
    <div>
      <GrievanceEntity
        apiEndpoint={`/department/grievance/contactAdmin/${1}`}
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

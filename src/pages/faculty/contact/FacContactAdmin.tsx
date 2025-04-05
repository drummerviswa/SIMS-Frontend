import GrievanceEntity from "../../../components/common/GrievanceEntity";

export default function FacContactAdmin() {
  return (
    <div>
      <GrievanceEntity
        apiEndpoint={`/faculty/grievance/contactAdmin/${1}`}
        columns={[
          { key: "gid", label: "gid" },
          { key: "gMessage", label: "Message" },
        ]}
        entityName="Contact Admin"
        initialState={{
          gMessage: "",
          sender: "faculty",
          reciever: "department",
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

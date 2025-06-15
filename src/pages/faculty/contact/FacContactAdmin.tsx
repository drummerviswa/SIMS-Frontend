import GrievanceEntity from "../../../components/common/GrievanceEntity";

export default function FacContactAdmin() {
  const faculty = localStorage.getItem("faculty");
  const facultyData = JSON.parse(faculty);
  const facultyId = facultyData["facid"];
  return (
    <div>
      <GrievanceEntity
        apiEndpoint={`/faculty/grievance/contactAdmin/${facultyId}`}
        columns={[
          { key: "gid", label: "gid" },
          { key: "gMessage", label: "Message" },
        ]}
        entityName="Contact Admin"
        initialState={{
          gMessage: "",
          sender: "faculty",
          reciever: "department",
          department: facultyData["primaryDept"],
          faculty: facultyId,
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

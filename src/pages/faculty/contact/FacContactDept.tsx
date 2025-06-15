import GrievanceEntity from "../../../components/common/GrievanceEntity";

export default function FacContactDept() {
  const faculty = localStorage.getItem("faculty");
  const facultyData = JSON.parse(faculty);
  const facultyId = facultyData["facid"];
  return (
    <div>
      <GrievanceEntity
        apiEndpoint={`/faculty/grievance/contactDepartment/${facultyId}`}
        columns={[
          { key: "gid", label: "gid" },
          { key: "gMessage", label: "Message" },
        ]}
        entityName="Contact Department"
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

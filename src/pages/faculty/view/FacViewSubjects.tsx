import ViewEntity from "../../../components/common/ViewEntity";

export default function FacViewSubjects() {
  const faculty = localStorage.getItem("faculty");
  const facultyData = JSON.parse(faculty);
  const facultyId = facultyData["facid"];
  return (
    <div className="max-w-[74rem] no-scrollbar">
      <ViewEntity
        apiEndpoint={`/faculty/view/${facultyId}/subject`}
        entityName="View Branches"
        uniqueKey="subid"
        columns={[
          { key: "subid", label: "Subject ID" },
          { key: "subName", label: "Subject Name" },
          { key: "subCode", label: "Subject Code" },
          { key: "l", label: "Letures" },
          { key: "t", label: "Tutorials" },
          { key: "p", label: "Practicals" },
          { key: "c", label: "Credits" },
          { key: "assess1", label: "Assessment I" },
          { key: "assess2", label: "Assessment II" },
          { key: "endsem", label: "End Semester" },
          { key: "cperiod", label: "Hours" },
          { key: "type", label: "Type" },
          { key: "regulation", label: "Regulation" },
        ]}
        initialState={{}}
      />
    </div>
  );
}

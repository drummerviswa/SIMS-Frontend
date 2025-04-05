import ViewEntity from "../../../components/common/ViewEntity";

export default function FacViewSubjects() {
  return (
    <div className="max-w-[74rem] no-scrollbar">
      <ViewEntity
        apiEndpoint={`/faculty/view/${1}/subject`}
        entityName="View Branches"
        uniqueKey="bid"
        columns={[
          { key: "subid", label: "Subject ID" },
          { key: "subName", label: "Subject Name" },
          { key: "subCode", label: "Subject Code" },
          { key: "lecture", label: "Letures" },
          { key: "tutorial", label: "Tutorials" },
          { key: "practical", label: "Practicals" },
          { key: "credits", label: "Credits" },
          { key: "category", label: "Category" },
          { key: "totalHours", label: "Total Hours" },
          { key: "totalMarks", label: "Total Marks" },
          { key: "internal", label: "Internal Marks" },
          { key: "external", label: "External Marks" },
        ]}
        initialState={{}}
      />
    </div>
  );
}

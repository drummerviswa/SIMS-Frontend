import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageSubject() {
  return (
    <div className="max-w-[74rem] no-scrollbar">
      <ManageEntity
        apiEndpoint="/admin/manage/subject"
        entityName="Subject"
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
        inputOptions={[
          { key: "subName", label: "Subject Name", type: "text" },
          { key: "subCode", label: "Subject Code", type: "text" },
          {
            key: "category",
            label: "Category",
            type: "select",
            static: true,
            options: [
              { key: "", label: "Select Category" },
              { key: "Theory", label: "Theory" },
              { key: "Lab", label: "Lab" },
              { key: "Theory and Lab", label: "Theory and Lab" },
            ],
          },
          { key: "lecture", label: "Lectures", type: "text" },
          { key: "tutorial", label: "Tutorials", type: "text" },
          { key: "practical", label: "Practicals", type: "text" },
          { key: "credits", label: "Credits", type: "text" },
          { key: "totalHours", label: "Total Hours", type: "text" },
          { key: "totalMarks", label: "Total Marks", type: "text" },
          { key: "internal", label: "Internal Marks", type: "text" },
          { key: "external", label: "External Marks", type: "text" },
        ]}
        uniqueKey="subId"
      />
    </div>
  );
}

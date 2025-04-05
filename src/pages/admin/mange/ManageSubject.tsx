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
              { key: "theory", label: "Theory" },
              { key: "lab", label: "Lab" },
              { key: "TheoryCumLab", label: "Theory and Lab" },
              { key: "internal", label: "Internal Only" },
            ],
          },
          { key: "lecture", label: "Lectures", type: "number" },
          { key: "tutorial", label: "Tutorials", type: "number" },
          { key: "practical", label: "Practicals", type: "number" },
          { key: "credits", label: "Credits", type: "number" },
          { key: "totalHours", label: "Total Hours", type: "number" },
          { key: "totalMarks", label: "Total Marks", type: "number" },
          { key: "internal", label: "Internal Marks", type: "number" },
          { key: "external", label: "External Marks", type: "number" },
        ]}
        uniqueKey="subid"
      />
    </div>
  );
}

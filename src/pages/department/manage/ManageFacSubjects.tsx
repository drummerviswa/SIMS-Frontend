import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageFacSubjects() {
  return (
    <ManageEntity
      entityName="Subject Mapping"
      apiEndpoint="/fac-subject"
      columns={[
        { key: "sid", label: "Subject ID" },
        { key: "subjectName", label: "Subject Name" },
        { key: "fid", label: "Faculty ID" },
        { key: "facultyName", label: "Faculty Name" },
        { key: "subjectCode", label: "Subject Code" },
        { key: "batchName", label: "Batch Name" },
        { key: "degName", label: "Degree Name" },
        { key: "sem", label: "Semester" },
      ]}
      initialState={{}}
      inputOptions={[
        {
          key: "subjectName",
          label: "Subject Name",
          type: "text",
          fetchEndpoint: "/subject",
          fetchKey: "subCode",
        },
        {
          key: "facultyName",
          label: "Faculty Name",
          type: "select",
          fetchEndpoint: "/faculty",
          fetchKey: "fid",
        },
        {
          key: "batchName",
          label: "Batch Name",
          type: "select",
          fetchEndpoint: "/batch",
          fetchKey: "bid",
        },
        {
          key: "degName",
          label: "Degree Name",
          type: "select",
          fetchEndpoint: "/degree",
          fetchKey: "degid",
        },
        { key: "sem", label: "Semester", type: "number" },
      ]}
      uniqueKey={"sid"}
    />
  );
}

import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageDegrees() {
  //manage foriegn key
  //branch is saved as branchid in db
  //fetch branchName
  return (
    <ManageEntity
      entityName="Degree"
      apiEndpoint="/admin/manage/degree"
      columns={[
        { key: "degid", label: "Degree ID" },
        { key: "degName", label: "Degree Name" },
        { key: "degSym", label: "Degree Symbol" },
        { key: "duration", label: "Duration" },
        { key: "graduation", label: "Graduation" },
        { key: "department", label: "Department", fetchKey: "deptName" },
      ]}
      initialState={{}}
      inputOptions={[
        {
          key: "degName",
          label: "Degree Name",
          type: "text",
        },
        {
          key: "degSym",
          label: "Degree Symbol",
          type: "text",
        },
        {
          key: "duration",
          label: "Duration",
          type: "number",
        },
        {
          key: "graduation",
          label: "Graduation Year",
          type: "select",
          static: true,
          options: [
            { key: "", label: "Select Graduation type" },
            { key: "UG", label: "UG" },
            { key: "PG", label: "PG" },
            { key: "PhD", label: "PhD" },
          ],
        },
        {
          key: "department",
          label: "Department",
          type: "select",
          fetchEndpoint: "/admin/manage/department",
          selectMultiple: true,
          selectLabel: ["deptid", "deptName"],
          fetchKey: "deptid",
        },
      ]}
      uniqueKey="degid"
    />
  );
}

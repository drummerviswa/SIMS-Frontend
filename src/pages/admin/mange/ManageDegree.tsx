import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageDegrees() {
  return (
    <ManageEntity
      entityName="Degree"
      apiEndpoint="/admin/manage/degree"
      columns={[
        { key: "degid", label: "Degree ID" },
        { key: "degName", label: "Degree Name" },
        { key: "degree", label: "Degree" },
        { key: "duration", label: "Duration" },
        { key: "graduation", label: "Graduation" },
        { key: "department", label: "Department" },
      ]}
      initialState={{}}
      inputOptions={[
        {
          key: "degName",
          label: "Degree Name",
          type: "text",
        },
        {
          key: "degree",
          label: "Degree",
          type: "text",
        },
        {
          key: "duration",
          label: "Duration",
          type: "text",
        },
        {
          key: "graduation",
          label: "Graduation Year",
          type: "text",
        },
        {
          key: "deptid",
          label: "Department",
          type: "select",
          fetchEndpoint: "/admin/manage/department",
          selectMultiple: true,
          selectLabel: ["deptid", "deptName"],
          fetchKey: "deptId",
        },
      ]}
      uniqueKey="degid"
    />
  );
}

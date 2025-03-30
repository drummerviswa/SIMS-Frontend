import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageDegrees() {
  return (
    <ManageEntity
      entityName="Degree"
      apiEndpoint="/degrees"
      columns={[
        { key: "degid", label: "Degree ID" },
        { key: "degName", label: "Degree Name" },
        { key: "degree", label: "Degree" },
        { key: "duration", label: "Duration" },
        { key: "graduation", label: "Graduation" },
        { key: "department", label: "Department" },
      ]}
      initialState={{
        degid: 0,
        degName: "Bachelor of Engineering",
        degree: "B.E.",
        duration: "4 years",
        graduation: "2027",
        department: "Computer Science",
      }}
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
          key: "department",
          label: "Department",
          type: "select",
          fetchEndpoint: "/departments",
          fetchKey: "deptId",
        },
      ]}
      uniqueKey="degid"
    />
  );
}

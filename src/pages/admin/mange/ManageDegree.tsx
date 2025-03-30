import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageDegrees() {
  return (
    <ManageEntity
      entityName="Branches"
      apiEndpoint="/branches"
      columns={[
        { key: "branchId", label: "Branch ID" },
        { key: "branchName", label: "Branch Name" },
        { key: "degree", label: "Degree" },
        { key: "department", label: "Department" },
      ]}
      initialState={{
        id: 0,
        branchId: "1",
        branchName: "Information Technology",
        degree: "Msc Integrated 5 Years",
        department: "Mathematics",
      }}
      inputOptions={[
        { key: "branchId", label: "Branch ID", type: "text" },
        { key: "branchName", label: "Branch Name", type: "text" },
        {
          key: "degree",
          label: "Degree",
          type: "select",
          fetchEndpoint: "/degrees",
          fetchKey: "degreeId",
        },
        {
          key: "department",
          label: "Department",
          type: "select",
          fetchEndpoint: "/departments",
          fetchKey: "deptId",
        },
      ]}
    />
  );
}

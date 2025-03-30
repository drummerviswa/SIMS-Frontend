import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageBranches() {
  return (
    <ManageEntity
      entityName="Branches"
      apiEndpoint="/branches"
      columns={[
        { key: "branchId", label: "Branch ID" },
        { key: "branchName", label: "Branch Name" },
        { key: "degree", label: "Degree" },
      ]}
      initialState={{
        id: 0,
        branchId: "42",
        branchName: "Information Technology",
        degree: "Msc Integrated",
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
      ]}
    />
  );
}

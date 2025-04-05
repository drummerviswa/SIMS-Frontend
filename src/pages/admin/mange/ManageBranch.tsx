import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageBranches() {
  return (
    <ManageEntity
      entityName="Branches"
      apiEndpoint="/branches"
      columns={[
        { key: "bid", label: "Branch ID" },
        { key: "branchName", label: "Branch Name" },
        { key: "degree", label: "Degree" },
      ]}
      initialState={{}}
      inputOptions={[
        { key: "bid", label: "Branch ID", type: "text" },
        { key: "branchName", label: "Branch Name", type: "text" },
        {
          key: "degree",
          label: "Degree",
          type: "select",
          fetchEndpoint: "/degrees",
          fetchKey: "degreeId",
        },
      ]}
      uniqueKey="bid" 
    />
  );
}

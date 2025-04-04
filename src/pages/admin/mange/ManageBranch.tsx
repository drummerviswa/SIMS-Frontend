import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageBranches() {
  return (
    <ManageEntity
      entityName="Branches"
      apiEndpoint="/admin/manage/branch"
      columns={[
        { key: "bid", label: "Branch ID" },
        { key: "degree", label: "Degree", fetchKey: "degName" },
        { key: "branchName", label: "Branch Name" },
      ]}
      initialState={{}}
      inputOptions={[
        { key: "branchName", label: "Branch Name", type: "text" },
        {
          key: "degree",
          label: "Degree",
          type: "select",
          fetchEndpoint: "/admin/manage/degree",
          selectLabel: ["degid", "degName"],
          fetchKey: "degid",
        },
      ]}
      uniqueKey="bid"
    />
  );
}

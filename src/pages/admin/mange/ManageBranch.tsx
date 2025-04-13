import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageBranches() {
  return (
    <ManageEntity
      entityName="Branches"
      apiEndpoint="/admin/manage/branch"
      columns={[
        { key: "bid", label: "Branch ID" },
        { key: "degree", label: "Degree", fetchKey: "degName" },
        { key: "regulation", label: "Regulation", fetchKey: "regName" },
        { key: "branchName", label: "Branch Name" },
        // subjects are in json format, so we need to parse them
        {
          key: "subjects",
          label: "Subjects",
          fetchKey: "subName",
          render: (value: string) => {
            const subjects = JSON.parse(value);
            return subjects.map((subName: string) => subName).join(", ");
          },
        },
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
        {
          key: "regulation",
          label: "Regulation",
          type: "select",
          fetchEndpoint: "/admin/manage/regulation",
          selectLabel: ["rid", "regName"],
          fetchKey: "rid",
        },
      ]}
      uniqueKey="bid"
    />
  );
}

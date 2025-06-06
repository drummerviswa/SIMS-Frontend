import ManageEntity from "../../../components/common/ManageEntity";

export default function DeptManageBatches() {
  return (
    <ManageEntity
      entityName="Batchs"
      apiEndpoint="/department/manage/batch"
      columns={[
        { key: "batchid", label: "Batch ID" },
        { key: "batchName", label: "Batch Name" },
        { key: "regName", label: "Regulation" },
      ]}
      initialState={{}}
      inputOptions={[
        { key: "batchName", label: "Batch Name", type: "text" },
        {
          key: "regulation",
          label: "Regulation",
          type: "select",
          fetchEndpoint: "/admin/manage/regulation",
          fetchKey: "rid",
          selectLabel: ["rid", "regName"],
        },
      ]}
      uniqueKey={"batchid"}
    />
  );
}

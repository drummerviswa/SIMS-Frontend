import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageBatch() {
  return (
    <ManageEntity
      entityName="Batchs"
      apiEndpoint="/admin/manage/batch"
      columns={[
        { key: "batchid", label: "Batch ID" },
        { key: "batchName", label: "Batch Name" },
      ]}
      initialState={{}}
      inputOptions={[{ key: "batchName", label: "Batch Name", type: "text" }]}
      uniqueKey={"batchid"}
    />
  );
}

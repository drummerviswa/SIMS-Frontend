import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageBatch() {
  return (
    <ManageEntity
      entityName="Batchs"
      apiEndpoint="/batch"
      columns={[
        { key: "batchName", label: "Batch Name" },
      ]}
      initialState={{
        id: 0,
        batchName: "2023-2024",
      }}
      inputOptions={[
        { key: "batchName", label: "Batch Name", type: "text" },
      ]}
    />
  );
}

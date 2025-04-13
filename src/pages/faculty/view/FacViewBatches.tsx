import ViewEntity from "../../../components/common/ViewEntity";

export default function FacViewBatches() {
  return (
    <div>
      <ViewEntity
        apiEndpoint={`/faculty/view/${1}/batches`}
        columns={[
          { key: "batchid", label: "Batch ID" },
          { key: "batchName", label: "Batch Name" },
          { key: "regName", label: "Regulation" },
        ]}
        entityName="View Batches"
        uniqueKey="batchid"
        initialState={{}}
      />
    </div>
  );
}

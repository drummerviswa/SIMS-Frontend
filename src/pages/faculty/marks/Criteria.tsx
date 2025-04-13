import ManageEntity from "../../../components/common/ManageEntity";

export default function Criteria() {
  return (
    <div>
      <h1 className="text-end dark:text-gray-25 text-gray-dark">
        NOTE: This is only main categories
      </h1>
      <ManageEntity
        apiEndpoint="/faculty/criteria"
        entityName="Criteria"
        columns={[
          { label: "CID", key: "cid" },
          { label: "Criteria Name", key: "criteriaName" },
        ]}
        initialState={{}}
        inputOptions={[
          { label: "Criteria Name", key: "criteriaName", type: "text" },
        ]}
        uniqueKey="cid"
      />
    </div>
  );
}

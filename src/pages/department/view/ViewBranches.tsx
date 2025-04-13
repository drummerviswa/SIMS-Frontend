import ViewEntity from "../../../components/common/ViewEntity";

export default function ViewBranches() {
  return (
    <div>
      <ViewEntity
        apiEndpoint={`/department/view/${1}/branch`}
        entityName="View Branches"
        uniqueKey="bid"
        columns={[
          { key: "bid", label: "Branch ID" },
          { key: "degName", label: "Degree" },
          { key: "degSym", label: "Degree Symbol" },
          { key: "branchName", label: "Branch Name" },
        ]}
        initialState={{}}
      />
    </div>
  );
}

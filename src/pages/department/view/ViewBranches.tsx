import ViewEntity from "../../../components/common/ViewEntity";

export default function ViewBranches() {
  return (
    <div>
      <ViewEntity
        apiEndpoint="/branch"
        entityName="View Branches"
        uniqueKey="bid"
        columns={[
          { key: "bid", label: "Branch ID" },
          { key: "branchName", label: "Branch Name" },
          { key: "branchCode", label: "Branch Code" },
          { key: "degreeName", label: "Degree Name" },
        ]}
        initialState={{}}
        
      />
    </div>
  )
}

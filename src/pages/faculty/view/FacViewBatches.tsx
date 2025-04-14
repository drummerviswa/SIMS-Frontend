import ViewEntity from "../../../components/common/ViewEntity";

export default function FacViewBatches() {
  const faculty = localStorage.getItem("faculty");
  const facultyData = JSON.parse(faculty);
  const facultyId = facultyData["facid"];
  return (
    <div>
      <ViewEntity
        apiEndpoint={`/faculty/view/${facultyId}/batches`}
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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../../utils/API";
import ViewSubMark from "../../../components/common/ViewSubMark";

export default function ViewMarksSubject() {
  const [subid, setSubid] = useState<number | null>(null);
  const [degid, setDegid] = useState<number | null>(null);
  const [branchid, setBranchid] = useState<number | null>(null);
  const [fetchError, setFetchError] = useState("");
  const faculty = JSON.parse(localStorage.getItem("faculty") || "{}");
  const { facid } = faculty;
  const { subCode } = useParams();

  useEffect(() => {
    const fetchIds = async () => {
      try {
        const subjectRes = await API.get(
          `/admin/manage/subject/subCode/${subCode}`
        );
        console.log("Subject Response:", subjectRes.data);

        const assignRes = await API.get(
          `/faculty/assignedSub/facSub/${facid}/${subjectRes.data.subid}`
        );
        console.log("Assigned Response:", assignRes.data);

        setSubid(subjectRes.data.subid);
        setDegid(assignRes.data.degid);
        setBranchid(assignRes.data.branch);
      } catch (error) {
        console.error("Error fetching identifiers:", error);
        setFetchError("Failed to load data. Please try again.");
      }
    };

    if (subCode && facid) {
      fetchIds();
    }
  }, [subCode, facid]);

  if (fetchError) return <div className="text-red-500">{fetchError}</div>;

  if (!subid || !degid || !branchid) {
    return (
      <div className="text-yellow-600">
        <p>Waiting for IDs...</p>
        <p>subid: {subid}</p>
        <p>degid: {degid}</p>
        <p>branchid: {branchid}</p>
      </div>
    );
  }

  return (
    <div>
      <ViewSubMark
        entityName="View Marks By Subject"
        apiEndpoint={`/faculty/marks/${facid}/${subCode}/${degid}/${branchid}`}
        columns={[
          { label: "Reg No", key: "regNo" },
          { label: "Name", key: "sName" },
          { label: "Main Criteria", key: "criteriaName" },
          { label: "Sub Criteria", key: "subCriteria" },
          { label: "Marks", key: "enteredMark" },
        ]}
        initialState={{}}
        uniqueKey="regNo"
      />
    </div>
  );
}

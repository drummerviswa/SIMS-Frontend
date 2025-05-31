import { useParams } from "react-router";
import ViewMarksTable from "../../../components/common/ViewMarksTable";
import { useEffect, useState } from "react";
import API from "../../../utils/API";

export default function ViewMarksByAssessment() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const { subCode, batchName, tenure, msid } = useParams();

  const facultyRaw = localStorage.getItem("faculty");
  const facultyData = facultyRaw ? JSON.parse(facultyRaw) : null;
  const facultyId = facultyData?.facid;

  const [subid, setSubid] = useState(null);
  const [batchid, setBatchid] = useState(null);
  const [degid, setDegid] = useState(null);
  const [bid, setBid] = useState(null);
  const [regulation, setRegulation] = useState("");

  useEffect(() => {
    const fetchRegulation = async () => {
      try {
        const response = await API.get(
          `/admin/manage/subject/subBatch/${subCode}/${batchName}`
        );

        setRegulation(response.data.regName);
        console.log("Subjects fetched successfully:", response.data.regName);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegulation();
  }, []);

  // Fetch all required IDs
  useEffect(() => {
    const fetchIds = async () => {
      try {
        const subjectRes = await API.get(
          `/admin/manage/subject/subCode/${subCode}`
        );
        const batchRes = await API.get(
          `/admin/manage/batch/batchName/${batchName}`
        );
        const assignRes = await API.get(
          `/faculty/assignedSub/facSub/${facultyId}/${subjectRes.data.subid}`
        );

        setSubid(subjectRes.data.subid);
        setBatchid(batchRes.data.batchid);
        setDegid(assignRes.data.degid);
        setBid(assignRes.data.bid);
      } catch (error) {
        console.error("Error fetching identifiers:", error);
        setFetchError("Failed to load data. Please try again.");
      }
    };

    if (subCode && batchName && facultyId) {
      fetchIds();
    }
  }, [subCode, batchName, facultyId]);

  // Load marks data once all IDs are available
  useEffect(() => {
    const loadData = async () => {
      if (subid && batchid && degid && bid) {
        try {
          if (tenure !== "assignment") {
            const res = await API.get(
              `/faculty/marks/${facultyId}/${subid}/${tenure}/${batchid}/${degid}/${bid}/${msid}`
            );

            let enrichedData;

            console.log("Students response:", res.data);
            if (res.data.length === 0) {
              // 📌 No marks exist yet → fetch student list separately
              const studentsRes = await API.get(
                `/faculty/marks/${facultyId}/${subid}/${tenure}/${batchid}/${degid}/${bid}/${msid}` // <-- This is just an example URL. Adjust it to your real "student list" API endpoint
              );

              enrichedData = studentsRes.data.map((student) => ({
                regNo: student.regNo,
                sName: student.sName,
                criteriaName: "",
                subject: student.subject,
                mainCriteria: student.mainCriteria,
                tenure: student.tenure,
                MainWeightage: 0,
                SubCriteriaBreakdown: [], // initially empty, you'll handle subcriteria inside DynamicMarkTable
                total: 0,
              }));
            } else {
              enrichedData = res.data.map((student) => ({
                regNo: student.regNo,
                sName: student.sName,
                subject: student.subject,
                mainCriteria: student.mainCriteria,
                tenure: student.tenure,
                criteriaName: student.criteriaName,
                MainWeightage: student.mainWeightage,
                SubCriteriaBreakdown: student.SubCriteriaBreakdown,
              }));
              console.log("Enriched data:", enrichedData);
            }

            setData(enrichedData);
          } else {
            const res = await API.get(
              `/faculty/marks/other/${facultyId}/${subid}/${tenure}/${batchid}/${degid}/${bid}/${msid}` // <-- This is just an example URL. Adjust it to your real "student list" API endpoint
            );

            let enrichedData;

            console.log("Students response:", res.data);
            if (res.data.length === 0) {
              // 📌 No marks exist yet → fetch student list separately
              const studentsRes = await API.get(
                `/faculty/marks/other/${facultyId}/${subid}/${tenure}/${batchid}/${degid}/${bid}/${msid}` // <-- This is just an example URL. Adjust it to your real "student list" API endpoint
              );

              enrichedData = studentsRes.data.map((student) => ({
                regNo: student.regNo,
                sName: student.sName,
                criteriaName: "",
                subject: student.subject,
                mainCriteria: student.mainCriteria,
                tenure: student.tenure,
                MainWeightage: 0,
                SubCriteriaBreakdown: [], // initially empty, you'll handle subcriteria inside DynamicMarkTable
                total: 0,
              }));
            } else {
              enrichedData = res.data.map((student) => ({
                regNo: student.regNo,
                sName: student.sName,
                subject: student.subject,
                mainCriteria: student.mainCriteria,
                tenure: student.tenure,
                criteriaName: student.criteriaName,
                MainWeightage: student.mainWeightage,
                SubCriteriaBreakdown: student.SubCriteriaBreakdown,
              }));
              console.log("Enriched data:", enrichedData);
            }

            setData(enrichedData);
          }
        } catch (error) {
          console.error("Error loading marks:", error);
          setFetchError("Failed to load marks.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [subid, batchid, degid, bid, tenure, facultyId, msid]);

  if (loading) return <div>Loading student marks...</div>;
  if (fetchError) return <div>{fetchError}</div>;
  return (
    <div className="flex-1 justify-center items-center">
      <div className="rounded-xl shadow-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        {/* <ViewMarksTable  /> */}
        {subCode} - {tenure}
        {/* Make a table for displaying the marks */}
        <ViewMarksTable data={data} submitURL="" />
      </div>
    </div>
  );
}

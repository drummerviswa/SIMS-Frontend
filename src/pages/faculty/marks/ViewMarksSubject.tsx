import { useEffect, useState, useMemo } from "react";
import API from "../../../utils/API";
import CombinedMarksTable from "../../../components/common/CombinedMarksTable";
import { useParams } from "react-router";
import TotalMarksTable from "../../../components/common/TotalMarksTable";

export default function ViewCombinedMarksBySubject() {
  const [marks, setMarks] = useState([]);
  const [combinedMarks, setCombinedMarks] = useState([]);
  const [subjectInfo, setSubjectInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Memoize faculty so it doesn't recreate on every render
  const faculty = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("faculty"));
    } catch {
      return null;
    }
  }, []);

  const { subCode } = useParams();

  // Fetch assigned subject info for the faculty
  useEffect(() => {
    if (!faculty) return;

    let isMounted = true;
    const fetchSubject = async () => {
      try {
        const res = await API.get(`/faculty/assignedSub/${faculty.facid}`);
        if (!isMounted) return;

        const match = res.data.find((s) => s.subCode === subCode);
        setSubjectInfo(match || null);
      } catch (err) {
        console.error("Error fetching subject:", err);
      }
    };

    fetchSubject();

    return () => {
      isMounted = false;
    };
  }, [subCode, faculty?.facid]);

  // Fetch combined marks when subjectInfo or faculty changes
  useEffect(() => {
    if (!subjectInfo || !faculty) return;

    let isMounted = true;
    setLoading(true);

    const { degree, branch, batch, subject } = subjectInfo;

    API.get(
      `/faculty/marks/combined/${faculty.facid}/${subject}/${degree}/${branch}/${batch}`
    )
      .then((res) => {
        if (!isMounted) return;
        setCombinedMarks(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [subjectInfo, faculty?.facid]);

  // Fetch total marks when subjectInfo or faculty changes
  useEffect(() => {
    if (!subjectInfo || !faculty) return;

    let isMounted = true;
    setLoading(true);

    const { degree, branch, batch, subject } = subjectInfo;

    API.get(
      `/faculty/marks/total/${faculty.facid}/${subject}/${degree}/${branch}/${batch}`
    )
      .then((res) => {
        if (!isMounted) return;
        setMarks(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [subjectInfo, faculty?.facid]);

  if (loading || !subjectInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6">
      <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {subjectInfo.subName} ({subjectInfo.subCode})
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>Batch: {subjectInfo.batchName} | </span>
          <span>Degree: {subjectInfo.degSym} | </span>
          <span>Sem: {subjectInfo.semester} | </span>
          <span>Regulation: {subjectInfo.regName}</span>
        </p>
        <TotalMarksTable marks={marks} regulation={subjectInfo.regName} />

        <CombinedMarksTable rawMarks={combinedMarks} regulation={subjectInfo.regName} />

      </div>
    </div>
  );
}

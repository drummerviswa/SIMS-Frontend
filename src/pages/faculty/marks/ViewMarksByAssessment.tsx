import { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../../utils/API";
import ViewMarksTable from "../../../components/common/ViewMarksTable";
import ViewAssessmentMarksTable from "../../../components/common/ViewAssessmentMarksTable";

export default function ViewMarksByAssessment() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markDetails, setMarkDetails] = useState([]);
  const [currentSubject, setCurrentSubject] = useState(null);

  const facultyDetails = JSON.parse(localStorage.getItem("faculty"));
  const facultyId = facultyDetails["facid"];
  const { subCode, tenure } = useParams();

  // Fetch Subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await API.get(`/faculty/assignedSub/${facultyId}`);
        setSubjects(response.data);
        console.log("Subjects fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [facultyId]);

  // Set currentSubject after subjects are loaded
  useEffect(() => {
    if (subjects.length > 0) {
      const foundSubject = subjects.find(
        (subject) => subject.subCode === subCode
      );
      if (foundSubject) {
        setCurrentSubject(foundSubject);
      }
    }
  }, [subjects, subCode]);

  // Fetch Marks once currentSubject is set
  useEffect(() => {
    const fetchMarks = async () => {
      if (!currentSubject) return;

      try {
        const { batch, degree, branch, subject } = currentSubject;
        const response =
          tenure !== "assignment"
            ? await API.get(
                `/faculty/marks/assessment/${facultyId}/${subject}/${tenure}/${batch}/${degree}/${branch}`
              )
            : await API.get(
                `/faculty/marks/assignment/${facultyId}/${subject}/${batch}/${degree}/${branch}`
              );
        setMarkDetails(response.data);
        console.log("Marks fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching marks:", error);
      }
    };

    fetchMarks();
  }, [currentSubject, facultyId, subCode, tenure]);
  console.log("Current Subject:", currentSubject);

  return (
    <div className="flex-1 justify-center items-center">
      <div className="rounded-xl shadow-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        {subjects.length > 0 &&
          subjects.map(
            (subject, index) =>
              subject.subCode === subCode && (
                <div key={index}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-400">
                    {subject.subName} - {subject.subCode}
                  </h2>
                  <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-400">
                    {tenure === "assess1"
                      ? "Assessment 1"
                      : tenure === "assignment"
                      ? "Assignment"
                      : "Assessment 2"}
                  </h1>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex flex-row gap-4">
                    <h6>
                      <em className="font-semibold underline text-gray-900 dark:text-gray-400">
                        Batch:
                      </em>{" "}
                      {subject.batchName}
                    </h6>
                    <h3>
                      <em className="font-semibold underline text-gray-900 dark:text-gray-400">
                        Degree:
                      </em>{" "}
                      {subject.degSym}
                    </h3>
                    <h3>
                      <em className="font-semibold underline text-gray-900 dark:text-gray-400">
                        Semester:
                      </em>{" "}
                      {subject.semester}
                    </h3>
                    <h3>
                      <em className="font-semibold underline text-gray-900 dark:text-gray-400">
                        Regulation:
                      </em>{" "}
                      {subject.regName}
                    </h3>
                  </span>
                  {/* Splitup */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-400 mt-4">
                    Marks Splitup
                  </h3>
                  <div className="flex flex-col gap-2 ps-6">
                    Total: {currentSubject && currentSubject[tenure]}
                  </div>
                  <ViewAssessmentMarksTable rawData={markDetails} />
                </div>
              )
          )}
      </div>
    </div>
  );
}

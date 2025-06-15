// src/pages/faculty/ViewMarksByStudent.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../../utils/API";
import CombinedMarksTable from "../../../components/common/CombinedMarksTable";

export default function ViewMarksByStudent() {
  const { subCode, regNo } = useParams();
  const [marks, setMarks] = useState([]);
  const [student, setStudent] = useState(null);
  const [regulation, setRegulation] = useState("");
  const [loading, setLoading] = useState(true);
  const facultyDetails = JSON.parse(localStorage.getItem("faculty"));
  const facultyId = facultyDetails["facid"];

  useEffect(() => {
    const fetchStudentMarks = async () => {
      try {
        const response = await API.get(
          `/faculty/marks/student/${facultyId}/${subCode}/${regNo}`
        );
        setMarks(response.data.marks);
        setStudent(response.data.student);
        setRegulation(response.data.regulation || "R2021");
      } catch (err) {
        console.error("Error fetching student marks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentMarks();
  }, [facultyId, subCode, regNo]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Marks</h1>
      {loading ? (
        <p>Loading...</p>
      ) : !student ? (
        <p>Student not found.</p>
      ) : (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            {student.sname} ({student.regNo})
          </h2>
          <CombinedMarksTable rawMarks={marks} regulation={regulation} />
        </div>
      )}
    </div>
  );
}

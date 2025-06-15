import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../../utils/API";
import CombinedMarksTable from "../../../components/common/CombinedMarksTable";

export default function ViewMarksStudentList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentMarks, setStudentMarks] = useState(null);
  const [totalMarks, setTotalMarks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marksLoading, setMarksLoading] = useState(false);
  const [subjectId, setSubjectId] = useState(null);

  const faculty = JSON.parse(localStorage.getItem("faculty"));
  const facultyId = faculty?.facid;
  const { subCode } = useParams();

  // 1. Get subjectId from subCode
  useEffect(() => {
    const fetchSubjectId = async () => {
      try {
        const res = await API.get(`/admin/manage/subject/subCode/${subCode}`);
        const subid = res.data.subid;
        if (!subid) throw new Error("No subject ID returned");
        setSubjectId(subid);
      } catch (error) {
        console.error("Error fetching subject ID:", error);
        setLoading(false);
      }
    };
    fetchSubjectId();
  }, [subCode]);

  // 2. Fetch students for the subject
  useEffect(() => {
    if (!subjectId) return;

    const fetchStudents = async () => {
      try {
        const res = await API.get(
          `/faculty/marks/students/${facultyId}/${subjectId}`
        );
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching student list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [facultyId, subjectId]);

  // 3. Fetch marks & total marks for selected student
  useEffect(() => {
    if (!selectedStudent || !subjectId) return;

    const fetchStudentMarks = async () => {
      setMarksLoading(true);
      try {
        const res = await API.get(
          `/faculty/marks/student/${facultyId}/${subjectId}/${selectedStudent.regNo}`
        );
        setStudentMarks(res.data.marks);
        setTotalMarks(res.data.totalMarks);
      } catch (error) {
        console.error("Error fetching student marks:", error);
      } finally {
        setMarksLoading(false);
      }
    };

    fetchStudentMarks();
  }, [selectedStudent, facultyId, subjectId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Students List</h2>

      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-200 dark:border-gray-700 text-sm mb-8">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Reg No</th>
              <th className="px-4 py-2 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.regNo}
                onClick={() => {
                  setSelectedStudent(student);
                  setStudentMarks(null);
                  setTotalMarks(null);
                }}
                className={`cursor-pointer ${
                  selectedStudent?.regNo === student.regNo
                    ? "bg-blue-100 dark:bg-gray-700"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <td className="px-4 py-2 border-t dark:border-gray-700">
                  {student.regNo}
                </td>
                <td className="px-4 py-2 border-t dark:border-gray-700">
                  {student.sname}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedStudent && marksLoading && (
        <p className="text-sm text-gray-500">
          Fetching marks for {selectedStudent.sname}...
        </p>
      )}

      {studentMarks && selectedStudent && (
  <div>
    <h3 className="text-lg font-semibold mb-2">
      Marks for {selectedStudent.sname} ({selectedStudent.regNo})
    </h3>

    {Object.entries(
      studentMarks.reduce((acc, markEntry) => {
        // Group marks by tenure
        if (!acc[markEntry.tenure]) acc[markEntry.tenure] = [];
        acc[markEntry.tenure].push(markEntry);
        return acc;
      }, {})
    ).map(([tenure, marksInTenure]) => {
      // Group marks by type (assessment, assignment, etc.)
      const marksByType = marksInTenure.reduce((typeAcc, mark) => {
        const type = mark.type || "assessment";
        if (!typeAcc[type]) typeAcc[type] = [];
        typeAcc[type].push(mark);
        return typeAcc;
      }, {});

      // Helper to group marks by criteriaName & mainWeightage, combining subcriteria
      const groupByCriteria = (marks) => {
        const map = new Map();
        marks.forEach((m) => {
          const key = `${m.criteriaName}__${m.mainWeightage}`;
          if (!map.has(key)) {
            map.set(key, { 
              criteriaName: m.criteriaName, 
              mainWeightage: m.mainWeightage, 
              StudentMarksBreakdown: [] 
            });
          }
          // Add all subcriteria for this mark object
          map.get(key).StudentMarksBreakdown.push(...m.StudentMarksBreakdown);
        });

        // Deduplicate subcriteria rows within each criteria (important!)
        // We can use a key like `${subCriteria}__${enteredMark}__${isLocked}` to filter
        for (const group of map.values()) {
          const uniqueSubs = new Map();
          group.StudentMarksBreakdown.forEach((detail) => {
            const subKey = `${detail.subCriteria}__${detail.enteredMark}__${detail.isLocked}`;
            if (!uniqueSubs.has(subKey)) uniqueSubs.set(subKey, detail);
          });
          group.StudentMarksBreakdown = Array.from(uniqueSubs.values());
        }

        return Array.from(map.values());
      };

      // Calculate subtotal (marks sum, criteria weightage once)
      const calculateSubtotal = (group) => {
        const marksObtained = group.StudentMarksBreakdown.reduce(
          (sum, detail) => sum + (detail.enteredMark ?? 0),
          0
        );
        const outOf = group.mainWeightage ?? 0;
        return { marksObtained, outOf };
      };

      // Calculate grand total for the entire tenure (sum subtotals)
      // but sum criteria weightage only once per unique criteria!
      const grandTotal = Object.values(marksByType).reduce(
        (acc, marks) => {
          const grouped = groupByCriteria(marks);
          grouped.forEach((group) => {
            const subtotal = calculateSubtotal(group);
            acc.marksObtained += subtotal.marksObtained;
            acc.outOf += subtotal.outOf;
          });
          return acc;
        },
        { marksObtained: 0, outOf: 0 }
      );

      return (
        <div key={tenure} className="mb-6">
          <h4 className="text-md font-semibold mb-2 border-b pb-1 border-gray-300">
            Tenure: {tenure}
          </h4>

          {Object.entries(marksByType).map(([type, marks]) => {
            const groupedMarks = groupByCriteria(marks);

            return (
              <div key={type} className="mb-4">
                <h5 className="font-semibold capitalize mb-1">{type}</h5>

                {groupedMarks.map((group) => {
                  const subtotal = calculateSubtotal(group);

                  return (
                    <div key={group.criteriaName + group.mainWeightage} className="mb-3">
                      <table className="min-w-full table-auto border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-3 py-1 text-left">Criteria</th>
                            <th className="px-3 py-1 text-left">Weightage</th>
                            <th className="px-3 py-1 text-left">Sub-Criteria</th>
                            <th className="px-3 py-1 text-left">Mark</th>
                            <th className="px-3 py-1 text-left">Locked</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.StudentMarksBreakdown.map((detail, idx) => (
                            <tr key={idx} className="border-t border-gray-200">
                              <td className="px-3 py-1">{group.criteriaName}</td>
                              <td className="px-3 py-1">{group.mainWeightage}</td>
                              <td className="px-3 py-1">{detail.subCriteria}</td>
                              <td className="px-3 py-1">
                                {detail.enteredMark ?? 0} / {detail.subWeightage ?? group.mainWeightage}
                              </td>
                              <td className="px-3 py-1">{detail.isLocked ? "Yes" : "No"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="mt-1 font-semibold text-right">
                        Subtotal {group.criteriaName}:{" "}
                        <span className="text-blue-600">
                          {subtotal.marksObtained} / {subtotal.outOf}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}

          <p className="mt-2 font-bold text-right border-t pt-2 border-gray-300">
            Grand Total:{" "}
            <span className="text-green-700">
              {grandTotal.marksObtained} / {grandTotal.outOf}
            </span>
          </p>
        </div>
      );
    })}
  </div>
)}

    </div>
  );
}

import React, { useEffect } from "react";
import MarkCard from "../../../components/common/MarkCard";
import API from "../../../utils/API";

type Subject = {
  degName: string;
  branchName: string;
  [key: string]: string | number;
};
export default function MarksSubject() {
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [loading, setLoading] = React.useState(true);
  const faculty = localStorage.getItem("faculty");
  const facultyData = JSON.parse(faculty);
  const facultyId = facultyData["facid"];
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
  }, []);

  // Grouping by degName and branchName
  const groupedSubjects: Record<string, Subject[]> = subjects.reduce(
    (acc, subject) => {
      const key = `${subject.degName}__${subject.branchName}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(subject);
      return acc;
    },
    {} as Record<string, Subject[]>
  );

  return (
    <div className="flex flex-col gap-6 p-4 w-full h-full">
      {Object.entries(groupedSubjects).map(([key, group]) => {
        const [degName, branchName] = key.split("__");
        return (
          <div
            key={key}
            className="rounded-xl p-4 shadow-md bg-gray-50 dark:bg-gray-dark border border-white/20"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-600 dark:text-white">
              {degName} - {branchName}
            </h2>
            <div className="flex flex-wrap gap-4">
              {group.map((sub, index) => (
                <MarkCard
                  key={index}
                  acid={sub.subject}
                  subName={sub.subName}
                  subCode={sub.subCode}
                  type={sub.type}
                  cperiod={sub.cperiod}
                  assess1={sub.assess1}
                  assess2={sub.assess2}
                  endsem={sub.endsem}
                  l={sub.l}
                  t={sub.t}
                  p={sub.p}
                  c={sub.c}
                  batchName={sub.batchName}
                  semester={sub.semester}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

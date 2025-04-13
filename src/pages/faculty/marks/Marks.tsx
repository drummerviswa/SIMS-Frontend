import React from "react";
import API from "../../../utils/API";
import SplitCard from "../../../components/common/SplitCard";

export default function Marks() {
  const [subjects, setSubjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await API.get(`/faculty/assignedSub/${1}`);
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
  const groupedSubjects = subjects.reduce((acc, subject) => {
    const key = `${subject.degName}__${subject.branchName}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(subject);
    return acc;
  }, {});
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
                <SplitCard key={index} {...sub} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

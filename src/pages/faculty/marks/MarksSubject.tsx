import React from "react";
import MarkCard from "../../../components/common/MarkCard";

export default function MarksSubject() {
  const groupedSubjects = [
    {
      degree: "M.Sc Integrated Information Technology",
      subjects: [
        {
          batchName: "2022-2027",
          subCode: "XC5251",
          subName: "Data Structures",
          subType: "Theory",
          subHours: 45,
          internal: 40,
          external: 60,
          lecture: 3,
          tutorial: 0,
          practical: 0,
          credit: 3,
        },
        {
          batchName: "2022-2027",
          subCode: "XC5252",
          subName: "Computer Networks",
          subType: "Theory",
          subHours: 45,
          internal: 40,
          external: 60,
          lecture: 3,
          tutorial: 0,
          practical: 0,
          credit: 3,
        }
      ],
    },
    {
      degree: "B.E. Computer Science",
      subjects: [
        {
          batchName: "2021-2025",
          subCode: "CS5201",
          subName: "OOPS",
          subType: "Theory",
          subHours: 40,
          internal: 30,
          external: 70,
          lecture: 3,
          tutorial: 1,
          practical: 0,
          credit: 4,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 w-full h-full">
      {groupedSubjects.map(({ degree, subjects }) => (
        <div
          key={degree}
          className={`rounded-xl p-4 shadow-md bg-gray-50 dark:bg-gray-dark border border-white/20`}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-600 dark:text-white">{degree}</h2>
          <div className="flex flex-wrap gap-4">
            {subjects.map((sub, index) => (
              <MarkCard key={index} {...sub} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

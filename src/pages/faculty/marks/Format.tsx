import { motion } from "framer-motion";
import { useParams } from "react-router";

function Format() {
  const { regName } = useParams<{ regName: string }>();
  return (
    <div>
      {regName === "R2019" ? (
        <div className="space-y-8 p-4">
          <h1 className="text-2xl font-bold text-center dark:text-white">R2019</h1>
          <motion.table className="w-full border-collapse border">
            <motion.caption className="text-lg mb-2 dark:text-white">
              Course Evaluation Pattern
            </motion.caption>
            <motion.thead>
              <motion.tr>
                <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                  S.No
                </motion.th>
                <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                  Category of course
                </motion.th>
                <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                  Continuous Assessment
                </motion.th>
                <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                  End Semester Examination
                </motion.th>
              </motion.tr>
            </motion.thead>
            <motion.tbody>
              {[
                ["1", "Theory Courses", "40 marks", "60 marks"],
                ["2", "Lab Courses", "50 marks", "50 marks"],
                ["3", "Laboratory Courses", "60 marks", "40 marks"],
                ["4", "Project Work", "60 marks", "40 marks"],
                ["5", "Other EEC Courses", "100 marks", "-"],
              ].map(([sno, category, ca, ese]) => (
                <motion.tr key={sno}>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    {sno}
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    {category}
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    {ca}
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    {ese}
                  </motion.td>
                </motion.tr>
              ))}
            </motion.tbody>
          </motion.table>
          <div className="p-4">
            <motion.table className="w-full border-collapse border text-center">
              <motion.caption className="text-lg mb-2 dark:text-white">
                Continuous Assessment Pattern
              </motion.caption>
              <motion.thead>
                <motion.tr>
                  <motion.th
                    className="border p-2 dark:border-gray-700 dark:text-white"
                    colSpan={2}
                  >
                    Assessment I <br /> (100 Marks)
                  </motion.th>
                  <motion.th
                    className="border p-2 dark:border-gray-700 dark:text-white"
                    colSpan={2}
                  >
                    Assessment II <br /> (100 Marks)
                  </motion.th>
                  <motion.th
                    className="border p-2 dark:border-gray-700 dark:text-white"
                    rowSpan={2}
                  >
                    <strong>Total</strong> <br /> Internal <br /> Assessment
                  </motion.th>
                </motion.tr>
                <motion.tr>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Individual Assignment / Case Study / Seminar / Mini Project
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Written Test
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Individual Assignment / Case Study / Seminar / Mini Project
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Written Test
                  </motion.th>
                </motion.tr>
              </motion.thead>
              <motion.tbody>
                <motion.tr>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    40
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    60
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    40
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    60
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    200*
                  </motion.td>
                </motion.tr>
              </motion.tbody>
            </motion.table>
          </div>
          <div className="p-4">
            <motion.table className="w-full border-collapse border text-center">
              <motion.caption className="text-lg font-semibold mb-2 dark:text-white">
                Project Work Evaluation Pattern
              </motion.caption>
              <motion.thead>
                <motion.tr>
                  <motion.th
                    className="border p-2 dark:border-gray-700 dark:text-white"
                    rowSpan={2}
                  >
                    Project Work
                  </motion.th>
                  <motion.th
                    className="border p-2 dark:border-gray-700 dark:text-white"
                    colSpan={3}
                  >
                    Internal (60 Marks)
                  </motion.th>
                  <motion.th
                    className="border p-2 dark:border-gray-700 dark:text-white"
                    colSpan={3}
                  >
                    External (40 Marks)
                  </motion.th>
                </motion.tr>
                <motion.tr>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Review I
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Review II
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Review III
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Project Evaluation (External)
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Viva – Voce (External)
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Viva – Voce (Internal)
                  </motion.th>
                </motion.tr>
              </motion.thead>
              <motion.tbody>
                <motion.tr>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    Project work
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    10
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    20
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    30
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    20
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    10
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    10
                  </motion.td>
                </motion.tr>
              </motion.tbody>
            </motion.table>
          </div>
        </div>
      ) : (
        <div className="space-y-8 p-4">
          <h1 className="text-2xl font-bold text-center  dark:text-white">R2023</h1>
          <motion.table className="w-full border-collapse border">
            <motion.caption className="text-lg mb-2 dark:text-white">
              Course Evaluation Pattern
            </motion.caption>
            <motion.thead>
              <motion.tr>
                <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                  S.No
                </motion.th>
                <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                  Category of course
                </motion.th>
                <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                  Continuous Assessment
                </motion.th>
                <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                  End Semester Examination
                </motion.th>
              </motion.tr>
            </motion.thead>
            <motion.tbody>
              {[
                ["1", "Theory Courses", "40 marks", "60 marks"],
                ["2", "Lab Courses", "50 marks", "50 marks"],
                ["3", "Laboratory Courses", "60 marks", "40 marks"],
                ["4", "Project Work", "60 marks", "40 marks"],
                ["5", "Other EEC Courses", "100 marks", "-"],
              ].map(([sno, category, ca, ese]) => (
                <motion.tr key={sno}>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    {sno}
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    {category}
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    {ca}
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    {ese}
                  </motion.td>
                </motion.tr>
              ))}
            </motion.tbody>
          </motion.table>
          <div className="p-4">
            <motion.table className="w-full border-collapse border text-center">
              <motion.caption className="text-lg mb-2 dark:text-white">
                Continuous Assessment Pattern
              </motion.caption>
              <motion.thead>
                <motion.tr>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Assessment I <br /> (100 Marks)
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Assessment II <br /> (100 Marks)
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Individual Assignment / Case Study / Seminar / Mini Project
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Total*
                  </motion.th>
                </motion.tr>
              </motion.thead>
              <motion.tbody>
                <motion.tr>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    40%
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    40%
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    20%
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    100%
                  </motion.td>
                </motion.tr>
              </motion.tbody>
            </motion.table>
          </div>
          <div className="p-4">
            <motion.table className="w-full border-collapse border text-center">
              <motion.caption className="text-lg mb-2 dark:text-white">
                Continuous Assessment Pattern for Project Work
              </motion.caption>
              <motion.thead>
                <motion.tr>
                  <motion.th
                    className="border p-2 dark:border-gray-700 dark:text-white"
                    colSpan={2}
                  >
                    Continuous Assessment <br /> (100 %)
                  </motion.th>
                </motion.tr>
                <motion.tr>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Evaluation of Laboratory Observation, Record
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Mid-Term Test
                  </motion.th>
                </motion.tr>
              </motion.thead>
              <motion.tbody>
                <motion.tr>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    75%
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    25%
                  </motion.td>
                </motion.tr>
              </motion.tbody>
            </motion.table>
          </div>
          <div className="p-4">
            <motion.table className="w-full border-collapse border text-center">
              <motion.caption className="text-lg mb-2 dark:text-white">
                Project Work Evaluation Pattern
              </motion.caption>
              <motion.thead>
                <motion.tr>
                  <motion.th
                    className="border p-2 dark:border-gray-700 dark:text-white"
                    rowSpan={2}
                  >
                    Project work
                  </motion.th>
                  <motion.th
                    className="border p-2 dark:border-gray-700 dark:text-white"
                    colSpan={3}
                  >
                    Internal (60 Marks)
                  </motion.th>
                  <motion.th
                    className="border p-2 dark:border-gray-700 dark:text-white"
                    colSpan={4}
                  >
                    External (40 Marks)
                  </motion.th>
                </motion.tr>
                <motion.tr>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Review I
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Review II
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Review III
                  </motion.th>
                  <motion.th
                    className="border p-2 dark:border-gray-700 dark:text-white"
                    colSpan={2}
                  >
                    Project Evaluation
                  </motion.th>
                  <motion.th className="border p-2" colSpan={2}>
                    Viva – Voce
                  </motion.th>
                </motion.tr>
                <motion.tr>
                  <motion.th
                    className="border p-2 dark:border-gray-700 dark:text-white"
                    colSpan={4}
                  ></motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Supervisor
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    External
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    External
                  </motion.th>
                  <motion.th className="border p-2 dark:border-gray-700 dark:text-white">
                    Internal
                  </motion.th>
                </motion.tr>
              </motion.thead>
              <motion.tbody>
                <motion.tr>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    Project work
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    10
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    20
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    30
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    10
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    10
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    10
                  </motion.td>
                  <motion.td className="border p-2 dark:border-gray-700 dark:text-white">
                    10
                  </motion.td>
                </motion.tr>
              </motion.tbody>
            </motion.table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Format;

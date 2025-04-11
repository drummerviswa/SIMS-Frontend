import { motion } from "framer-motion";
import { useParams } from "react-router";

function Format() {
  const { regName } = useParams<{ regName: string }>();
  return (
    <div>
      {regName === "R2019" ? (
        <div className="space-y-8 p-4">
          <h1 className="text-2xl font-bold text-center">R2019</h1>
          <motion.table className="w-full border-collapse border">
            <motion.caption className="text-lg mb-2">
              Course Evaluation Pattern
            </motion.caption>
            <motion.thead>
              <motion.tr>
                <motion.th className="border p-2">S.No</motion.th>
                <motion.th className="border p-2">Category of course</motion.th>
                <motion.th className="border p-2">
                  Continuous Assessment
                </motion.th>
                <motion.th className="border p-2">
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
                  <motion.td className="border p-2">{sno}</motion.td>
                  <motion.td className="border p-2">{category}</motion.td>
                  <motion.td className="border p-2">{ca}</motion.td>
                  <motion.td className="border p-2">{ese}</motion.td>
                </motion.tr>
              ))}
            </motion.tbody>
          </motion.table>
          <div className="p-4">
            <motion.table className="w-full border-collapse border text-center">
              <motion.caption className="text-lg mb-2">
                Continuous Assessment Pattern
              </motion.caption>
              <motion.thead>
                <motion.tr>
                  <motion.th className="border p-2" colSpan={2}>
                    Assessment I <br /> (100 Marks)
                  </motion.th>
                  <motion.th className="border p-2" colSpan={2}>
                    Assessment II <br /> (100 Marks)
                  </motion.th>
                  <motion.th className="border p-2" rowSpan={2}>
                    <strong>Total</strong> <br /> Internal <br /> Assessment
                  </motion.th>
                </motion.tr>
                <motion.tr>
                  <motion.th className="border p-2">
                    Individual Assignment / Case Study / Seminar / Mini Project
                  </motion.th>
                  <motion.th className="border p-2">Written Test</motion.th>
                  <motion.th className="border p-2">
                    Individual Assignment / Case Study / Seminar / Mini Project
                  </motion.th>
                  <motion.th className="border p-2">Written Test</motion.th>
                </motion.tr>
              </motion.thead>
              <motion.tbody>
                <motion.tr>
                  <motion.td className="border p-2">40</motion.td>
                  <motion.td className="border p-2">60</motion.td>
                  <motion.td className="border p-2">40</motion.td>
                  <motion.td className="border p-2">60</motion.td>
                  <motion.td className="border p-2">200*</motion.td>
                </motion.tr>
              </motion.tbody>
            </motion.table>
          </div>
          <div className="p-4">
            <motion.table className="w-full border-collapse border text-center">
              <motion.caption className="text-lg font-semibold mb-2">
                Project Work Evaluation Pattern
              </motion.caption>
              <motion.thead>
                <motion.tr>
                  <motion.th className="border p-2" rowSpan={2}>
                    Project Work
                  </motion.th>
                  <motion.th className="border p-2" colSpan={3}>
                    Internal (60 Marks)
                  </motion.th>
                  <motion.th className="border p-2" colSpan={3}>
                    External (40 Marks)
                  </motion.th>
                </motion.tr>
                <motion.tr>
                  <motion.th className="border p-2">Review I</motion.th>
                  <motion.th className="border p-2">Review II</motion.th>
                  <motion.th className="border p-2">Review III</motion.th>
                  <motion.th className="border p-2">
                    Project Evaluation (External)
                  </motion.th>
                  <motion.th className="border p-2">
                    Viva – Voce (External)
                  </motion.th>
                  <motion.th className="border p-2">
                    Viva – Voce (Internal)
                  </motion.th>
                </motion.tr>
              </motion.thead>
              <motion.tbody>
                <motion.tr>
                  <motion.td className="border p-2">Project work</motion.td>
                  <motion.td className="border p-2">10</motion.td>
                  <motion.td className="border p-2">20</motion.td>
                  <motion.td className="border p-2">30</motion.td>
                  <motion.td className="border p-2">20</motion.td>
                  <motion.td className="border p-2">10</motion.td>
                  <motion.td className="border p-2">10</motion.td>
                </motion.tr>
              </motion.tbody>
            </motion.table>
          </div>
        </div>
      ) : (
        <div className="space-y-8 p-4">
          <h1 className="text-2xl font-bold text-center">R2023</h1>
          <motion.table className="w-full border-collapse border">
            <motion.caption className="text-lg mb-2">
              Course Evaluation Pattern
            </motion.caption>
            <motion.thead>
              <motion.tr>
                <motion.th className="border p-2">S.No</motion.th>
                <motion.th className="border p-2">Category of course</motion.th>
                <motion.th className="border p-2">
                  Continuous Assessment
                </motion.th>
                <motion.th className="border p-2">
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
                  <motion.td className="border p-2">{sno}</motion.td>
                  <motion.td className="border p-2">{category}</motion.td>
                  <motion.td className="border p-2">{ca}</motion.td>
                  <motion.td className="border p-2">{ese}</motion.td>
                </motion.tr>
              ))}
            </motion.tbody>
          </motion.table>
          <div className="p-4">
            <motion.table className="w-full border-collapse border text-center">
              <motion.caption className="text-lg mb-2">
                Continuous Assessment Pattern
              </motion.caption>
              <motion.thead>
                <motion.tr>
                  <motion.th className="border p-2">
                    Assessment I <br /> (100 Marks)
                  </motion.th>
                  <motion.th className="border p-2">
                    Assessment II <br /> (100 Marks)
                  </motion.th>
                  <motion.th className="border p-2">
                    Individual Assignment / Case Study / Seminar / Mini Project
                  </motion.th>
                  <motion.th className="border p-2">Total*</motion.th>
                </motion.tr>
              </motion.thead>
              <motion.tbody>
                <motion.tr>
                  <motion.td className="border p-2">40%</motion.td>
                  <motion.td className="border p-2">40%</motion.td>
                  <motion.td className="border p-2">20%</motion.td>
                  <motion.td className="border p-2">100%</motion.td>
                </motion.tr>
              </motion.tbody>
            </motion.table>
          </div>
          <div className="p-4">
            <motion.table className="w-full border-collapse border text-center">
              <motion.caption className="text-lg mb-2">
                Continuous Assessment Pattern for Project Work
              </motion.caption>
              <motion.thead>
                <motion.tr>
                  <motion.th className="border p-2" colSpan={2}>
                    Continuous Assessment <br /> (100 %)
                  </motion.th>
                </motion.tr>
                <motion.tr>
                  <motion.th className="border p-2">
                    Evaluation of Laboratory Observation, Record
                  </motion.th>
                  <motion.th className="border p-2">Mid-Term Test</motion.th>
                </motion.tr>
              </motion.thead>
              <motion.tbody>
                <motion.tr>
                  <motion.td className="border p-2">75%</motion.td>
                  <motion.td className="border p-2">25%</motion.td>
                </motion.tr>
              </motion.tbody>
            </motion.table>
          </div>
          <div className="p-4">
            <motion.table className="w-full border-collapse border text-center">
              <motion.caption className="text-lg mb-2">
                Project Work Evaluation Pattern
              </motion.caption>
              <motion.thead>
                <motion.tr>
                  <motion.th className="border p-2" rowSpan={2}>
                    Project work
                  </motion.th>
                  <motion.th className="border p-2" colSpan={3}>
                    Internal (60 Marks)
                  </motion.th>
                  <motion.th className="border p-2" colSpan={4}>
                    External (40 Marks)
                  </motion.th>
                </motion.tr>
                <motion.tr>
                  <motion.th className="border p-2">Review I</motion.th>
                  <motion.th className="border p-2">Review II</motion.th>
                  <motion.th className="border p-2">Review III</motion.th>
                  <motion.th className="border p-2" colSpan={2}>
                    Project Evaluation
                  </motion.th>
                  <motion.th className="border p-2" colSpan={2}>
                    Viva – Voce
                  </motion.th>
                </motion.tr>
                <motion.tr>
                  <motion.th className="border p-2" colSpan={4}></motion.th>
                  <motion.th className="border p-2">Supervisor</motion.th>
                  <motion.th className="border p-2">External</motion.th>
                  <motion.th className="border p-2">External</motion.th>
                  <motion.th className="border p-2">Internal</motion.th>
                </motion.tr>
              </motion.thead>
              <motion.tbody>
                <motion.tr>
                  <motion.td className="border p-2">Project work</motion.td>
                  <motion.td className="border p-2">10</motion.td>
                  <motion.td className="border p-2">20</motion.td>
                  <motion.td className="border p-2">30</motion.td>
                  <motion.td className="border p-2">10</motion.td>
                  <motion.td className="border p-2">10</motion.td>
                  <motion.td className="border p-2">10</motion.td>
                  <motion.td className="border p-2">10</motion.td>
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

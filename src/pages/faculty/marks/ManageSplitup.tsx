import { motion } from "framer-motion";
import { useParams } from "react-router";

export default function ManageSplitup() {
  const { subCode, batchName } = useParams<{
    subCode: string;
    batchName: string;
  }>();
  return (
    <div>
      <div className="grid grid-cols-12 m-4">
        <div className="col-span-6 flex flex-col">
          <h1 className="text-xl font-medium">
            M.Sc Integrated Information Technology
          </h1>
          <h1 className="text-2xl font-semibold">Data Structure</h1>
          <h1 className="text-xl font-bold">XC5251</h1>
          <h1 className="text-md font-semibold">R2019</h1>
        </div>
        <motion.div className="col-span-6 overflow-x-auto rounded-lg border border-gray-200 shadow-md p-4">
          <h1 className="text-center text-2xl font-semibold text-gray-900 mb-4">
            R2019
          </h1>
          <table className="table-auto w-full text-center border-collapse border border-gray-300">
            <thead>
              <tr>
          <th className="border border-gray-300 px-4 py-2">Assessment</th>
          <th className="border border-gray-300 px-4 py-2">Assignments</th>
          <th className="border border-gray-300 px-4 py-2">Written Test</th>
          <th className="border border-gray-300 px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
          <td className="border border-gray-300 px-4 py-2">Assessment 1</td>
          <td className="border border-gray-300 px-4 py-2">40</td>
          <td className="border border-gray-300 px-4 py-2">60</td>
          <td className="border border-gray-300 px-4 py-2">100</td>
              </tr>
              <tr>
          <td className="border border-gray-300 px-4 py-2">Assessment 2</td>
          <td className="border border-gray-300 px-4 py-2">40</td>
          <td className="border border-gray-300 px-4 py-2">60</td>
          <td className="border border-gray-300 px-4 py-2">100</td>
              </tr>
              <tr>
          <td className="border border-gray-300 px-4 py-2 font-bold" colSpan={3}>
            Total Internal Assessment
          </td>
          <td className="border border-gray-300 px-4 py-2 font-bold">200</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <div className="flex items-end justify-end gap-4 text-2xl">
            Remaining marks: <span className="font-black">{100}</span>
          </div>
          <h1>Assessment - 1</h1>
          {/* Splitup - Weightage table */}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <div className="flex items-end justify-end gap-4 text-2xl">
            Remaining marks: <span className="font-black">{100}</span>
          </div>
          <h1>Assessment - 2</h1>
        </div>
      </div>
    </div>
  );
}

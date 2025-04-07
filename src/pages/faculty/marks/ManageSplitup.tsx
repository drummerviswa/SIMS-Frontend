import { motion } from "framer-motion";
import { useParams } from "react-router";

export default function ManageSplitup() {
  const { subCode, batchName } = useParams<{
    subCode: string;
    batchName: string;
  }>();
  return (
    <div>
      {/* Title infos - Degree & Branch
        Subject Name
        Subject Code 
        Subject Type
        Subject Hours
        Internal Marks
        External Marks
        LTPC of the subject
      */}
      <div className="grid grid-cols-12 m-4">
        <div className="col-span-6 flex flex-col">
          <h1 className="text-xl font-medium">
            M.Sc Integrated Information Technology
          </h1>
          <h1 className="text-2xl font-semibold">Data Structure</h1>
          <h1 className="text-xl font-bold">XC5251</h1>
          <h1 className="text-md font-semibold">R2019</h1>
        </div>
        <motion.div className="col-span-6 overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <h1 className="text-center text-2xl font-semibold text-gray-900">
            R2019
          </h1>
          <table className="w-full table-auto text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Component Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Component Weightage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Assessment 1
                </td>
                <td className="whitespace-nowrap px-6 py-4">50%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Assessment 2
                </td>
                <td className="whitespace-nowrap px-6 py-4">50%</td>
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
          {/* Splitup - Weightage table */}
        </div>
      </div>
    </div>
  );
}

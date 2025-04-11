import { motion } from "framer-motion";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdAdd, MdCreate, MdModeEdit } from "react-icons/md";
import { useParams } from "react-router";

export default function ManageSplitup() {
  const AssessSplitup = () => (
    <div className="col-span-6 flex flex-col">
      <h1 className="text-center font-bold">Assessment</h1>
      <div className="col-span-12 flex justify-end">
        <h1 className="text-xl font-bold">
          Remaining marks: <span>{40}</span>
        </h1>
      </div>
      <table className="col-span-12 bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">S.No</th>
            <th className="py-3 px-6 text-left">Splitup Name</th>
            <th className="py-3 px-6 text-left">Marks</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <th>PPT</th>
            <th>10</th>
            <th>
              <motion.button className="bg-blue-500 p-2 hover:bg-blue-700 text-white font-bold rounded">
                <MdModeEdit />
              </motion.button>
              <motion.button className="bg-red-500 p-2 hover:bg-red-700 text-white font-bold rounded ml-2">
                <FaDeleteLeft />
              </motion.button>
            </th>
          </tr>
          <tr>
            <th></th>
            <th>
              <motion.select className="border text-center w-full">
                <option value="">Select the splitup</option>
                <option value="PPT">PPT</option>
                <option value="Assignment">Assignment</option>
                <option value="Quiz">Quiz</option>
                <option value="Mid Sem">Mid Sem</option>
                <option value="End Sem">End Sem</option>
                <option value="Project">Project</option>
              </motion.select>
            </th>
            <th>
              <input
                className="border text-center w-full"
                type="number"
                name="marks"
                onAnimationEnd={() => {}}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                placeholder="Marks"
                min={0}
                max={10}
              />
            </th>
            <th>
              <motion.button className="bg-emerald-500 p-0.5 hover:bg-emerald-700 text-white font-bold rounded">
                <MdAdd />
              </motion.button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
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
          <h1 className="text-xl font-bold">{subCode}</h1>
          <h1 className="text-md font-semibold">R2019</h1>
          <h1 className="text-xs font-semibold">{batchName}</h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <AssessSplitup />
        <AssessSplitup />
      </div>
    </div>
  );
}

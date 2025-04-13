import { motion } from "framer-motion";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdAdd, MdCreate, MdModeEdit } from "react-icons/md";
import { useParams } from "react-router";
import SplitupTable from "../../../components/common/SplitupTable";
import React, { useEffect } from "react";
import API from "../../../utils/API";

export default function ManageSplitup() {
  const { subCode, batchName, acid } = useParams<{
    subCode: string;
    batchName: string;
    acid: string;
  }>();
  const [loading, setLoading] = React.useState(true);
  interface Details {
    subName?: string;
    type?: string;
    assess1?: number;
    assess2?: number;
    endsem?: number;
    regName?: string;
    l?: number;
    t?: number;
    p?: number;
    c?: number;
    cperiod?: number;
    facid?: string;
    subid?: string;
    written?: number;
    assignment?: number;
  }

  const [details, setDetails] = React.useState<Details>({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await API.get(`/faculty/assignedSub/sub/${acid}`);
        console.log("Full response:", response.data);
        setDetails(response.data); // Check if you need to do response.data.subject instead
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [acid]);

  const getTypeStyles = (type) => {
    switch (type?.toLowerCase()) {
      case "theory":
        return "bg-blue-200 text-blue-800";
      case "lab":
        return "bg-green-200 text-green-800";
      case "project":
        return "bg-purple-200 text-purple-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-12 gap-4 bg-white dark:bg-gray-dark rounded-2xl shadow-md p-4 mb-6">
        <div className="col-span-12 md:col-span-6 space-y-1">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {details?.subName}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            Code:{" "}
            <span className="font-semibold text-gray-800 dark:text-white">
              {subCode}
            </span>
          </p>
          <p
            className={`text-sm capitalize px-2 py-0.5 rounded max-w-fit ${getTypeStyles(
              details?.type
            )}`}
          >
            {details?.type} Subject
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Batch: {batchName}
          </p>
          <div className="flex flex-col lg:flex-row gap-1 lg:gap-8 text-sm text-gray-600 dark:text-gray-300 space-y-0.5">
            <p>
              Assessment 1: <strong>{details?.assess1}</strong>
            </p>
            <p>
              Assessment 2: <strong>{details?.assess2}</strong>
            </p>
            <p>
              End Semester: <strong>{details?.endsem}</strong>
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Internal Splitup:{" "}
            <strong className="mx-2">
              {details?.written}-{details?.assignment}
            </strong>
            <span>(Written - Assignment)</span>
          </p>
          <div className="max-w-fit text-xs font-medium bg-white/20 px-2 py-0.5 rounded text-gray-dark dark:text-gray-25 pt-1">
            <p>Regulation: {details?.regName}</p>
          </div>
        </div>

        {/* Right Panel - LTPC Section */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center items-start md:items-center">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                L
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {details?.l}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                T
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {details?.t}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                P
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {details?.p}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                C
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {details?.c}
              </span>
            </div>
          </div>
          <p className="text-base font-medium text-gray-600 dark:text-gray-300 mt-3">
            Total Hours:{" "}
            <span className="font-semibold">{details?.cperiod}</span> hours
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="lg:col-span-6 md:col-span-12 col-span-12 bg-white dark:bg-gray-dark rounded-2xl shadow-md p-4">
          {details?.facid && details?.subid && (
            <SplitupTable
              heading="Assessment - 1"
              maxWeightage={Number(details?.assignment)}
              criteriaEndpoint={"/faculty/criteria"}
              endpoint={`/faculty/mainSplitup/${details?.facid}/${details?.subid}`}
              tenture={"assess1"}
              facultyId={Number(details?.facid)}
              subjectId={Number(details?.subid)}
            />
          )}
        </div>
        <div className="lg:col-span-6 md:col-span-12 col-span-12 bg-white dark:bg-gray-dark rounded-2xl shadow-md p-4">
          {details?.facid && details?.subid && (
            <SplitupTable
              heading="Assessment - 2"
              maxWeightage={Number(details?.assignment)}
              criteriaEndpoint={"/faculty/criteria"}
              endpoint={`/faculty/mainSplitup/${details?.facid}/${details?.subid}`}
              tenture={"assess2"}
              facultyId={Number(details?.facid)}
              subjectId={Number(details?.subid)}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

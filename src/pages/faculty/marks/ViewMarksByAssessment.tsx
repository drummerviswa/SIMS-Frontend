import { useParams } from "react-router";
import DynamicMarkTable from "../../../components/common/DynamicMarks";
import ViewEntity from "../../../components/common/ViewEntity";
import ViewMarksTable from "../../../components/common/ViewMarksTable";

export default function ViewMarksByAssessment() {
  const { subCode, tenure } = useParams<{ subCode: string; tenure: string }>();
  return (
    <div className="flex-1 justify-center items-center">
      <div className="rounded-xl shadow-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        {/* <ViewMarksTable  /> */}
        {subCode} - {tenure}
      </div>
    </div>
  );
}

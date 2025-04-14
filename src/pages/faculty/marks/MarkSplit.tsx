import { useEffect, useState } from "react";
import DynamicMarkTable from "../../../components/common/DynamicMarks";
import API from "../../../utils/API";
import { useParams } from "react-router";

export default function MarkSplit() {
  const [data, setData] = useState([]);
  const { subCode, batchName, tenure, msid } = useParams();
  //faculty/subject/tenure/batch/degree/branch
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await API.get(
        `/faculty/marks/${1}/${3}/${tenure}/${1}/${4}/${4}/${msid}`
      );
      setData(fetchedData.data);
    };
    loadData();
  }, []);

  return (
    <div>
      <h1>Student Marks</h1>
      <DynamicMarkTable
        submitURL={`/faculty/marks/${1}/${3}/${tenure}/${1}/${4}/${4}/${msid}`}
        data={data}
      />
    </div>
  );
}

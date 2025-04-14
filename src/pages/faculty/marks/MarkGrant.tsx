import React, { useEffect, useState } from "react";
import WeightageCard from "../../../components/common/WeightageCard";
import API from "../../../utils/API";
import { useParams } from "react-router";

export default function MarkGrant() {
  const [splitup, setSplitup] = useState([]);
  const [loading, setLoading] = useState(true);
  const { subCode, batchName, tenure, msid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectRes = await API.get(
          `/admin/manage/subject/subCode/${subCode}`
        );
        const subId = subjectRes.data.subid;
        const splitupRes = await API.get(
          `/faculty/subSplitup/ten/${1}/${subId}/${tenure}`
        );
        setSplitup(splitupRes.data);
        console.log("Splitup fetched:", splitupRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subCode, batchName, tenure]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!splitup || splitup.length === 0)
    return <div className="text-center mt-10">No data found.</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[34rem] gap-8 px-4 py-8">
      <div className="flex flex-wrap gap-4 justify-around w-full h-full">
        {splitup.map((item, index) => (
          <WeightageCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

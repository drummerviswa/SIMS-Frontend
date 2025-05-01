// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { useEffect, useState } from "react";
import API from "../../utils/API";
import { Modal } from "../ui/modal";

interface SplitupTableProps {
  heading?: string;
  maxWeightage?: number;
  endpoint?: string;
  criteriaEndpoint?: string;
  tenture?: string;
  facultyId?: number;
  subjectId?: number;
  written?: number;
  assignment?: number;
}

export default function SplitupTableWithModal({
  heading,
  maxWeightage,
  endpoint,
  criteriaEndpoint,
  tenture,
  facultyId,
  subjectId,
  written,
  assignment,
}: SplitupTableProps) {
  const [splitupList, setsplitupList] = useState([]);
  const [criteriaList, setCriteriaList] = useState([]);
  const [formData, setFormData] = useState({
    criteria: "",
    mainWeightage: "",
    tenure: tenture,
    faculty: facultyId,
    subject: subjectId,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedMainSplitupId, setSelectedMainSplitupId] = useState<
    number | null
  >(null);
  const [selectedMainSplitup, setSelectedMainSplitup] = useState(null);
  const [subCriteriaList, setSubCriteriaList] = useState([]);
  const [subSplitupList, setSubSplitupList] = useState([]);
  const [subFormData, setSubFormData] = useState({
    subCriteria: "",
    subWeightage: "",
  });

  useEffect(() => {
    fetchSplitup();
    fetchCriterias();
  }, []);

  const fetchSplitup = async () => {
    try {
      const res = await API.get(endpoint);
      setsplitupList(res.data);
    } catch (error) {
      console.error("Error fetching Splitup:", error);
    }
  };

  const fetchCriterias = async () => {
    try {
      const res = await API.get(criteriaEndpoint);
      setCriteriaList(res.data);
    } catch (error) {
      console.error("Error fetching criteria:", error);
    }
  };

  const fetchSubCriterias = async (mainId: number) => {
    try {
      const res = await API.get(
        `/faculty/subSplitup/${facultyId}/${subjectId}/${mainId}`
      );
      setSubCriteriaList(res.data);
    } catch (err) {
      console.error("Error fetching sub criterias:", err);
    }
  };

  const fetchSubSplitupList = async (mainId: number) => {
    try {
      const res = await API.get(
        `/faculty/subSplitup/${facultyId}/${subjectId}/${mainId}`
      );
      setSubSplitupList(res.data);
    } catch (err) {
      console.error("Error fetching sub splitup list:", err);
    }
  };

  const totalWeightage = splitupList.reduce((sum, item) => {
    return item.tenure === tenture ? sum + Number(item.mainWeightage) : sum;
  }, 0);

  const editingItemWeightage =
    editingId != null
      ? splitupList.find((item) => item.msid === editingId)?.mainWeightage || 0
      : 0;

  const remainingMarks = written + assignment - totalWeightage;
  const effectiveRemainingMarks = remainingMarks + editingItemWeightage;

  const calculateRemainingSubWeightage = () => {
    if (!selectedMainSplitup) return 0;

    const selectedMsid = String(selectedMainSplitup.msid);

    // Optional debug logs
    console.log("Selected MainSplitup ID:", selectedMsid);
    console.log(
      "Matching Subs:",
      subSplitupList.filter((item) => String(item.mainsplitup) === selectedMsid)
    );

    const totalUsedWeightage = subSplitupList.reduce((sum, item) => {
      return String(item.mainsplitup) === selectedMsid
        ? sum + Number(item.subWeightage || 0)
        : sum;
    }, 0);

    const mainWeightage = Number(selectedMainSplitup.mainWeightage || 0);
    const remainingSubWeightage = mainWeightage - totalUsedWeightage;

    return remainingSubWeightage;
  };
  const remainingSubWeightage = calculateRemainingSubWeightage();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    if (!formData.criteria || !formData.mainWeightage) return;
    try {
      await API.post(endpoint, {
        ...formData,
        criteria: Number(formData.criteria),
        mainWeightage: Number(formData.mainWeightage),
      });
      fetchSplitup();
      resetForm();
    } catch (err) {
      console.error("Error adding criterion:", err);
    }
  };

  const handleEditClick = (item) => {
    setFormData({
      criteria: item.criteria?.cid || item.criteria || "",
      mainWeightage: item.mainWeightage,
      tenure: tenture,
      faculty: facultyId,
      subject: subjectId,
    });
    setEditingId(item.msid ?? null);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      const payload = {
        ...formData,
        criteria: { cid: Number(formData.criteria) },
        mainWeightage: Number(formData.mainWeightage),
        msid: editingId,
      };
      await API.put(`${endpoint}/${editingId}`, payload);
      fetchSplitup();
      resetForm();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating criterion:", err);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
      await API.delete(`${endpoint}/${id}`);
      fetchSplitup();
    } catch (err) {
      console.error("Error deleting criterion:", err);
    }
  };

  const handleDeleteSub = async (id?: number) => {
    if (!id) {
      console.log("ID is undefined");
      return;
    }
    try {
      await API.delete(`/faculty/subSplitup/${facultyId}/${subjectId}/${id}`);
      fetchSubCriterias(selectedMainSplitupId!);
    } catch (err) {
      console.error("Error deleting sub criterion:", err);
    }
  };

  const handleAddSubCriteria = async () => {
    if (!selectedMainSplitupId) return;
    try {
      await API.post(`/faculty/subSplitup/${facultyId}/${subjectId}`, {
        ...subFormData,
        mainsplitup: selectedMainSplitupId,
        subWeightage: Number(subFormData.subWeightage),
        faculty: facultyId,
        subject: subjectId,
      });
      setSubFormData({ subCriteria: "", subWeightage: "" });
      fetchSubCriterias(selectedMainSplitupId);
    } catch (err) {
      console.error("Error adding sub criteria:", err);
    }
  };

  const handleOpenSubModal = (msid: number) => {
    setSelectedMainSplitupId(msid);
    const selected = splitupList.find((item) => item.msid === msid);
    setSelectedMainSplitup(selected);
    fetchSubSplitupList(msid);
    fetchSubCriterias(msid);
    setIsSubModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      criteria: "",
      mainWeightage: "",
      tenure: tenture,
      faculty: facultyId,
      subject: subjectId,
    });
    setEditingId(null);
  };
  return (
    <div className="w-full p-1 bg-white dark:bg-gray-800 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-gray-dark dark:text-white">{heading}</h1>
        <h1 className="text-gray-dark dark:text-white text-xs">
          Remaining marks:
          <span className="text-lg mx-1">{remainingMarks}</span>
        </h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg no-scrollbar">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Criteria Name</th>
              <th className="px-6 py-3">Weightage</th>
              <th className="px-1 py-3">Percentage</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {splitupList.map(
              (item, index) =>
                item.tenure === tenture && (
                  <tr
                    key={item.id}
                    className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-fuchsia-600 dark:text-fuchsia-400 hover:underline"
                        onClick={() => handleOpenSubModal(item.msid)}
                      >
                        {criteriaList.find(
                          (c) =>
                            c.cid === item.criteria ||
                            c.cid === item.criteria?.cid
                        )?.criteriaName ||
                          item.criteriaName ||
                          "-"}
                      </button>
                    </td>
                    <td className="px-6 py-4">{item.mainWeightage}</td>
                    <td className="px-1 py-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {`${(
                          (item.mainWeightage /
                            (item.mainWeightage === written
                              ? written
                              : assignment)) *
                          100
                        ).toFixed(0)}%`}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-4">
                      <button
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 dark:text-red-400 hover:underline"
                        onClick={() => handleDelete(item.msid)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
            )}
            {remainingMarks > 0 && (
              <tr className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4"></td>
                <td className="mx-auto px-1 py-4">
                  <select
                    onChange={handleChange}
                    value={formData.criteria}
                    name="criteria"
                    className="w-full rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Criteria</option>
                    {criteriaList.map((item) => item.criteriaName!=="Assessment" && (
                      <option key={item.id} value={item.cid}>
                        {item.criteriaName}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="mx-auto px-1 py-4">
                  <input
                    type="number"
                    placeholder="Enter weightage"
                    name="mainWeightage"
                    value={formData.mainWeightage}
                    onChange={handleChange}
                    min={0}
                    max={remainingMarks}
                    onInput={(e) => {
                      const input = e.currentTarget;
                      if (Number(input.value) > remainingMarks) {
                        input.value = remainingMarks.toString();
                      }
                    }}
                    className="w-full px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 dark:text-white outline-none"
                  />
                </td>
                {/* Percentage */}
                <td className="px-1 py-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formData.mainWeightage
                      ? `${(
                          (Number(formData.mainWeightage) / maxWeightage) *
                          100
                        ).toFixed(0)}%`
                      : "-"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-green-600 dark:text-green-400 hover:underline"
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        className="max-w-[500px] m-4"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="relative w-full p-4 bg-white dark:bg-gray-900 rounded-3xl lg:p-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Edit Criteria
          </h2>

          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Criteria Name
            </label>
            <select
              name="criteria"
              value={formData.criteria}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
            >
              <option value="">Select Criteria</option>
              {criteriaList.map((item) => (
                <option key={item.id} value={item.cid}>
                  {item.criteriaName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="flex text-sm mb-1 text-gray-600 dark:text-gray-300 flex-row justify-between">
              Weightage
              <div className="col-span-3 text-sm text-gray-500 dark:text-gray-400">
                Remaining:
                <span className="text-base font-medium mx-1">
                  {remainingMarks}
                </span>
              </div>
            </label>
            <div className="grid grid-cols-12 items-center gap-2">
              {/* Input */}
              <div className="col-span-11">
                <input
                  type="number"
                  name="mainWeightage"
                  value={formData.mainWeightage}
                  onChange={handleChange}
                  min={0}
                  max={remainingMarks}
                  onInput={(e) => {
                    const input = e.currentTarget;
                    if (Number(input.value) > remainingMarks) {
                      input.value = remainingMarks.toString();
                    }
                  }}
                  className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
                />
              </div>

              {/* Percentage */}
              <div className="col-span-1 text-right text-xs text-gray-500 dark:text-gray-400">
                {formData.mainWeightage
                  ? `${(
                      (Number(formData.mainWeightage) / maxWeightage) *
                      100
                    ).toFixed(0)}%`
                  : "-"}
              </div>
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Update
          </button>
        </div>
      </Modal>
      {/* Sub Splitup */}
      <Modal
        isOpen={isSubModalOpen}
        onClose={() => {
          setIsSubModalOpen(false);
          resetForm();
        }}
        className="max-w-[600px]"
      >
        <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Manage Sub Criteria for{" "}
              <span className="text-fuchsia-600 dark:text-fuchsia-400">
                {selectedMainSplitup?.criteriaName}
              </span>
            </h2>
            {/* Remaining marks */}
            <h1 className="text-gray-dark dark:text-white text-xs mb-4">
              Remaining marks:
              <span className="text-lg mx-1">{remainingSubWeightage}</span>
            </h1>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg no-scrollbar">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Sub Criteria Name</th>
                  <th className="px-6 py-3">Weightage</th>
                  <th className="px-1 py-3">Percentage</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {subCriteriaList.map((item, index) => (
                  <tr
                    key={item.id}
                    className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.subCriteria}</td>
                    <td className="px-6 py-4">{item.subWeightage}</td>
                    <td className="px-1 py-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {`${(
                          (item.subWeightage /
                            selectedMainSplitup?.mainWeightage) *
                          100
                        ).toFixed(0)}%`}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-4">
                      <button
                        className="text-red-600 dark:text-red-400 hover:underline"
                        onClick={() => handleDeleteSub(item.subsplitid)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {remainingSubWeightage > 0 && (
                  <tr className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 border-gray-200">
                    <td className="px-6 py-4"></td>
                    <td className="mx-auto px-1 py-4">
                      <input
                        type="text"
                        placeholder="Enter sub criteria name"
                        name="subCriteria"
                        value={subFormData.subCriteria}
                        onChange={handleSubChange}
                        className="w-full px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 dark:text-white outline-none"
                      />
                    </td>
                    <td className="mx-auto px-1 py-4">
                      <input
                        type="number"
                        placeholder="Enter weightage"
                        name="subWeightage"
                        value={subFormData.subWeightage}
                        onChange={handleSubChange}
                        min={0}
                        max={remainingSubWeightage}
                        onInput={(e) => {
                          const input = e.currentTarget;
                          if (Number(input.value) > remainingSubWeightage) {
                            input.value = remainingSubWeightage.toString();
                          }
                        }}
                        className="w-full px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 dark:text-white outline-none"
                      />
                    </td>
                    {/* Percentage */}
                    <td className="px-1 py-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {subFormData.subWeightage
                          ? `${(
                              (Number(subFormData.subWeightage) /
                                selectedMainSplitup?.mainWeightage) *
                              100
                            ).toFixed(0)}%`
                          : "-"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        className="text-green-600 dark:text-green-400 hover:underline"
                        onClick={handleAddSubCriteria}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
}

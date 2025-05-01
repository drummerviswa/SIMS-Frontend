import React, { useState } from "react";
import { IoMdBookmarks } from "react-icons/io";
import { MdOutlineAssessment } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router";
import { Modal } from "../../../components/ui/modal";

export default function ViewMarksChoose() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { subCode } = useParams();

  const handleAssessmentSelect = (type: string) => {
    navigate(`/faculty/marks/view/assess/${subCode}/${type.toLowerCase()}`);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full p-6 flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white">
        View Marks
      </h1>

      {/* Modal */}
      <Modal
        className="max-w-[500px] m-4"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="p-6 sm:p-10 max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
            Choose Assessment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["assess1", "assess2"].map((type, index) => (
              <div
                key={index}
                onClick={() => handleAssessmentSelect(type)}
                className="cursor-pointer bg-gray-100 dark:bg-gray-700 p-5 rounded-lg shadow hover:scale-105 transition-all text-center"
              >
                <MdOutlineAssessment
                  size={36}
                  className="text-blue-600 mx-auto mb-2"
                />
                <p className="font-medium text-gray-800 dark:text-white">
                  {type === "assess1" ? "Assessment 1" : "Assessment 2"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center items-center justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-700 text-white p-6 rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 w-80 h-40 flex flex-col items-center justify-center"
        >
          <MdOutlineAssessment size={36} className="mb-3" />
          <p className="text-lg font-medium text-center text-gray-200">
            By Assessment
          </p>
        </button>

        <Link
          to={`/faculty/marks/view/student/${subCode}`}
          className="bg-gray-700 text-white p-6 rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 w-80 h-40 flex flex-col items-center justify-center"
        >
          <PiStudent size={36} className="mb-3" />
          <p className="text-lg font-medium text-center text-gray-200">
            By Student
          </p>
        </Link>

        <Link
          to={`/faculty/marks/view/subject/${subCode}`}
          className="bg-gray-700 text-white p-6 rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 w-80 h-40 flex flex-col items-center justify-center"
        >
          <IoMdBookmarks size={36} className="mb-3" />
          <p className="text-lg font-medium text-center text-gray-200">
            By Subject
          </p>
        </Link>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import API from "../../../utils/API";
import { BsImages } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";

interface AcademicFile {
  name: string;
  url: string;
  uploadedAt: string;
}

export default function ViewAcademicSchedule() {
  const [files, setFiles] = useState<AcademicFile[]>([]);
  const [loading, setLoading] = useState(true);

  const isNewFile = (uploadDate: string): boolean => {
    const uploadedTime = new Date(uploadDate).getTime();
    
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    return now - uploadedTime <= oneHour;
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await API.get("/admin/academic-files");
        setFiles(res.data.files || []);
      } catch (error) {
        console.error("Failed to load academic files", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getCleanName = (filename: string): string => {
    // Remove UUID or prefix before first underscore or hyphen
    const nameWithExt = filename.replace(/^[^_]+[_-]/, "");

    // Replace underscores and hyphens with spaces
    return nameWithExt.replace(/[_-]+/g, " ").trim();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-25 mb-6">
        Academic Schedule Files
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : files.length === 0 ? (
        <p className="text-gray-400 italic">No files uploaded yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {files.map((file, idx) => {
            const isPDF = file.name.toLowerCase().endsWith(".pdf");
            const isNew = isNewFile(file.uploadedAt);

            return (
              <li key={idx} className="flex items-center gap-4 py-4">
                <span className="text-gray-600">
                  {isPDF ? (
                    <FiFileText className="w-5 h-5" />
                  ) : (
                    <BsImages className="w-5 h-5" />
                  )}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-lg font-medium"
                    >
                      {getCleanName(file.name)}
                    </a>
                    {isNew && (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    Uploaded on: {formatDate(file.uploadedAt)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

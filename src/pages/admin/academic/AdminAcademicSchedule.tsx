import { useEffect, useState } from "react";
import API from "../../../utils/API";

export default function AdminAcademicSchedule() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; url: string }[]
  >([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/admin/upload-academic-file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully");
      setUploadedFiles((prev) => [...prev, res.data]);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await API.get("/admin/academic-files");
      setUploadedFiles(res.data.files);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleDelete = async (fileUrl: string) => {
    try {
      const filename = fileUrl.split("/").pop();
      if (!filename) return alert("Invalid file URL");

      if (!window.confirm(`Delete "${filename}"?`)) return;

      await API.delete(`/admin/academic-files/${filename}`);
      alert("File deleted");
      setUploadedFiles((prev) => prev.filter((file) => file.url !== fileUrl));
    } catch (err) {
      console.error(err);
      alert("Failed to delete file");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);
  const getCleanName = (filename: string): string => {
    // Remove UUID or prefix before first underscore or hyphen
    const nameWithExt = filename.replace(/^[^_]+[_-]/, "");

    // Replace underscores and hyphens with spaces
    return nameWithExt.replace(/[_-]+/g, " ").trim();
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-sm">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Academic Schedule Upload
      </h1>

      <div className="flex items-center space-x-4 mb-8">
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleUpload}
          disabled={!file}
          className="bg-blue-600 disabled:bg-blue-500 disabled:cursor-not-allowed cursor-pointer text-white font-medium px-5 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Upload
        </button>
      </div>

      <h2 className="text-xl font-medium text-gray-700 mb-4">Uploaded Files</h2>
      {uploadedFiles.length === 0 ? (
        <p className="text-gray-500 italic">
          No academic schedules uploaded yet.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {uploadedFiles.map((file, idx) => (
            <li key={idx} className="flex justify-between items-center py-3">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline truncate max-w-[80%]"
                title={file.name}
              >
                {getCleanName(file.name)}
              </a>
              <button
                onClick={() => handleDelete(file.url)}
                className="text-red-600 hover:text-red-800 font-semibold"
                aria-label={`Delete ${file.name}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

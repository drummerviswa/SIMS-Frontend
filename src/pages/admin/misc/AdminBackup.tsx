import React, { useState } from "react";
import { LuDatabaseBackup } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminBackup() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/backup", {
        method: "GET",
        headers: { Accept: "application/zip" },
      });

      if (!res.ok) throw new Error("Failed to download backup");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup_${new Date().toISOString()}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("✅ Backup downloaded successfully!");
    } catch (err) {
      toast.error("❌ " + (err.message || "Unknown error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <ToastContainer
        position="bottom-right"
        draggable
        autoClose={4000}
        closeOnClick
      />
      <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg text-center font-sans dark:bg-gray-800">
        <h1 className="flex items-center justify-center gap-2 text-2xl font-extrabold dark:text-gray-200 text-gray-800 mb-4">
          <LuDatabaseBackup size={32} />
          Database Backup
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          Click the button below to generate and download the latest database
          backup.
        </p>
        <button
          onClick={handleDownload}
          disabled={loading}
          className={`w-full py-3 rounded-md font-semibold text-white transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <svg
              className="mx-auto h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="loading"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            "Download Backup"
          )}
        </button>
      </div>
    </div>
  );
}

import React from "react";
import API from "../../../utils/API";

export default function PDFDownloadButton({ type, id }) {
  const handleDownload = async () => {
    try {
      const res = await API.get(`/report/pdf/${type.toLowerCase()}/${id}`, {
        responseType: "blob",
      });

      const contentType = res.headers["content-type"];
      if (!contentType || !contentType.includes("application/pdf")) {
        const text = await res.data.text();
        throw new Error(`Invalid PDF response: ${text}`);
      }

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}_${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download error:", err);
      alert("Failed to download PDF. Check console for details.");
    }
  };

  return (
    <button
      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
      onClick={handleDownload}
    >
      Download
    </button>
  );
}

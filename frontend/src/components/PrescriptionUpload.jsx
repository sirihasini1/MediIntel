import { useState } from "react";
import axios from "axios";
import generateReport from "../utils/generateReport";
import AnalyticsDashboard from "./AnalyticsDashboard";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://mediintel-vxvx.onrender.com";

  
function PrescriptionUpload() {
  const [file, setFile] = useState(null);
  const [ocrData, setOcrData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a prescription image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/upload-prescription`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setOcrData(response.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Upload Hero */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-700 to-cyan-600 shadow-2xl p-10 text-white">

        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-300 opacity-20 blur-3xl rounded-full"></div>

        <div className="relative z-10">

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            AI • OCR • NLP • Clinical Analytics
          </div>

          <h2 className="text-5xl font-extrabold mb-4">
            Prescription Intelligence
          </h2>

          <p className="text-blue-100 text-lg mb-10 max-w-3xl">
            Upload a prescription and transform medical text into
            structured clinical insights using OCR, NLP and AI-powered
            healthcare analytics.
          </p>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

            <input
              type="file"
              onChange={handleFileChange}
              className="w-full bg-white text-gray-700 p-5 rounded-2xl border-2 border-dashed border-blue-200"
            />

            {file && (
              <div className="mt-4 text-blue-100">
                Selected: {file.name}
              </div>
            )}

            <button
              onClick={handleUpload}
              className="mt-6 w-full bg-white text-blue-700 py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-xl"
            >
              {loading
                ? "Analyzing Prescription..."
                : "Analyze Prescription"}
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mt-8 bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="animate-pulse">
            <div className="text-3xl font-bold text-indigo-600">
              Processing Prescription...
            </div>

            <p className="mt-3 text-gray-500">
              OCR Extraction • NLP Analysis • Clinical Intelligence
            </p>
          </div>
        </div>
      )}

      {/* Results */}
      {ocrData && (
        <div className="space-y-10 mt-10">

          {/* Quick Summary */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <p className="text-gray-500 mb-2">
                Diagnosis
              </p>

              <h3 className="text-xl font-bold text-red-600">
                {ocrData.ai_summary?.diagnosis ||
                  "Not detected"}
              </h3>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <p className="text-gray-500 mb-2">
                Medicines
              </p>

              <h3 className="text-4xl font-bold text-blue-600">
                {ocrData.ai_summary?.medicines?.length || 0}
              </h3>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <p className="text-gray-500 mb-2">
                Tests
              </p>

              <h3 className="text-4xl font-bold text-green-600">
                {ocrData.ai_summary?.tests?.length || 0}
              </h3>
            </div>
          </div>

          {/* Analytics Dashboard */}
          <AnalyticsDashboard
            analysis={ocrData.ai_summary}
          />

          {/* Analysis Section */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Medicines */}
            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h3 className="text-3xl font-bold text-indigo-600 mb-6">
                Medicines Analysis
              </h3>

              <div className="space-y-4">

                {ocrData.ai_summary?.medicines?.length > 0 ? (
                  ocrData.ai_summary.medicines.map(
                    (med, index) => (
                      <div
                        key={index}
                        className="border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition"
                      >
                        <h4 className="font-bold text-lg text-slate-800">
                          {med.name}
                        </h4>

                        <p className="mt-2 text-slate-600">
                          Dosage: {med.dosage}
                        </p>

                        <p className="text-slate-600">
                          Instructions: {med.instructions}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p>No medicines detected.</p>
                )}

              </div>
            </div>

            {/* Tests */}
            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h3 className="text-3xl font-bold text-green-600 mb-6">
                Recommended Tests
              </h3>

              {ocrData.ai_summary?.tests?.length > 0 ? (
                <div className="space-y-3">

                  {ocrData.ai_summary.tests.map(
                    (test, index) => (
                      <div
                        key={index}
                        className="bg-green-50 border border-green-200 rounded-2xl p-4"
                      >
                        {test}
                      </div>
                    )
                  )}

                </div>
              ) : (
                <p>No tests detected.</p>
              )}
            </div>

          </div>

          {/* OCR Viewer */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-slate-800">
                OCR Extracted Text
              </h3>

              <div className="px-4 py-2 rounded-full bg-blue-100 text-blue-700">
                OCR Output
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 h-[500px] overflow-auto border">
              <p className="whitespace-pre-wrap leading-8 text-slate-700">
                {ocrData.extracted_text}
              </p>
            </div>
          </div>

          {/* Download Report */}
          <div className="flex justify-center">

            <button
              onClick={() => generateReport(ocrData)}
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300"
            >
              Download Clinical Report
            </button>

          </div>

        </div>
      )}
    </div>
  );
}

export default PrescriptionUpload;
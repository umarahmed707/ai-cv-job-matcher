import { useState } from "react";

import {
  FileUp,
  LoaderCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { analyzeCV } from "../services/api";
import { useCV } from "../context/CVcontext";


const CVUpload = () => {
  const { cvResult, saveCVResult } = useCV();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleFileChange = (event) => {
  const file = event.target.files?.[0];

  setError("");

  if (!file) {
    setSelectedFile(null);
    return;
  }

  const fileName = file.name.toLowerCase();

  const isPdf = fileName.endsWith(".pdf");
  const isDocx = fileName.endsWith(".docx");

  if (!isPdf && !isDocx) {
    setSelectedFile(null);
    setError("Only PDF and Word (.docx) files are allowed.");
    event.target.value = "";
    return;
  }

  setSelectedFile(file);
};

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select your CV first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await analyzeCV(selectedFile);

      saveCVResult(result);

      setSelectedFile(null);

    } catch (error) {
      console.error("CV analysis error:", error);

      const message =
        error.response?.data?.detail ||
        error.message ||
        "CV analysis failed.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <Sparkles
            size={18}
            className="text-cyan-400"
          />

          <h2 className="text-lg font-semibold text-white">
            Upload Your CV
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Upload your CV to generate an AI-powered profile analysis.
        </p>
      </div>


      {/* Upload Area */}
      <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/50 p-8 text-center">

        {selectedFile ? (
          <>
            <CheckCircle2
              size={36}
              className="mx-auto text-cyan-400"
            />

            <p className="mt-3 text-sm font-medium text-white">
              {selectedFile.name}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </>
        ) : (
          <>
            <FileUp
              size={36}
              className="mx-auto text-slate-500"
            />

            <p className="mt-3 text-sm text-slate-300">
              Select your CV
            </p>

            <p className="mt-1 text-xs text-slate-600">
              PDF & Word format
            </p>
          </>
        )}


        {/* File Picker */}
        <div className="mt-6">

          <label
            htmlFor="cv-upload"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <FileUp size={17} />

            {selectedFile
              ? "Change CV"
              : "Choose CV"}
          </label>
<input
  id="cv-upload"
  type="file"
  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  className="hidden"
  onChange={handleFileChange}
/>

        </div>


        {/* Analyze */}
        {selectedFile && (
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />

                Analyzing CV...
              </>
            ) : (
              <>
                <Sparkles size={17} />

                Analyze CV
              </>
            )}
          </button>
        )}


        {/* Error */}
        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

      </div>


      {/* Existing Result Status */}
      {cvResult && !selectedFile && (
        <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
          <CheckCircle2 size={15} />

          Latest CV analysis is available.
        </div>
      )}

    </div>
  );
};

export default CVUpload;
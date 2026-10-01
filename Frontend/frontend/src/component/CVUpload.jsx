import { useState } from "react";

import {
  FileUp,
  LoaderCircle,
  CheckCircle2,
  Sparkles,
  FileText,
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
    <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 md:p-6">
      {/* Header */}
      <div className="mb-5 sm:mb-6">
        <div className="flex items-center gap-2">
          <Sparkles
            size={18}
            className="shrink-0 text-cyan-400"
          />

          <h2 className="text-base font-semibold text-white sm:text-lg">
            Upload Your CV
          </h2>
        </div>

        <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
          Upload your CV to generate an AI-powered profile analysis.
        </p>
      </div>

      {/* Upload Area */}
      <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/50 p-5 sm:p-7 md:p-8">
        {selectedFile ? (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 sm:h-16 sm:w-16">
              <CheckCircle2
                size={30}
                className="text-cyan-400 sm:size-9"
              />
            </div>

            <p className="mt-4 w-full break-all px-2 text-sm font-medium text-white sm:text-base">
              {selectedFile.name}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 sm:h-16 sm:w-16">
              <FileText
                size={30}
                className="text-slate-500 sm:size-9"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-300 sm:text-base">
              Select your CV
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Supported formats: PDF & Word (.docx)
            </p>

            <p className="mt-1 text-[11px] text-slate-600">
              Maximum file size depends on your backend configuration
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <label
            htmlFor="cv-upload"
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto sm:py-2.5"
          >
            <FileUp size={17} />

            {selectedFile ? "Change CV" : "Choose CV"}
          </label>

          <input
            id="cv-upload"
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={handleFileChange}
          />

          {selectedFile && (
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2.5"
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
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-400/10 bg-red-400/5 px-4 py-3">
            <p className="text-center text-xs leading-5 text-red-400 sm:text-sm">
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Existing Result Status */}
      {cvResult && !selectedFile && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/5 px-3 py-3 text-xs text-emerald-400 sm:items-center">
          <CheckCircle2
            size={15}
            className="mt-0.5 shrink-0 sm:mt-0"
          />

          <span>
            Latest CV analysis is available.
          </span>
        </div>
      )}
    </div>
  );
};

export default CVUpload;
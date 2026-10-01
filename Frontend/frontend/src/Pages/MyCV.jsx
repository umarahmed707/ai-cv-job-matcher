
import {
  FileText,
  Upload,
  CheckCircle2,
  Sparkles,
  LoaderCircle,
  BriefcaseBusiness,
  GraduationCap,
  Target,
  AlertTriangle,
} from "lucide-react";

import { useState } from "react";

import { useCV } from "../context/CVcontext";
import { analyzeCV } from "../services/api";

const MyCV = () => {
  const { cvResult, saveCVResult } = useCV();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analysis = cvResult?.analysis;
  const jobs = cvResult?.job_matches || [];

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
    } catch (error) {
      console.error("CV analysis error:", error);
      console.error("Response:", error.response?.data);

      setError(
        error.response?.data?.detail ||
          error.message ||
          "CV analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl px-1 sm:px-2 lg:px-0">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-cyan-400">
          <Sparkles
            size={17}
            className="shrink-0 sm:h-[18px] sm:w-[18px]"
          />

          <span className="text-xs font-medium sm:text-sm">
            CV Intelligence
          </span>
        </div>

        <h1 className="mt-2 text-2xl font-bold text-white sm:mt-3 sm:text-3xl">
          My CV
        </h1>

        <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
          Upload your CV and review your AI-powered profile analysis.
        </p>
      </div>

      {/* Upload Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
          {/* File Information */}
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 sm:h-14 sm:w-14 sm:rounded-2xl">
              <FileText
                size={23}
                className="sm:h-[27px] sm:w-[27px]"
              />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                {selectedFile?.name ||
                  analysis?.candidate_name ||
                  "Your CV"}
              </h3>

              <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
                {selectedFile
                  ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                  : cvResult
                    ? "CV analyzed successfully"
                    : "Upload your CV to start AI analysis"}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex w-full flex-col gap-2.5 sm:flex-row md:w-auto">
            <label
              htmlFor="cv-upload"
              className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/[0.08] sm:w-auto sm:px-5 sm:text-sm"
            >
              <Upload size={16} />
              Choose CV
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
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-5 sm:text-sm"
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="animate-spin"
                    />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Analyze CV
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {error && (
          <p className="mt-4 break-words text-xs leading-5 text-red-400 sm:text-sm">
            {error}
          </p>
        )}
      </div>

      {/* Empty State */}
      {!cvResult ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center sm:mt-6 sm:rounded-3xl sm:p-10">
          <FileText
            size={38}
            className="mx-auto text-slate-600 sm:h-[42px] sm:w-[42px]"
          />

          <h2 className="mt-4 text-base font-semibold text-white sm:text-lg">
            No CV analysis available
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            Upload and analyze your CV to generate your candidate profile,
            skills, experience and job recommendations.
          </p>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-3">
            {/* Candidate */}
            <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-6 lg:col-span-2">
              <div className="flex items-center gap-3">
                <Sparkles
                  size={19}
                  className="shrink-0 text-cyan-400"
                />

                <h3 className="text-sm font-semibold text-white sm:text-base">
                  AI Profile Summary
                </h3>
              </div>

              <h2 className="mt-4 break-words text-xl font-bold text-cyan-400 sm:mt-5 sm:text-2xl">
                {analysis?.candidate_name || "Candidate"}
              </h2>

              <p className="mt-3 break-words text-xs leading-6 text-slate-400 sm:mt-4 sm:text-sm sm:leading-7">
                {analysis?.professional_summary ||
                  "No professional summary available."}
              </p>
            </div>

            {/* Experience */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-6">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness
                  size={19}
                  className="shrink-0 text-purple-400"
                />

                <h3 className="text-sm font-semibold text-white sm:text-base">
                  Experience
                </h3>
              </div>

              <p className="mt-4 text-3xl font-bold text-white sm:mt-5">
                {analysis?.years_of_experience ?? 0}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                Years of professional experience
              </p>
            </div>
          </div>

          {/* Skills */}
          {analysis?.skills?.length > 0 && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mt-6 sm:rounded-3xl sm:p-6">
              <div className="flex items-center gap-3">
                <Target
                  size={19}
                  className="shrink-0 text-cyan-400"
                />

                <h3 className="text-sm font-semibold text-white sm:text-base">
                  Detected Skills
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                {analysis.skills.map((skill) => (
                  <span
                    key={skill}
                    className="max-w-full break-words rounded-lg bg-cyan-400/10 px-2.5 py-1.5 text-[10px] text-cyan-300 sm:px-3 sm:text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience Details */}
          {analysis?.experience?.length > 0 && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mt-6 sm:rounded-3xl sm:p-6">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness
                  size={19}
                  className="shrink-0 text-purple-400"
                />

                <h3 className="text-sm font-semibold text-white sm:text-base">
                  Work Experience
                </h3>
              </div>

              <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
                {analysis.experience.map((item, index) => (
                  <div
                    key={`${item.job_title}-${item.company}-${index}`}
                    className="min-w-0 rounded-xl border border-white/10 bg-slate-900/40 p-4 sm:rounded-2xl sm:p-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h4 className="break-words text-sm font-semibold text-white">
                          {item.job_title || "Job Role"}
                        </h4>

                        <p className="mt-1 break-words text-xs text-cyan-400">
                          {item.company || "Company not provided"}
                        </p>
                      </div>

                      <span className="shrink-0 break-words text-[11px] text-slate-500 sm:text-xs">
                        {item.duration || "Duration not provided"}
                      </span>
                    </div>

                    {item.responsibilities?.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {item.responsibilities.map(
                          (responsibility, responsibilityIndex) => (
                            <p
                              key={`${responsibility}-${responsibilityIndex}`}
                              className="break-words text-xs leading-5 text-slate-400"
                            >
                              • {responsibility}
                            </p>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {analysis?.education?.length > 0 && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mt-6 sm:rounded-3xl sm:p-6">
              <div className="flex items-center gap-3">
                <GraduationCap
                  size={19}
                  className="shrink-0 text-emerald-400"
                />

                <h3 className="text-sm font-semibold text-white sm:text-base">
                  Education
                </h3>
              </div>

              <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4 md:grid-cols-2">
                {analysis.education.map((item, index) => (
                  <div
                    key={`${item.degree}-${item.institution}-${index}`}
                    className="min-w-0 rounded-xl border border-white/10 bg-slate-900/40 p-4 sm:rounded-2xl sm:p-5"
                  >
                    <h4 className="break-words text-sm font-semibold text-white">
                      {item.degree || "Degree"}
                    </h4>

                    <p className="mt-2 break-words text-xs text-cyan-400">
                      {item.institution || "Institution not provided"}
                    </p>

                    <p className="mt-2 break-words text-xs text-slate-500">
                      {item.duration || "Duration not provided"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Roles */}
          {analysis?.recommended_roles?.length > 0 && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mt-6 sm:rounded-3xl sm:p-6">
              <div className="flex items-center gap-3">
                <Sparkles
                  size={19}
                  className="shrink-0 text-purple-400"
                />

                <h3 className="text-sm font-semibold text-white sm:text-base">
                  Recommended Roles
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                {analysis.recommended_roles.map((role) => (
                  <span
                    key={role}
                    className="max-w-full break-words rounded-lg bg-purple-400/10 px-2.5 py-1.5 text-[10px] text-purple-300 sm:px-3 sm:text-xs"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Strengths + Skill Gaps */}
          <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-2">
            {analysis?.strengths?.length > 0 && (
              <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-emerald-400"
                  />

                  <h3 className="text-sm font-semibold text-white sm:text-base">
                    Strengths
                  </h3>
                </div>

                <div className="mt-4 space-y-3 sm:mt-5">
                  {analysis.strengths.map((strength) => (
                    <div
                      key={strength}
                      className="flex items-start gap-3 text-xs leading-5 text-slate-300 sm:text-sm"
                    >
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />

                      <span className="break-words">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis?.skill_gaps?.length > 0 && (
              <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle
                    size={19}
                    className="shrink-0 text-amber-400"
                  />

                  <h3 className="text-sm font-semibold text-white sm:text-base">
                    Skill Gaps
                  </h3>
                </div>

                <div className="mt-4 space-y-3 sm:mt-5">
                  {analysis.skill_gaps.map((gap) => (
                    <div
                      key={gap}
                      className="flex items-start gap-3 text-xs leading-5 text-slate-300 sm:text-sm"
                    >
                      <AlertTriangle
                        size={15}
                        className="mt-0.5 shrink-0 text-amber-400"
                      />

                      <span className="break-words">{gap}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Job Match Summary */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mt-6 sm:rounded-3xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <BriefcaseBusiness
                  size={19}
                  className="shrink-0 text-cyan-400"
                />

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white sm:text-base">
                    Job Matching
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Opportunities matched with your profile
                  </p>
                </div>
              </div>

              <span className="w-fit shrink-0 rounded-xl bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-400 sm:px-4 sm:text-sm">
                {jobs.length} Matches
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCV;
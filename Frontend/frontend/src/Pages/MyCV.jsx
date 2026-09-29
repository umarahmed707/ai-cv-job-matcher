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
      return;
    }

    if (file.type !== "application/pdf") {
      setSelectedFile(null);
      setError("Only PDF files are currently supported.");
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
    <div className="max-w-7xl">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-cyan-400">
          <Sparkles size={18} />

          <span className="text-sm font-medium">
            CV Intelligence
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-bold text-white">
          My CV
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Upload your CV and review your AI-powered profile analysis.
        </p>
      </div>

      {/* Upload Card */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
              <FileText size={27} />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                {selectedFile?.name ||
                  analysis?.candidate_name ||
                  "Your CV"}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {selectedFile
                  ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                  : cvResult
                  ? "CV analyzed successfully"
                  : "Upload your CV to start AI analysis"}
              </p>
            </div>

          </div>

          <div className="flex flex-wrap gap-3">

            <label
              htmlFor="cv-upload"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              <Upload size={17} />
              Choose CV
            </label>

            <input
              id="cv-upload"
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />

            {selectedFile && (
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />
                    Analyzing...
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
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

      </div>

      {!cvResult ? (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">

          <FileText
            size={42}
            className="mx-auto text-slate-600"
          />

          <h2 className="mt-4 text-lg font-semibold text-white">
            No CV analysis available
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Upload and analyze your CV to generate your candidate profile,
            skills, experience and job recommendations.
          </p>

        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            {/* Candidate */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">

              <div className="flex items-center gap-3">
                <Sparkles
                  size={20}
                  className="text-cyan-400"
                />

                <h3 className="font-semibold text-white">
                  AI Profile Summary
                </h3>
              </div>

              <h2 className="mt-5 text-2xl font-bold text-cyan-400">
                {analysis?.candidate_name || "Candidate"}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {analysis?.professional_summary ||
                  "No professional summary available."}
              </p>

            </div>

            {/* Experience */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

              <div className="flex items-center gap-3">
                <BriefcaseBusiness
                  size={20}
                  className="text-purple-400"
                />

                <h3 className="font-semibold text-white">
                  Experience
                </h3>
              </div>

              <p className="mt-5 text-3xl font-bold text-white">
                {analysis?.years_of_experience ?? 0}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Years of professional experience
              </p>

            </div>

          </div>

          {/* Skills */}
          {analysis?.skills?.length > 0 && (
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">

              <div className="flex items-center gap-3">
                <Target
                  size={20}
                  className="text-cyan-400"
                />

                <h3 className="font-semibold text-white">
                  Detected Skills
                </h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">

                {analysis.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>
          )}

          {/* Experience Details */}
          {analysis?.experience?.length > 0 && (
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">

              <div className="flex items-center gap-3">
                <BriefcaseBusiness
                  size={20}
                  className="text-purple-400"
                />

                <h3 className="font-semibold text-white">
                  Work Experience
                </h3>
              </div>

              <div className="mt-5 space-y-5">

                {analysis.experience.map((item, index) => (
                  <div
                    key={`${item.job_title}-${item.company}-${index}`}
                    className="rounded-2xl border border-white/10 bg-slate-900/40 p-5"
                  >

                    <div className="flex flex-col justify-between gap-2 md:flex-row">

                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {item.job_title || "Job Role"}
                        </h4>

                        <p className="mt-1 text-xs text-cyan-400">
                          {item.company || "Company not provided"}
                        </p>
                      </div>

                      <span className="text-xs text-slate-500">
                        {item.duration || "Duration not provided"}
                      </span>

                    </div>

                    {item.responsibilities?.length > 0 && (
                      <div className="mt-4 space-y-2">

                        {item.responsibilities.map(
                          (responsibility, responsibilityIndex) => (
                            <p
                              key={`${responsibility}-${responsibilityIndex}`}
                              className="text-xs leading-5 text-slate-400"
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
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">

              <div className="flex items-center gap-3">
                <GraduationCap
                  size={20}
                  className="text-emerald-400"
                />

                <h3 className="font-semibold text-white">
                  Education
                </h3>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">

                {analysis.education.map((item, index) => (
                  <div
                    key={`${item.degree}-${item.institution}-${index}`}
                    className="rounded-2xl border border-white/10 bg-slate-900/40 p-5"
                  >

                    <h4 className="text-sm font-semibold text-white">
                      {item.degree || "Degree"}
                    </h4>

                    <p className="mt-2 text-xs text-cyan-400">
                      {item.institution || "Institution not provided"}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      {item.duration || "Duration not provided"}
                    </p>

                  </div>
                ))}

              </div>

            </div>
          )}

          {/* Recommended Roles */}
          {analysis?.recommended_roles?.length > 0 && (
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">

              <div className="flex items-center gap-3">
                <Sparkles
                  size={20}
                  className="text-purple-400"
                />

                <h3 className="font-semibold text-white">
                  Recommended Roles
                </h3>

              </div>

              <div className="mt-5 flex flex-wrap gap-2">

                {analysis.recommended_roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-lg bg-purple-400/10 px-3 py-1.5 text-xs text-purple-300"
                  >
                    {role}
                  </span>
                ))}

              </div>

            </div>
          )}

          {/* Strengths + Skill Gaps */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            {analysis?.strengths?.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-emerald-400"
                  />

                  <h3 className="font-semibold text-white">
                    Strengths
                  </h3>
                </div>

                <div className="mt-5 space-y-3">

                  {analysis.strengths.map((strength) => (
                    <div
                      key={strength}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <CheckCircle2
                        size={15}
                        className="shrink-0 text-emerald-400"
                      />

                      {strength}
                    </div>
                  ))}

                </div>

              </div>
            )}

            {analysis?.skill_gaps?.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                <div className="flex items-center gap-3">
                  <AlertTriangle
                    size={20}
                    className="text-amber-400"
                  />

                  <h3 className="font-semibold text-white">
                    Skill Gaps
                  </h3>
                </div>

                <div className="mt-5 space-y-3">

                  {analysis.skill_gaps.map((gap) => (
                    <div
                      key={gap}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <AlertTriangle
                        size={15}
                        className="shrink-0 text-amber-400"
                      />

                      {gap}
                    </div>
                  ))}

                </div>

              </div>
            )}

          </div>

          {/* Job Match Summary */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <BriefcaseBusiness
                  size={20}
                  className="text-cyan-400"
                />

                <div>
                  <h3 className="font-semibold text-white">
                    Job Matching
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Opportunities matched with your profile
                  </p>
                </div>

              </div>

              <span className="rounded-xl bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-400">
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
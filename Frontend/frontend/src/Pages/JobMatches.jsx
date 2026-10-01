
import { useState } from "react";

import {
  BriefcaseBusiness,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Clock3,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useCV } from "../context/CVcontext";

const JobMatches = () => {
  const { cvResult } = useCV();

  const jobs = cvResult?.job_matches || [];

  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="w-full max-w-7xl px-1 sm:px-2 lg:px-0">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-cyan-400">
          <Sparkles size={17} className="shrink-0 sm:h-[18px] sm:w-[18px]" />

          <span className="text-xs font-medium sm:text-sm">
            AI Career Matching
          </span>
        </div>

        <h1 className="mt-2 text-2xl font-bold text-white sm:mt-3 sm:text-3xl">
          Job Matches
        </h1>

        <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
          Opportunities matched with your CV skills and experience.
        </p>
      </div>

      {/* No CV analyzed */}
      {!cvResult ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center sm:rounded-3xl sm:p-12">
          <BriefcaseBusiness
            size={38}
            className="mx-auto text-slate-600 sm:h-[42px] sm:w-[42px]"
          />

          <h2 className="mt-4 text-base font-semibold text-white sm:mt-5 sm:text-lg">
            No job matches available
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            Upload your CV from the My CV page. Our AI will analyze your
            skills and experience and find suitable job opportunities.
          </p>

          <Link
            to="/my-cv"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-5 sm:text-sm"
          >
            <Sparkles size={16} />
            Analyze My CV
          </Link>
        </div>
      ) : jobs.length === 0 ? (
        /* No matching jobs */
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center sm:rounded-3xl sm:p-12">
          <AlertCircle
            size={38}
            className="mx-auto text-slate-600 sm:h-[42px] sm:w-[42px]"
          />

          <h2 className="mt-4 text-base font-semibold text-white sm:mt-5 sm:text-lg">
            No matching jobs found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            We couldn't find suitable opportunities based on your current
            skills and experience.
          </p>
        </div>
      ) : (
        <>
          {/* Result Summary */}
          <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white sm:text-base">
                {cvResult.analysis?.candidate_name || "Candidate"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {jobs.length} suitable opportunities found
              </p>
            </div>

            <div className="w-fit rounded-xl bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-400 sm:px-4 sm:text-sm">
              AI Matched
            </div>
          </div>

          {/* Dynamic Jobs */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05] sm:rounded-3xl sm:p-5"
              >
                {/* Job Header */}
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 sm:h-11 sm:w-11">
                      <BriefcaseBusiness size={19} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-white">
                        {job.title}
                      </h3>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-bold text-cyan-400 sm:text-xl">
                      {job.match_score}%
                    </p>

                    <p className="text-[9px] uppercase tracking-wide text-slate-500 sm:text-[10px]">
                      Match
                    </p>
                  </div>
                </div>

                {/* Location + Type */}
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 sm:mt-5">
                  <span className="flex min-w-0 max-w-full items-center gap-1">
                    <MapPin size={13} className="shrink-0" />

                    <span className="truncate">{job.location}</span>
                  </span>

                  <span className="hidden sm:inline">•</span>

                  <span>{job.type}</span>
                </div>

                {/* Matched Skills */}
                {job.matched_skills?.length > 0 && (
                  <div className="mt-4 sm:mt-5">
                    <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-slate-500 sm:text-[10px]">
                      Matched Skills
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {job.matched_skills.map((skill) => (
                        <span
                          key={skill}
                          className="max-w-full break-words rounded-lg bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-300 sm:px-2.5 sm:text-[11px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Skills */}
                {job.missing_skills?.length > 0 && (
                  <div className="mt-4 sm:mt-5">
                    <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-slate-500 sm:text-[10px]">
                      Skill Gaps
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {job.missing_skills.map((skill) => (
                        <span
                          key={skill}
                          className="max-w-full break-words rounded-lg bg-red-400/10 px-2 py-1 text-[10px] text-red-300 sm:px-2.5 sm:text-[11px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Match Reason */}
                <div className="mt-4 border-t border-white/10 pt-4 sm:mt-5">
                  <div className="flex gap-2">
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-cyan-400"
                    />

                    <p className="line-clamp-3 text-xs leading-5 text-slate-400">
                      {job.reason}
                    </p>
                  </div>
                </div>

                {/* View Job */}
                <button
                  type="button"
                  onClick={() => setSelectedJob(job)}
                  className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-medium text-white transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300 sm:mt-5"
                >
                  View Job
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Job Details Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="my-auto max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 p-4 shadow-2xl sm:rounded-3xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 sm:h-14 sm:w-14 sm:rounded-2xl">
                  <BriefcaseBusiness size={22} className="sm:h-[26px] sm:w-[26px]" />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-base font-bold text-white sm:text-xl">
                    {selectedJob.title}
                  </h2>

                  <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
                    {selectedJob.company}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="shrink-0 rounded-xl p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            {/* Job Info */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin size={15} />
                  <span className="text-xs">Location</span>
                </div>

                <p className="mt-2 break-words text-sm font-medium text-white">
                  {selectedJob.location}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock3 size={15} />
                  <span className="text-xs">Job Type</span>
                </div>

                <p className="mt-2 break-words text-sm font-medium text-white">
                  {selectedJob.type}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-cyan-400/5 p-3.5 sm:p-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Sparkles size={15} />
                  <span className="text-xs">AI Match</span>
                </div>

                <p className="mt-2 text-sm font-bold text-cyan-400">
                  {selectedJob.match_score}%
                </p>
              </div>
            </div>

            {/* Match Reason */}
            <div className="mt-5 sm:mt-6">
              <h3 className="text-sm font-semibold text-white">
                Why this job matches
              </h3>

              <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
                <div className="flex gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-cyan-400"
                  />

                  <p className="text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                    {selectedJob.reason}
                  </p>
                </div>
              </div>
            </div>

            {/* Matched Skills */}
            {selectedJob.matched_skills?.length > 0 && (
              <div className="mt-5 sm:mt-6">
                <h3 className="text-sm font-semibold text-white">
                  Matched Skills
                </h3>

                <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedJob.matched_skills.map((skill) => (
                    <span
                      key={skill}
                      className="break-words rounded-lg bg-emerald-400/10 px-2.5 py-1.5 text-[11px] text-emerald-300 sm:px-3 sm:text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {selectedJob.missing_skills?.length > 0 && (
              <div className="mt-5 sm:mt-6">
                <h3 className="text-sm font-semibold text-white">
                  Skill Gaps
                </h3>

                <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedJob.missing_skills.map((skill) => (
                    <span
                      key={skill}
                      className="break-words rounded-lg bg-red-400/10 px-2.5 py-1.5 text-[11px] text-red-300 sm:px-3 sm:text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:mt-6 sm:p-4">
              <p className="text-xs text-slate-500">
                Required Experience
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                {selectedJob.experience_required ?? 0} year
                {selectedJob.experience_required !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedJob(null)}
              className="mt-5 w-full rounded-xl bg-cyan-400 py-3 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobMatches;
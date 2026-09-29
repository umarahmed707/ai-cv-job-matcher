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
    <div className="max-w-7xl">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-cyan-400">
          <Sparkles size={18} />

          <span className="text-sm font-medium">
            AI Career Matching
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-bold text-white">
          Job Matches
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Opportunities matched with your CV skills and experience.
        </p>
      </div>

      {/* No CV analyzed */}
      {!cvResult ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">

          <BriefcaseBusiness
            size={42}
            className="mx-auto text-slate-600"
          />

          <h2 className="mt-5 text-lg font-semibold text-white">
            No job matches available
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Upload your CV from the My CV page. Our AI will analyze your
            skills and experience and find suitable job opportunities.
          </p>

          <Link
            to="/my-cv"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <Sparkles size={17} />
            Analyze My CV
          </Link>
        </div>
      ) : jobs.length === 0 ? (

        /* No matching jobs */
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">

          <AlertCircle
            size={42}
            className="mx-auto text-slate-600"
          />

          <h2 className="mt-5 text-lg font-semibold text-white">
            No matching jobs found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            We couldn't find suitable opportunities based on your current
            skills and experience.
          </p>
        </div>

      ) : (

        <>
          {/* Result Summary */}
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div>
              <p className="text-sm font-medium text-white">
                {cvResult.analysis?.candidate_name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {jobs.length} suitable opportunities found
              </p>
            </div>

            <div className="rounded-xl bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-400">
              AI Matched
            </div>
          </div>

          {/* Dynamic Jobs */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]"
              >

                {/* Job Header */}
                <div className="flex items-start justify-between gap-4">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                      <BriefcaseBusiness size={20} />
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

                    <p className="text-xl font-bold text-cyan-400">
                      {job.match_score}%
                    </p>

                    <p className="text-[10px] uppercase tracking-wide text-slate-500">
                      Match
                    </p>

                  </div>

                </div>

                {/* Location + Type */}
                <div className="mt-5 flex items-center gap-3 text-xs text-slate-400">

                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {job.location}
                  </span>

                  <span>•</span>

                  <span>
                    {job.type}
                  </span>

                </div>

                {/* Matched Skills */}
                {job.matched_skills?.length > 0 && (
                  <div className="mt-5">

                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Matched Skills
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {job.matched_skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300"
                        >
                          {skill}
                        </span>
                      ))}

                    </div>

                  </div>
                )}

                {/* Missing Skills */}
                {job.missing_skills?.length > 0 && (
                  <div className="mt-5">

                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Skill Gaps
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {job.missing_skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg bg-red-400/10 px-2.5 py-1 text-[11px] text-red-300"
                        >
                          {skill}
                        </span>
                      ))}

                    </div>

                  </div>
                )}

                {/* Match Reason */}
                <div className="mt-5 border-t border-white/10 pt-4">

                  <div className="flex gap-2">

                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-cyan-400"
                    />

                    <p className="text-xs leading-5 text-slate-400">
                      {job.reason}
                    </p>

                  </div>

                </div>

                {/* View Job */}
                <button
                  type="button"
                  onClick={() => setSelectedJob(job)}
                  className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-medium text-white transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                  <BriefcaseBusiness size={26} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedJob.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedJob.company}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>

            </div>

            {/* Job Info */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin size={15} />
                  <span className="text-xs">Location</span>
                </div>

                <p className="mt-2 text-sm font-medium text-white">
                  {selectedJob.location}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock3 size={15} />
                  <span className="text-xs">Job Type</span>
                </div>

                <p className="mt-2 text-sm font-medium text-white">
                  {selectedJob.type}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-cyan-400/5 p-4">
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
            <div className="mt-6">

              <h3 className="text-sm font-semibold text-white">
                Why this job matches
              </h3>

              <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-cyan-400"
                  />

                  <p className="text-sm leading-6 text-slate-400">
                    {selectedJob.reason}
                  </p>
                </div>
              </div>

            </div>

            {/* Matched Skills */}
            {selectedJob.matched_skills?.length > 0 && (
              <div className="mt-6">

                <h3 className="text-sm font-semibold text-white">
                  Matched Skills
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">

                  {selectedJob.matched_skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </div>
            )}

            {/* Missing Skills */}
            {selectedJob.missing_skills?.length > 0 && (
              <div className="mt-6">

                <h3 className="text-sm font-semibold text-white">
                  Skill Gaps
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">

                  {selectedJob.missing_skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-red-400/10 px-3 py-1.5 text-xs text-red-300"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </div>
            )}

            {/* Experience */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">

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
              className="mt-6 w-full rounded-xl bg-cyan-400 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
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
import {
  Sparkles,
  TrendingUp,
  Briefcase,
  FileCheck,
  ArrowRight,
  UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useCV } from "../context/CVcontext";

const Dashboard = () => {
  const { cvResult } = useCV();

  const analysis = cvResult?.analysis;
  const jobs = cvResult?.job_matches || [];

  const topMatch = jobs.length
    ? Math.max(...jobs.map((job) => job.match_score || 0))
    : null;

  const totalSkills = analysis?.skills?.length || 0;
  const totalExperience = analysis?.years_of_experience ?? 0;

  return (
    <div className="w-full max-w-7xl">
      {/* Welcome */}
      <section className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-cyan-400">
          <Sparkles size={17} className="shrink-0 sm:size-[18px]" />

          <span className="text-xs font-medium sm:text-sm">
            AI Career Intelligence
          </span>
        </div>

        <h1 className="mt-3 break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {analysis?.candidate_name
            ? `Welcome, ${analysis.candidate_name}`
            : "Turn your CV into opportunities."}
        </h1>

        <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500 sm:text-sm">
          {analysis
            ? "Your CV has been analyzed. Explore your profile insights and matching job opportunities."
            : "Upload your CV from the My CV page and let AI analyze your skills, experience, and career profile."}
        </p>
      </section>

      {/* Stats */}
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-8 lg:grid-cols-3">
        {/* CV Status */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
            <FileCheck size={20} />
          </div>

          <p className="text-xs text-slate-500 sm:text-sm">
            CV Status
          </p>

          <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
            {cvResult ? "Analyzed" : "Not Analyzed"}
          </p>
        </div>

        {/* Job Matches */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400">
            <Briefcase size={20} />
          </div>

          <p className="text-xs text-slate-500 sm:text-sm">
            Job Matches
          </p>

          <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
            {jobs.length}
          </p>
        </div>

        {/* Top Match */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
            <TrendingUp size={20} />
          </div>

          <p className="text-xs text-slate-500 sm:text-sm">
            Top Job Match
          </p>

          <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
            {topMatch !== null ? `${topMatch}%` : "—"}
          </p>
        </div>
      </section>

      {!cvResult ? (
        /* Empty State */
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center sm:p-10">
          <UserRound
            size={38}
            className="mx-auto text-slate-600 sm:size-[42px]"
          />

          <h2 className="mt-4 text-base font-semibold text-white sm:text-lg">
            Your dashboard is ready
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-xs leading-6 text-slate-500 sm:text-sm">
            Upload your CV from the My CV page to generate your AI profile
            and discover relevant job opportunities.
          </p>

          <Link
            to="/my-cv"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto sm:py-2.5"
          >
            Analyze My CV
            <ArrowRight size={16} />
          </Link>
        </section>
      ) : (
        <>
          {/* Profile Overview */}
          <section className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            {/* Summary */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:col-span-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-cyan-400 sm:text-xs">
                    AI Profile
                  </p>

                  <h2 className="mt-2 break-words text-lg font-semibold text-white sm:text-xl">
                    {analysis?.candidate_name || "Candidate"}
                  </h2>
                </div>

                <div className="w-fit rounded-xl bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-300">
                  AI Analyzed
                </div>
              </div>

              <p className="mt-5 text-xs leading-6 text-slate-400 sm:text-sm sm:leading-7">
                {analysis?.professional_summary ||
                  "No professional summary available."}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-3">
                <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 sm:px-4">
                  <p className="text-xs text-slate-500">
                    Skills
                  </p>

                  <p className="mt-1 text-lg font-semibold text-white">
                    {totalSkills}
                  </p>
                </div>

                <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 sm:px-4">
                  <p className="text-xs text-slate-500">
                    Experience
                  </p>

                  <p className="mt-1 text-lg font-semibold text-white">
                    {totalExperience}{" "}
                    {totalExperience === 1 ? "Year" : "Years"}
                  </p>
                </div>
              </div>
            </div>

            {/* Recommended Roles */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400">
                  <Sparkles size={18} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white">
                    Recommended Roles
                  </h3>

                  <p className="text-xs text-slate-500">
                    Based on your profile
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                {analysis?.recommended_roles?.length ? (
                  analysis.recommended_roles
                    .slice(0, 5)
                    .map((role) => (
                      <div
                        key={role}
                        className="break-words rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 text-xs leading-5 text-slate-300"
                      >
                        {role}
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No recommended roles available.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Top Job Matches */}
          {jobs.length > 0 && (
            <section className="mt-6 sm:mt-8">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Sparkles
                      size={17}
                      className="shrink-0 text-cyan-400 sm:size-[18px]"
                    />

                    <h2 className="text-base font-semibold text-white sm:text-lg">
                      Top Job Matches
                    </h2>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    Best opportunities based on your skills and experience
                  </p>
                </div>

                <Link
                  to="/job-matches"
                  className="flex w-fit items-center gap-1 text-xs font-medium text-cyan-400 transition hover:text-cyan-300"
                >
                  View All
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {jobs.slice(0, 3).map((job) => (
                  <div
                    key={job.id}
                    className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/30 hover:bg-white/[0.05] sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-white">
                          {job.title}
                        </h3>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {job.company}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-base font-bold text-cyan-400 sm:text-lg">
                          {job.match_score}%
                        </p>

                        <p className="text-[9px] uppercase tracking-wide text-slate-500 sm:text-[10px]">
                          Match
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-xs text-slate-500">
                      {job.location} • {job.type}
                    </p>

                    {job.matched_skills?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.matched_skills
                          .slice(0, 4)
                          .map((skill) => (
                            <span
                              key={skill}
                              className="break-words rounded-lg bg-cyan-400/10 px-2.5 py-1 text-[10px] text-cyan-300 sm:text-[11px]"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
import {
  BriefcaseBusiness,
  MapPin,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const jobs = [
  {
    title: "React.js Developer",
    company: "Tech Solutions",
    location: "Karachi",
    type: "Full-time",
    match: 94,
    skills: ["React.js", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Frontend Developer",
    company: "Digital Labs",
    location: "Remote",
    type: "Full-time",
    match: 89,
    skills: ["React.js", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Next.js Developer",
    company: "Software House",
    location: "Karachi",
    type: "Hybrid",
    match: 84,
    skills: ["Next.js", "React.js", "Tailwind CSS"],
  },
];

const JobMatcher = () => {
  return (
    <section className="mt-8">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-cyan-400" />

            <h2 className="text-lg font-semibold text-white">
              AI Job Matches
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Jobs matched with your CV skills and experience
          </p>
        </div>

        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400">
          AI Powered
        </span>
      </div>

      {/* Jobs */}
      <div className="grid gap-4 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.05]"
          >
            {/* Job header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <BriefcaseBusiness size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {job.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {job.company}
                  </p>
                </div>
              </div>

              {/* Match */}
              <div className="text-right">
                <p className="text-lg font-bold text-cyan-400">
                  {job.match}%
                </p>

                <p className="text-[10px] uppercase tracking-wide text-slate-500">
                  Match
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="mt-5 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                {job.location}
              </div>

              <span>•</span>

              <span>{job.type}</span>
            </div>

            {/* Skills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* AI reason */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="flex gap-2">
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-cyan-400"
                />

                <p className="text-xs leading-5 text-slate-400">
                  Strong match based on your React.js, JavaScript and
                  frontend development experience.
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              type="button"
              className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-medium text-white transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
            >
              View Job
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobMatcher;
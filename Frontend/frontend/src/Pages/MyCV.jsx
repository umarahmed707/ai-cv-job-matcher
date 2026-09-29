import {
  FileText,
  Upload,
  Calendar,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const MyCV = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="mb-8">
        <p className="text-sm font-medium text-cyan-400">
          Your Resume
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          My CV
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your CV and review your AI-powered profile analysis.
        </p>
      </div>

      {/* CV Card */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
              <FileText size={27} />
            </div>

            <div>
              <h3 className="font-semibold">
                Your CV
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Upload your CV to start AI analysis
              </p>
            </div>
          </div>

          <label
            htmlFor="cv-upload"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <Upload size={17} />
            Upload CV
          </label>

          <input
            id="cv-upload"
            type="file"
            accept=".pdf"
            className="hidden"
          />

        </div>
      </div>

      {/* Analysis */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="text-cyan-400" size={20} />

            <h3 className="font-semibold">
              AI Analysis
            </h3>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Upload your CV to let AI identify your skills,
            experience, education and suitable job roles.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <CheckCircle2 size={17} />
            Analysis not available yet
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3">
            <Calendar className="text-purple-400" size={20} />

            <h3 className="font-semibold">
              Last Updated
            </h3>
          </div>

          <p className="mt-4 text-2xl font-semibold">
            —
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Your CV analysis date will appear here.
          </p>
        </div>

      </div>

    </div>
  );
};

export default MyCV;
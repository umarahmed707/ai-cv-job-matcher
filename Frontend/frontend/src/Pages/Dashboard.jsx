import { Sparkles, TrendingUp, Briefcase, FileCheck } from "lucide-react";
import CVUpload from "../component/CVUpload";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
    

  
        

        <main className="p-8">
          
          {/* Welcome */}
          <section className="mb-8">
            <div className="flex items-center gap-2 text-cyan-400">
              <Sparkles size={18} />

              <span className="text-sm font-medium">
                AI Career Intelligence
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Turn your CV into opportunities.
            </h1>

            <p className="mt-2 max-w-2xl text-slate-500">
              Upload your CV and let AI analyze your skills, experience,
              and profile to discover the jobs that fit you best.
            </p>
          </section>

          {/* Stats */}
          <section className="mb-8 grid gap-4 md:grid-cols-3">
            
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                <FileCheck size={20} />
              </div>

              <p className="text-sm text-slate-500">
                CV Status
              </p>

              <p className="mt-1 text-xl font-semibold">
                Not Analyzed
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400">
                <Briefcase size={20} />
              </div>

              <p className="text-sm text-slate-500">
                Job Matches
              </p>

              <p className="mt-1 text-xl font-semibold">
                0
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <TrendingUp size={20} />
              </div>

              <p className="text-sm text-slate-500">
                Profile Score
              </p>

              <p className="mt-1 text-xl font-semibold">
                —
              </p>
            </div>
          </section>

          {/* Upload */}
          <CVUpload />

        </main>
      </div>
  
  );
};

export default Dashboard;
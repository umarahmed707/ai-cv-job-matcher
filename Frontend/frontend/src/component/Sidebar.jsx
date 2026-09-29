import {
  LayoutDashboard,
  FileText,
  BriefcaseBusiness,
  Settings,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-slate-950 px-5 py-6 text-white">
      
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600">
          <Sparkles size={21} />
        </div>

        <div>
          <h1 className="font-semibold">CV Matcher</h1>
          <p className="text-xs text-slate-500">AI Career Assistant</p>
        </div>
      </div>

      <nav className="space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white"
        >
          <LayoutDashboard size={19} />
          Dashboard
        </Link>

        <Link
          to="/my-cv"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <FileText size={19} />
          My CV
        </Link>

        <Link
          to="/job-matches"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <BriefcaseBusiness size={19} />
          Job Matches
        </Link>

        <Link 
        to="/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <Settings size={19} />
          Settings
        </Link>
      </nav>

      <div className="mt-auto rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
        <p className="text-xs font-medium text-cyan-400">
          AI Powered
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Analyze your CV and discover opportunities that match your skills.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

import { Bell, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/80 px-8 backdrop-blur-xl">
      
      <div>
        <p className="text-sm text-slate-500">
          AI Career Dashboard
        </p>

        <h2 className="text-lg font-semibold text-white">
          Find your next opportunity
        </h2>
      </div>

      <div className="flex items-center gap-5">
        <button className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-semibold text-white">
            UA
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">
              Candidate
            </p>
            <p className="text-xs text-slate-500">
              Job Seeker
            </p>
          </div>
        </div>

        <UserCircle className="text-slate-500" size={20} />
      </div>
    </header>
  );
};

export default Navbar;
import { Bell, UserCircle } from "lucide-react";
import { useCV } from "../context/CVcontext";

const Navbar = () => {
  const { cvResult } = useCV();

  const candidateName =
    cvResult?.analysis?.candidate_name || "Candidate";

  const initials = candidateName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0]?.toUpperCase())
    .join("") || "UA";

  return (
    <header className="flex min-h-20 items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">

      {/* Left */}
      <div className="min-w-0 pl-14 md:pl-0">
        <p className="truncate text-xs text-slate-500 sm:text-sm">
          AI Career Dashboard
        </p>

        <h2 className="mt-0.5 truncate text-sm font-semibold text-white sm:text-lg">
          Find your next opportunity
        </h2>
      </div>

      {/* Right */}
      <div className="ml-4 flex shrink-0 items-center gap-2 sm:gap-4 md:gap-5">

        {/* Notification */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={19} />

          {cvResult && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400" />
          )}
        </button>

        {/* User */}
        <div className="flex items-center gap-2 sm:gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-xs font-semibold text-white sm:h-10 sm:w-10 sm:text-sm">
            {initials}
          </div>

          <div className="hidden min-w-0 sm:block">
            <p className="max-w-28 truncate text-sm font-medium text-white md:max-w-none">
              {candidateName}
            </p>

            <p className="text-xs text-slate-500">
              Job Seeker
            </p>
          </div>
        </div>

        {/* Profile Icon */}
        <UserCircle
          className="hidden text-slate-500 md:block"
          size={20}
        />
      </div>
    </header>
  );
};

export default Navbar;
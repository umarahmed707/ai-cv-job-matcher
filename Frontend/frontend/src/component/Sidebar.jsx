import {
  LayoutDashboard,
  FileText,
  BriefcaseBusiness,
  Settings,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      to: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      to: "/my-cv",
      label: "My CV",
      icon: FileText,
    },
    {
      to: "/job-matches",
      label: "Job Matches",
      icon: BriefcaseBusiness,
    },
    {
      to: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-950 text-white shadow-lg md:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={21} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64
          flex-col border-r border-white/10 bg-slate-950
          px-5 py-6 text-white
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600">
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="font-semibold">Nexora</h1>
              <p className="text-xs text-slate-500">
                AI Career Assistant
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.to ||
              (item.to !== "/" &&
                location.pathname.startsWith(item.to));

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeSidebar}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3
                  text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon size={19} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Card */}
        <div className="mt-auto rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
          <p className="text-xs font-medium text-cyan-400">
            AI Powered
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Analyze your CV and discover opportunities that match your skills.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
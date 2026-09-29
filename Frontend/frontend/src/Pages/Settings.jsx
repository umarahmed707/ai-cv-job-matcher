import {
  User,
  Bell,
  ShieldCheck,
  Save,
  Mail,
  Sparkles,
} from "lucide-react";

const Settings = () => {
  return (
    <div className="max-w-5xl">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-cyan-400" />

          <p className="text-sm font-medium text-cyan-400">
            Account Settings
          </p>
        </div>

        <h1 className="mt-2 text-2xl font-semibold text-white">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your profile, notifications and privacy preferences.
        </p>
      </div>

      <div className="space-y-6">

        {/* Profile */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <User size={19} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Profile Information
              </h2>

              <p className="text-xs text-slate-500">
                Update your candidate profile
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* First Name */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                First Name
              </label>

              <input
                type="text"
                defaultValue="Umar"
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Last Name
              </label>

              <input
                type="text"
                defaultValue="Ahmed"
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  defaultValue="candidate@example.com"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-400/50"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Professional Role
              </label>

              <input
                type="text"
                defaultValue="Frontend Developer"
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Preferred Location
              </label>

              <input
                type="text"
                defaultValue="Karachi / Remote"
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
              />
            </div>

          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
              <Bell size={19} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Notifications
              </h2>

              <p className="text-xs text-slate-500">
                Control how you receive job recommendations
              </p>
            </div>
          </div>

          <div className="space-y-4">

            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4">

              <div>
                <p className="text-sm font-medium text-white">
                  Job Match Alerts
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Notify me when new jobs match my CV.
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-cyan-400"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4">

              <div>
                <p className="text-sm font-medium text-white">
                  AI Analysis Updates
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Receive updates when your CV analysis is completed.
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-cyan-400"
              />
            </label>

          </div>
        </section>

        {/* Privacy */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <ShieldCheck size={19} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                CV & Privacy
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your uploaded CV is processed to extract skills,
                experience and profile information for AI-powered job
                matching.
              </p>

              <div className="mt-4 rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-4">
                <p className="text-xs leading-5 text-slate-400">
                  CV data is only used for analysis and job matching
                  within this application.
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Settings;
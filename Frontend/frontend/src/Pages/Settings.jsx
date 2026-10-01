
import { useEffect, useState } from "react";

import {
  User,
  Bell,
  ShieldCheck,
  Save,
  Mail,
  Sparkles,
  MapPin,
  BriefcaseBusiness,
  Code2,
  RotateCcw,
} from "lucide-react";

const STORAGE_KEY = "ai_cv_job_matcher_settings";

const defaultSettings = {
  firstName: "Umar",
  lastName: "Ahmed",
  email: "candidate@example.com",

  preferredRole: "Frontend Developer",

  preferredRoles: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
  ],

  skills: [
    "React.js",
    "Next.js",
    "JavaScript",
    "Tailwind CSS",
  ],

  location: "Karachi",

  workType: ["Remote", "Hybrid"],

  experienceLevel: "Entry Level",

  employmentType: ["Full-time", "Internship"],

  minimumSalary: "",

  notifications: {
    jobMatchAlerts: true,
    aiAnalysisUpdates: true,
  },
};

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Load saved settings
  useEffect(() => {
    try {
  const savedSettings = localStorage.getItem(STORAGE_KEY);

if (savedSettings) {
  const parsedSettings = JSON.parse(savedSettings);

  setSettings({
    ...defaultSettings,
    ...parsedSettings,
    notifications: {
      ...defaultSettings.notifications,
      ...(parsedSettings.notifications || {}),
    },
  });
}
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  }, []);

  // Normal input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
    setError("");
  };

  // Notification change
  const handleNotificationChange = (name) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: !prev.notifications[name],
      },
    }));

    setSaved(false);
  };

  // Convert comma separated text to array
  const handleArrayChange = (name, value) => {
    const arrayValue = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    setSettings((prev) => ({
      ...prev,
      [name]: arrayValue,
    }));

    setSaved(false);
  };

  // Work type
  const toggleWorkType = (type) => {
    setSettings((prev) => {
      const exists = prev.workType.includes(type);

      return {
        ...prev,
        workType: exists
          ? prev.workType.filter((item) => item !== type)
          : [...prev.workType, type],
      };
    });

    setSaved(false);
  };

  // Employment type
  const toggleEmploymentType = (type) => {
    setSettings((prev) => {
      const exists = prev.employmentType.includes(type);

      return {
        ...prev,
        employmentType: exists
          ? prev.employmentType.filter((item) => item !== type)
          : [...prev.employmentType, type],
      };
    });

    setSaved(false);
  };

  // Save settings
  const handleSave = () => {
    setError("");

    if (!settings.firstName.trim()) {
      setError("First name is required.");
      return;
    }

    if (!settings.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!settings.preferredRole.trim()) {
      setError("Preferred job role is required.");
      return;
    }

    if (!settings.location.trim()) {
      setError("Preferred location is required.");
      return;
    }

    if (settings.workType.length === 0) {
      setError("Select at least one work type.");
      return;
    }

    if (settings.employmentType.length === 0) {
      setError("Select at least one employment type.");
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      setError("Unable to save settings.");
    }
  };

  // Reset settings
  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);

    setSettings(defaultSettings);
    setSaved(false);
    setError("");
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-white/[0.06]";

  const labelClass = "mb-2 block text-sm font-medium text-slate-300";

  return (
    <div className="w-full max-w-5xl pb-10">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={18} className="text-cyan-400" />

          <span className="text-sm font-medium text-cyan-400">
            AI Job Matcher
          </span>
        </div>

        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Add your professional preferences so the AI Job Matcher can
          personalize job recommendations for you.
        </p>
      </div>

      {/* Success */}
      {saved && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
          <Save size={17} />
          Settings saved successfully. Job matching preferences updated.
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Profile */}
      <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
            <User size={20} className="text-cyan-400" />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Profile Information
            </h2>

            <p className="text-xs text-slate-500">
              Basic information about you
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>First Name</label>

            <input
              name="firstName"
              value={settings.firstName}
              onChange={handleChange}
              placeholder="First name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Last Name</label>

            <input
              name="lastName"
              value={settings.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Email</label>

            <div className="relative">
              <Mail
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Job Preferences */}
      <section className="mb-6 rounded-2xl border border-cyan-400/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
            <BriefcaseBusiness size={20} className="text-cyan-400" />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Job Preferences
            </h2>

            <p className="text-xs text-slate-500">
              These preferences will be used by the AI Job Matcher
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {/* Main Role */}
          <div>
            <label className={labelClass}>
              Preferred Job Role
            </label>

            <input
              name="preferredRole"
              value={settings.preferredRole}
              onChange={handleChange}
              placeholder="e.g. React Developer"
              className={inputClass}
            />
          </div>

          {/* Multiple Roles */}
          <div>
            <label className={labelClass}>
              Other Preferred Roles
            </label>

            <input
              value={settings.preferredRoles.join(", ")}
              onChange={(e) =>
                handleArrayChange("preferredRoles", e.target.value)
              }
              placeholder="React Developer, Frontend Developer, Next.js Developer"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-slate-500">
              Separate multiple roles with commas.
            </p>
          </div>

          {/* Skills */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
              <Code2 size={15} className="text-cyan-400" />
              Your Skills
            </label>

            <input
              value={settings.skills.join(", ")}
              onChange={(e) =>
                handleArrayChange("skills", e.target.value)
              }
              placeholder="React.js, Next.js, JavaScript, Tailwind CSS"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-slate-500">
              Add the technologies and skills you want the matcher to
              consider.
            </p>
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>
              Preferred Location
            </label>

            <div className="relative">
              <MapPin
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                name="location"
                value={settings.location}
                onChange={handleChange}
                placeholder="Karachi, Lahore, Remote"
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          {/* Work Type */}
          <div>
            <label className={labelClass}>
              Work Type
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {["Remote", "Hybrid", "On-site"].map((type) => {
                const active = settings.workType.includes(type);

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleWorkType(type)}
                    className={`rounded-xl border px-4 py-3 text-sm transition ${
                      active
                        ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                        : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className={labelClass}>
              Experience Level
            </label>

            <select
              name="experienceLevel"
              value={settings.experienceLevel}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Internship">Internship</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Junior">Junior</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className={labelClass}>
              Employment Type
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Full-time",
                "Part-time",
                "Internship",
                "Contract",
              ].map((type) => {
                const active = settings.employmentType.includes(type);

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleEmploymentType(type)}
                    className={`rounded-xl border px-4 py-3 text-sm transition ${
                      active
                        ? "border-purple-400/40 bg-purple-400/10 text-purple-300"
                        : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Salary */}
          <div>
            <label className={labelClass}>
              Minimum Salary <span className="text-slate-500">(Optional)</span>
            </label>

            <input
              name="minimumSalary"
              type="number"
              min="0"
              value={settings.minimumSalary}
              onChange={handleChange}
              placeholder="e.g. 50000"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-slate-500">
              Enter your minimum expected monthly salary in PKR.
            </p>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10">
            <Bell size={20} className="text-purple-400" />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Notifications
            </h2>

            <p className="text-xs text-slate-500">
              Control your AI job matching notifications
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div>
              <p className="text-sm font-medium text-white">
                Job Match Alerts
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Get notified when relevant jobs are found.
              </p>
            </div>

            <input
              type="checkbox"
              checked={settings.notifications.jobMatchAlerts}
              onChange={() =>
                handleNotificationChange("jobMatchAlerts")
              }
              className="h-5 w-5 accent-cyan-400"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div>
              <p className="text-sm font-medium text-white">
                AI Analysis Updates
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Receive updates about your CV analysis.
              </p>
            </div>

            <input
              type="checkbox"
              checked={settings.notifications.aiAnalysisUpdates}
              onChange={() =>
                handleNotificationChange("aiAnalysisUpdates")
              }
              className="h-5 w-5 accent-cyan-400"
            />
          </label>
        </div>
      </section>

      {/* Privacy */}
      <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
            <ShieldCheck size={20} className="text-emerald-400" />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              CV & Privacy
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your preferences are stored locally in your browser and
              are used to personalize the AI job matching experience.
            </p>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]"
        >
          <RotateCcw size={16} />
          Reset
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          <Save size={16} />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;


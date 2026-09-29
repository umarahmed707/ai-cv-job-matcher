import { FileUp, UploadCloud } from "lucide-react";

const CVUpload = () => {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5">
        <p className="text-sm font-medium text-cyan-400">
          Step 01
        </p>

        <h3 className="mt-1 text-xl font-semibold text-white">
          Upload your CV
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Upload your latest resume and let AI analyze your profile.
        </p>
      </div>

      <div className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 px-6 text-center transition hover:border-cyan-400/50 hover:bg-cyan-400/[0.03]">
        
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
          <UploadCloud size={28} />
        </div>

        <h4 className="font-medium text-white">
          Drop your CV here
        </h4>

        <p className="mt-2 text-sm text-slate-500">
          or click to browse from your computer
        </p>

        <div className="mt-5">
  <label
    htmlFor="cv-upload"
    className="flex w-[200px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
  >
    <FileUp size={17} />
    Choose PDF
  </label>

  <input
    id="cv-upload"
    type="file"
    accept=".pdf"
    className="hidden"
  />
</div>

        <p className="mt-3 text-xs text-slate-600">
          PDF files only • Maximum 5MB
        </p>
      </div>
    </section>
  );
};

export default CVUpload;
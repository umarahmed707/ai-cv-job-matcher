import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      <Sidebar />

      {/* Main wrapper */}
      <div className="w-full md:ml-64 md:w-[calc(100%-16rem)]">
        <Navbar />

        <main className="w-full px-4 pb-8 pt-8 sm:px-6 md:px-6 md:pt-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
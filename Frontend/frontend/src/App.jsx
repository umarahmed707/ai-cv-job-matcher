import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./Pages/Dashboard";
import MyCV from "./Pages/MyCV";
import JobMatches from "./Pages/JobMatches";
import Settings from "./Pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<DashboardLayout />}>

          <Route path="/" element={<Dashboard />} />

          <Route path="/my-cv" element={<MyCV />} />

          <Route path="/job-matches" element={<JobMatches />} />

          <Route path="/settings" element={<Settings />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
import DashboardLayout from "../layout/DashboardLayout";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Dashboard.css";

import {
  FiTrendingUp,
  FiBarChart2,
  FiActivity,
  FiPieChart,
} from "react-icons/fi";
import { API_BASE } from "../config/api";

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  const [counts, setCounts] = useState({
    blogs: 0,
    banners: 0,
    testimonials: 0,
    services: 0,
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/dashboard-counts/counts`)
      .then((res) => res.json())
      .then((data) => setCounts(data))
      .catch((err) => console.error("Dashboard count error:", err));
  }, []);

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Overview of your platform's current status.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard
          icon={<FiTrendingUp size={22} />}
          label="Total Blogs"
          count={counts.blogs}
          bg="bg-blue-50"
          text="text-blue-600"
        />
        <StatsCard
          icon={<FiBarChart2 size={22} />}
          label="Active Banners"
          count={counts.banners}
          bg="bg-indigo-50"
          text="text-indigo-600"
        />
        <StatsCard
          icon={<FiActivity size={22} />}
          label="Testimonials"
          count={counts.testimonials}
          bg="bg-emerald-50"
          text="text-emerald-600"
        />
        <StatsCard
          icon={<FiPieChart size={22} />}
          label="Services"
          count={counts.services}
          bg="bg-amber-50"
          text="text-amber-600"
        />
      </div>

      {/* Calendar Section */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Content Calendar
            </h2>
            <p className="text-sm text-slate-500">
              Track and plan your upcoming updates
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Calendar
            onChange={setDate}
            value={date}
            className="custom-calendar border-none w-full"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatsCard({ icon, label, count, bg, text }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-300 transition-all">
      <div className="flex items-center gap-4">
        <div className={`${bg} ${text} p-3 rounded-xl`}>{icon}</div>
        <div>
          <p className="text-slate-500 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-900">
            {count.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

import DashboardLayout from "../layout/DashboardLayout";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Dashboard.css";

export default function Dashboard() {
  const location = useLocation();
  const user = location.state?.user;

  const email = user?.Email;

  const [date, setDate] = useState(new Date());

  return (
    <DashboardLayout email={email}>
      <h1 className="text-3xl font-bold mb-5">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card label="Blogs" count={2} />
        <Card label="Banner" count={3} />
        <Card label="Testimonial" count={6} />
        <Card label="Services" count={9} />
      </div>

      {/* Calendar Section */}
      <div className="bg-white shadow rounded-md p-5 w-full md:w-1/3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Calendar</h2>
          <button className="text-blue-600 text-sm">Show All</button>
        </div>

        <Calendar
          onChange={setDate}
          value={date}
          className="rounded-lg border-none shadow-sm"
        />
      </div>
    </DashboardLayout>
  );
}

function Card({ label, count }) {
  return (
    <div className="bg-blue-50 p-6 rounded-md shadow text-center">
      <p className="text-lg font-medium">{label}</p>
      <p className="text-2xl font-bold text-blue-600">{count}</p>
    </div>
  );
}

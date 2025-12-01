import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [email] = useState(() => localStorage.getItem("adminEmail") || "");

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-16 md:ml-64 w-full min-h-screen bg-gray-50">
        <Topbar email={email} />

        <div className="pt-20 px-6">{children}</div>

        <Footer />
      </div>
    </div>
  );
}

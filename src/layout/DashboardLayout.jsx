import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function DashboardLayout({ children, email }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-16 md:ml-64 w-full">
        <Topbar email={email} />

        <div className="pt-20 px-6">{children}</div>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

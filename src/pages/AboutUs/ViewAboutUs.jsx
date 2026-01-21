import DashboardLayout from "../../layout/DashboardLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function ViewAboutUs() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/aboutus`)
      .then((res) => res.json())
      .then((data) => {
        setData(data || {});
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64 text-slate-500 font-medium">
          Loading content...
        </div>
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout>
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
          Error: {error}
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">About Us</h1>
        <p className="text-slate-500 mt-1">
          Manage your website's introductory content and imagery.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">
                  #
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Scroll Content
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Image
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-5 text-sm text-slate-500 text-center font-medium">
                  1
                </td>

                <td className="px-6 py-5">
                  <p className="text-sm text-slate-700 leading-relaxed max-w-xs">
                    {data.Description || "—"}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <p className="text-sm text-slate-700 leading-relaxed max-w-xs">
                    {data.Scroll_Content || "—"}
                  </p>
                </td>

                <td className="px-6 py-5">
                  {data.Image ? (
                    <div className="flex justify-center">
                      <img
                        src={`${API_BASE}${data.Image}`}
                        alt="About"
                        className="w-24 h-16 object-cover rounded-lg border border-slate-200 shadow-sm"
                      />
                    </div>
                  ) : (
                    <div className="text-center text-slate-400 text-sm">—</div>
                  )}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
                      onClick={() => navigate("/dashboard/about-us/edit")}
                      title="Edit Content"
                    >
                      <FiEdit2
                        size={20}
                        className="group-hover:scale-110 transition-transform"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

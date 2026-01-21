import DashboardLayout from "../../layout/DashboardLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiSettings } from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function ViewSettings() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/settings`)
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
        <div className="p-10 text-slate-400 font-medium">
          Loading configuration...
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-light text-slate-800 tracking-tight">
                Global{" "}
                <span className="font-bold text-indigo-600">Settings</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Manage your site's contact info and social links.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/view-settings/edit")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <FiEdit2 size={18} /> Edit Configuration
            </button>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="py-5 px-8 text-[11px] font-black text-slate-400 uppercase tracking-widest w-20 text-center">
                      #
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Contact Information
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="group hover:bg-indigo-50/30 transition-colors">
                    <td className="py-10 px-8 text-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                        <FiSettings size={18} />
                      </div>
                    </td>
                    <td className="py-10 px-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <FiMapPin className="text-indigo-500" /> Office
                            Address
                          </label>
                          <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                            {data.Address || "Not set"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <FiPhone className="text-indigo-500" /> Phone Number
                          </label>
                          <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                            {data.Mobile_Number || "Not set"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <FiMail className="text-indigo-500" /> Email Address
                          </label>
                          <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                            {data.Email || "Not set"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-10 px-8 text-center">
                      <button
                        onClick={() =>
                          navigate("/dashboard/view-settings/edit")
                        }
                        className="p-3 rounded-xl bg-white border border-slate-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-90"
                      >
                        <FiEdit2 size={18} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

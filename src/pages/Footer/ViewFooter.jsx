import DashboardLayout from "../../layout/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiLayout, FiList } from "react-icons/fi";
import { API_BASE } from "../../config/api";

export default function ViewFooter() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/footer`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <DashboardLayout>
        <div className="p-10 text-slate-400 font-medium">
          Loading footer data...
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
                Footer{" "}
                <span className="font-bold text-indigo-600">Structure</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Manage the bottom navigation and copyright content.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/view-footer/edit")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <FiEdit2 size={18} /> Edit Footer
            </button>
          </div>

          {/* Simple Table Card */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="py-5 px-8 text-[11px] font-black text-slate-400 uppercase tracking-widest w-20 text-center">
                    ID
                  </th>
                  <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Main Content
                  </th>
                  <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="group hover:bg-indigo-50/30 transition-colors">
                  <td className="py-12 px-8 text-center text-slate-300 font-bold">
                    01
                  </td>
                  <td className="py-12 px-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <FiLayout size={20} />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                          About Text / Copyright
                        </label>
                        <p className="text-slate-600 font-medium leading-relaxed max-w-2xl italic">
                          "{data.Content || "No content defined"}"
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-12 px-8 text-center">
                    <button
                      onClick={() => navigate("/dashboard/view-footer/edit")}
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
    </DashboardLayout>
  );
}

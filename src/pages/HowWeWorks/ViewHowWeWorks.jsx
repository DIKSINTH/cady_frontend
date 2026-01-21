import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiCpu,
  FiExternalLink,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api.js";

export default function ViewHowWeWorks() {
  const [howweworks, setHowWeWorks] = useState([]);
  const navigate = useNavigate();

  const loadHowWeWorks = () => {
    fetch(`${API_BASE}/api/howweworks`)
      .then((res) => res.json())
      .then((data) => setHowWeWorks(data))
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    loadHowWeWorks();
  }, []);

  const deleteHowWeWork = async (id) => {
    if (!window.confirm("Delete this process step?")) return;
    const res = await fetch(`${API_BASE}/api/howweworks/${id}`, {
      method: "DELETE",
    });
    if (res.ok) loadHowWeWorks();
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-light text-slate-800 tracking-tight">
                Operational{" "}
                <span className="font-bold text-indigo-600">Workflow</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Define the steps of your internal process.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/view-howweworks/add")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <FiPlus size={20} /> Add Step
            </button>
          </div>

          {/* Styled Table */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Asset
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Workflow Details
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {howweworks.length > 0 ? (
                    howweworks.map((item) => (
                      <tr
                        key={item.id}
                        className="group hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="py-6 px-6">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm">
                            {item.Image ? (
                              <img
                                src={`${API_BASE}/uploads/${item.Image}`}
                                className="w-full h-full object-cover"
                                alt=""
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <FiCpu size={24} />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <h3 className="font-bold text-slate-800 text-lg mb-1">
                            {item.Name}
                          </h3>
                          <div
                            className="text-sm text-slate-500 line-clamp-1 max-w-sm"
                            dangerouslySetInnerHTML={{
                              __html: item.Description,
                            }}
                          />
                          {item.URL && (
                            <a
                              href={item.URL}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-400 mt-2 uppercase tracking-tight hover:text-indigo-600"
                            >
                              <FiExternalLink size={12} /> {item.URL}
                            </a>
                          )}
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/view-howweworks/edit/${item.id}`
                                )
                              }
                              className="p-2.5 rounded-xl bg-white border border-slate-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteHowWeWork(item.id)}
                              className="p-2.5 rounded-xl bg-white border border-slate-100 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-20 text-slate-400 font-medium"
                      >
                        No workflow items configured.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

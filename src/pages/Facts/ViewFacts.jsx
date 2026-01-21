import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiBarChart2, FiHash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api.js";

export default function ViewFacts() {
  const [facts, setFacts] = useState([]);
  const navigate = useNavigate();

  const loadFacts = () => {
    fetch(`${API_BASE}/api/facts`)
      .then((res) => res.json())
      .then((data) => setFacts(data));
  };

  useEffect(() => {
    loadFacts();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-light text-slate-800 tracking-tight">
              Statistical{" "}
              <span className="font-bold text-indigo-600">Facts</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Manage company milestones and key performance indicators.
            </p>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest w-20 text-center">
                      #
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Visual
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Fact Identity
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Metric
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {facts.map((fact, i) => (
                    <tr
                      key={fact.id}
                      className="group hover:bg-indigo-50/30 transition-colors"
                    >
                      <td className="py-6 px-6 text-center">
                        <span className="text-sm font-bold text-slate-300">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                      </td>
                      <td className="py-6 px-6">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm p-2 flex items-center justify-center">
                          <img
                            src={`${API_BASE}/uploads/${fact.Image}`}
                            className="max-h-full object-contain"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <h3 className="font-bold text-slate-800 tracking-tight">
                          {fact.Name}
                        </h3>
                        <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                          Public Metric
                        </span>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <span className="inline-block bg-indigo-50 text-indigo-600 font-black px-4 py-1.5 rounded-full text-lg">
                          {fact.Count}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/view-facts/edit/${fact.id}`)
                          }
                          className="p-3 rounded-xl bg-white border border-slate-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-90"
                        >
                          <FiEdit2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

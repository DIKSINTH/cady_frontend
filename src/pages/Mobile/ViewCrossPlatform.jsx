import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiLayers,
  FiEdit3,
  FiImage,
  FiArrowRight,
  FiInfo,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function ViewCrossPlatform() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/crossplatform`)
      .then((res) => res.json())
      .then((res) => setData(res || null))
      .catch((err) => console.log(err));
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-violet-600 text-white rounded-2xl shadow-lg shadow-violet-200">
                <FiLayers size={24} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Cross Platform
              </h1>
            </div>
            <p className="text-slate-500 text-sm font-medium">
              Manage unified application services for multiple operating
              systems.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-600"></span>
            </span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Live on Site
            </span>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Service Preview
                  </th>
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Details
                  </th>
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {data ? (
                  <tr className="group hover:bg-violet-50/30 transition-all duration-300">
                    {/* Image Column */}
                    <td className="px-8 py-10">
                      <div className="relative w-48 h-28 overflow-hidden rounded-2xl border-4 border-white shadow-md group-hover:shadow-violet-200/50 transition-all">
                        {data.Image ? (
                          <img
                            src={`${API_BASE}/uploads/${data.Image}`}
                            alt="Cross Platform Development"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                            <FiImage size={24} />
                            <span className="text-[10px] font-bold mt-1 uppercase">
                              No Asset
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title & Description Column */}
                    <td className="px-8 py-10">
                      <div className="max-w-md">
                        <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-violet-600 transition-colors mb-2 italic">
                          {data.Title}
                        </h2>
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                          {data.Description}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <span className="px-2 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 rounded-lg uppercase tracking-tight flex items-center gap-1">
                            <FiInfo size={12} /> Hybrid Development
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-8 py-10 text-right">
                      <Link
                        to="/dashboard/view-crossplatform/edit"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-violet-600 transition-all shadow-lg active:scale-95 group/btn"
                      >
                        <FiEdit3 size={16} />
                        <span>Edit Content</span>
                        <FiArrowRight
                          size={14}
                          className="opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all"
                        />
                      </Link>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="3" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-3 opacity-30">
                        <FiLayers size={48} />
                        <p className="text-lg font-bold">Waiting for Data...</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 px-6 py-4 bg-slate-900 rounded-2xl flex items-center justify-between">
          <p className="text-slate-400 text-xs font-medium">
            Last synced:{" "}
            <span className="text-violet-400">
              {new Date().toLocaleDateString()}
            </span>
          </p>
          <div className="flex gap-4">
            <div className="h-1.5 w-1.5 rounded-full bg-violet-400"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-violet-400/50"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-violet-400/20"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

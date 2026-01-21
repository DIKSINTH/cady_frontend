import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiEdit2,
  FiSettings,
  FiImage,
  FiActivity,
  FiArrowRight,
} from "react-icons/fi";
import { API_BASE } from "../../config/api";

export default function ViewWebMaintenance() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/webmaintenance`)
      .then((res) => res.json())
      .then((res) => setData(res || null))
      .catch((err) => console.log(err));
  }, []);

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl shadow-sm">
              <FiSettings size={24} className="animate-spin-slow" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Web Maintenance
            </h1>
          </div>
          <p className="text-slate-500 max-w-lg">
            Update your service levels, support descriptions, and technical
            maintenance visuals.
          </p>
        </div>

        {data && (
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
              Live Sync
            </span>
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest w-20 text-center">
                  ID
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Service Overview
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Description
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Banner Visual
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data ? (
                <tr className="group hover:bg-slate-50/50 transition-all duration-300">
                  <td className="px-6 py-10 text-sm text-slate-400 font-medium text-center">
                    01
                  </td>

                  {/* Title Cell */}
                  <td className="px-6 py-10">
                    <div className="max-w-[240px]">
                      <span className="text-base font-bold text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                        {data.Title}
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-md uppercase">
                          Service Header
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Description Cell */}
                  <td className="px-6 py-10">
                    <p className="text-sm text-slate-600 leading-relaxed max-w-sm line-clamp-3">
                      {data.Description}
                    </p>
                  </td>

                  {/* Image Cell */}
                  <td className="px-6 py-10 text-center">
                    <div className="inline-block relative">
                      {data.Image ? (
                        <div className="h-24 w-36 rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-transform duration-500 group-hover:scale-105">
                          <img
                            src={`${API_BASE}/uploads/${data.Image}`}
                            alt="Web Maintenance"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-24 w-36 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-300">
                          <FiImage size={24} />
                          <span className="text-[10px] mt-1 font-bold uppercase">
                            Missing Image
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Action Cell */}
                  <td className="px-6 py-10 text-center">
                    <Link
                      to="/dashboard/view-webmaintenance/edit"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-amber-500 transition-all shadow-lg hover:shadow-amber-200 active:scale-95 group/btn"
                    >
                      <FiEdit2 size={16} />
                      Edit Content
                    </Link>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-30">
                      <FiSettings size={48} className="text-slate-300 mb-2" />
                      <p className="text-sm font-medium text-slate-500 tracking-tight">
                        Data table is currently empty.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="mt-8 p-5 bg-amber-50 rounded-3xl border border-amber-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <FiActivity className="text-amber-500" />
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong>Maintenance Status:</strong> Service content is synced.
            Changes here update the technical support page.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
        >
          Back to Overview <FiArrowRight />
        </Link>
      </div>
    </DashboardLayout>
  );
}

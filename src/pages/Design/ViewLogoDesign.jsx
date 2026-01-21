import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiEdit2,
  FiImage,
  FiAlignLeft,
  FiEye,
  FiExternalLink,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function ViewLogoDesign() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/logodesign`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
        <div className="max-w-5xl mx-auto">
          {/* Unified Header */}
          <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-3xl font-light text-slate-800 tracking-tight">
                Logo Design{" "}
                <span className="font-bold text-indigo-600">Overview</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Manage how your Logo Design service appears to clients.
              </p>
            </div>
            <Link
              to="/dashboard/view-logodesign/edit"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-indigo-100 transition-all active:scale-95"
            >
              <FiEdit2 size={16} /> Edit Content
            </Link>
          </div>

          {data ? (
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
              <div className="flex flex-col md:flex-row">
                {/* Visual Section */}
                <div className="md:w-1/2 bg-slate-100 p-8 flex items-center justify-center min-h-[320px]">
                  <div className="relative group w-full flex justify-center">
                    {data.Image ? (
                      <div className="relative">
                        <img
                          src={`${API_BASE}/uploads/${data.Image}`}
                          className="w-full max-w-sm rounded-2xl shadow-lg border-4 border-white transform transition-transform group-hover:rotate-1 group-hover:scale-[1.02]"
                          alt="Logo Design Preview"
                        />
                        <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                      </div>
                    ) : (
                      <div className="w-64 h-40 bg-white rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                        <FiImage size={40} className="mb-2 opacity-20" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                          No Image
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 p-10 flex flex-col justify-between">
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                      <FiEye /> Active Module
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <FiImage className="text-indigo-400" /> Service Title
                      </label>
                      <h2 className="text-2xl font-bold text-slate-800 leading-tight">
                        {data.Title}
                      </h2>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <FiAlignLeft className="text-indigo-400" /> Service
                        Description
                      </label>
                      <p className="text-slate-600 text-lg leading-relaxed font-light italic">
                        "{data.Description}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 pt-6 border-t border-slate-50 flex justify-between items-center text-slate-400">
                    <span className="text-[10px] font-medium italic">
                      Last updated via Dashboard
                    </span>
                    <button className="p-3 rounded-xl border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                      <FiExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 animate-pulse">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            </div>
          )}

          <p className="text-center mt-8 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
            Live Website Status:{" "}
            <span className="text-emerald-500">Online</span>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

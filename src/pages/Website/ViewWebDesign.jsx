import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiMonitor, FiImage, FiExternalLink } from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function ViewWebDesign() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/webdesign`)
      .then((res) => res.json())
      .then((res) => setData(res || null))
      .catch((err) => console.log(err));
  }, []);

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <FiMonitor size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Web Design Services
          </h1>
        </div>
        <p className="text-slate-500">
          Manage the landing section and introductory details for the Web Design
          service page.
        </p>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">
                  #
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Preview
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data ? (
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-8 text-sm text-slate-400 font-medium">
                    01
                  </td>

                  {/* Title Cell */}
                  <td className="px-6 py-8">
                    <div className="max-w-[200px]">
                      <span className="text-sm font-bold text-slate-900 leading-tight">
                        {data.Title}
                      </span>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-blue-600 font-bold uppercase tracking-tighter">
                        <FiExternalLink /> Active Section
                      </div>
                    </div>
                  </td>

                  {/* Description Cell */}
                  <td className="px-6 py-8">
                    <p className="text-sm text-slate-600 leading-relaxed max-w-md line-clamp-3">
                      {data.Description}
                    </p>
                  </td>

                  {/* Image Cell */}
                  <td className="px-6 py-8 text-center">
                    <div className="inline-block">
                      {data.Image ? (
                        <div className="relative group cursor-zoom-in">
                          <img
                            src={`${API_BASE}/uploads/${data.Image}`}
                            alt="Web Design"
                            className="w-28 h-20 object-cover rounded-xl shadow-sm border border-slate-200 group-hover:shadow-md transition-shadow"
                          />
                        </div>
                      ) : (
                        <div className="w-28 h-20 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-300">
                          <FiImage size={20} />
                          <span className="text-[10px] mt-1 font-bold">
                            No Media
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Actions Cell */}
                  <td className="px-6 py-8 text-center">
                    <Link
                      to="/dashboard/view-webdesign/edit"
                      className="inline-flex items-center gap-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all group"
                    >
                      <FiEdit2 className="group-hover:scale-110 transition-transform" />
                      Edit
                    </Link>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-400 italic"
                  >
                    No web design content found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="mt-4 flex items-center gap-2 px-2 text-xs text-slate-400 font-medium">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        Last synced with production database
      </div>
    </DashboardLayout>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiCode, FiImage, FiCheckCircle } from "react-icons/fi";
import { API_BASE } from "../../config/api";

export default function ViewWebDevelopment() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/webdevelopment`)
      .then((res) => res.json())
      .then((res) => setData(res || null))
      .catch((err) => console.log(err));
  }, []);

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shadow-sm">
              <FiCode size={24} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              Web Development
            </h1>
          </div>
          <p className="text-slate-500">
            Preview and manage the hero content for your Web Development
            services.
          </p>
        </div>

        {data && (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-wider border border-emerald-100">
            <FiCheckCircle /> Live on Website
          </div>
        )}
      </div>

      {/* Content Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">
                  #
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Service Title
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Featured Image
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data ? (
                <tr className="hover:bg-slate-50/40 transition-colors group">
                  <td className="px-6 py-10 text-sm text-slate-400 font-medium">
                    01
                  </td>

                  {/* Title Cell */}
                  <td className="px-6 py-10">
                    <span className="text-base font-bold text-slate-900 block max-w-[200px] leading-snug">
                      {data.Title}
                    </span>
                    <span className="text-[10px] text-indigo-500 font-extrabold uppercase mt-1 block">
                      Hero Section
                    </span>
                  </td>

                  {/* Description Cell */}
                  <td className="px-6 py-10">
                    <p className="text-sm text-slate-600 leading-relaxed max-w-md line-clamp-3">
                      {data.Description}
                    </p>
                  </td>

                  {/* Image Cell */}
                  <td className="px-6 py-10 text-center">
                    <div className="inline-block relative">
                      {data.Image ? (
                        <div className="h-20 w-32 rounded-xl overflow-hidden border border-slate-200 shadow-sm transition-transform duration-300 group-hover:scale-105">
                          <img
                            src={`${API_BASE}/uploads/${data.Image}`}
                            alt="Web Development"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-20 w-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-300">
                          <FiImage size={24} />
                          <span className="text-[10px] mt-1 font-bold">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Action Cell */}
                  <td className="px-6 py-10 text-center">
                    <Link
                      to="/dashboard/view-webdevelopment/edit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-md hover:shadow-indigo-200 active:scale-95 group/btn"
                    >
                      <FiEdit2
                        size={16}
                        className="group-hover/btn:rotate-12 transition-transform"
                      />
                      Edit Content
                    </Link>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center opacity-30">
                      <FiCode size={48} className="mb-2" />
                      <p className="text-slate-500 font-medium">
                        No content available for this section.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Footer */}
      <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></div>
        <p className="text-xs text-blue-700 font-medium">
          Note: Changes made here reflect immediately on the frontend Service
          Details page.
        </p>
      </div>
    </DashboardLayout>
  );
}

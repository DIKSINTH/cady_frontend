import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiImage, FiLayers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api.js";

export default function ViewBlogContent() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/blogcontent`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  // Modern Loading State
  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-medium">Fetching blog page content...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Blog Page Header
          </h1>
          <p className="text-slate-500 mt-1">
            This content appears at the top of your main blog listing page.
          </p>
        </div>

        <div className="hidden md:block">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <FiLayers /> Live Content
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Page Heading
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Introductory Content
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Banner Image
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/30 transition-colors">
                {/* Heading */}
                <td className="px-6 py-8 align-top">
                  <span className="text-base font-bold text-slate-800 leading-tight block max-w-xs">
                    {data.Heading || "No Heading Set"}
                  </span>
                </td>

                {/* Content/Description */}
                <td className="px-6 py-8 align-top">
                  <p className="text-sm text-slate-600 leading-relaxed max-w-md italic">
                    "{data.Content || "No description provided."}"
                  </p>
                </td>

                {/* Image Preview */}
                <td className="px-6 py-8 text-center">
                  <div className="inline-block relative group">
                    {data.Image ? (
                      <div className="relative h-24 w-32 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                        <img
                          src={`${API_BASE}/uploads/${data.Image}`}
                          className="w-full h-full object-cover"
                          alt="blog banner"
                        />
                      </div>
                    ) : (
                      <div className="h-24 w-32 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300">
                        <FiImage size={24} />
                        <span className="text-[10px] mt-1 font-bold">
                          MISSING
                        </span>
                      </div>
                    )}
                  </div>
                </td>

                {/* Edit Action */}
                <td className="px-6 py-8 text-center">
                  <button
                    onClick={() => navigate("/dashboard/view-blogcontent/edit")}
                    className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all group"
                    title="Edit Blog Content"
                  >
                    <FiEdit2
                      size={20}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <p className="mt-4 text-xs text-slate-400 flex items-center gap-1 px-2">
        Note: This section affects the visual header of the `/blogs` frontend
        route.
      </p>
    </DashboardLayout>
  );
}

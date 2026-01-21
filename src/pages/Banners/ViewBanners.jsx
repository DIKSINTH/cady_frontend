import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiImage,
  FiMoreHorizontal,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api.js";

export default function ViewBanners() {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  const loadBanners = () => {
    fetch(`${API_BASE}/api/banners`)
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .catch((err) => console.error("Error loading banners:", err));
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const deleteBanner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    const res = await fetch(`${API_BASE}/api/banners/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Banner deleted successfully!");
      loadBanners();
    } else {
      alert("Failed to delete banner!");
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-light text-slate-800 tracking-tight">
                Banner{" "}
                <span className="font-bold text-indigo-600">Library</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Manage the promotional sliders and hero images for your website.
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard/view-banners/add")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <FiPlus size={20} /> Add New Banner
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      ID
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Banner Info
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Preview
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {banners.length > 0 ? (
                    banners.map((banner) => (
                      <tr
                        key={banner.id}
                        className="group hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="py-6 px-6">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold">
                            #{banner.id}
                          </span>
                        </td>

                        <td className="py-6 px-6">
                          <div className="max-w-xs">
                            <h3 className="font-bold text-slate-800 mb-1 truncate">
                              {banner.Title}
                            </h3>
                            <div
                              className="text-xs text-slate-500 line-clamp-2 leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: banner.Description,
                              }}
                            />
                          </div>
                        </td>

                        <td className="py-6 px-6">
                          {banner.Image ? (
                            <div className="relative w-24 h-14 rounded-xl overflow-hidden shadow-sm border border-white">
                              <img
                                src={`${API_BASE}/uploads/${banner.Image}`}
                                alt="Banner"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300">
                              <FiImage size={18} />
                            </div>
                          )}
                        </td>

                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/view-banners/edit/${banner.id}`
                                )
                              }
                              className="p-2.5 rounded-xl bg-white border border-slate-100 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm"
                              title="Edit Banner"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteBanner(banner.id)}
                              className="p-2.5 rounded-xl bg-white border border-slate-100 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm"
                              title="Delete Banner"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-20">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <FiImage size={48} className="mb-4 opacity-20" />
                          <p className="font-medium">
                            No banners found in your library
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination/Info */}
            <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100 flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
              <span>Total Banners: {banners.length}</span>
              <span className="flex items-center gap-1 italic">
                <FiMoreHorizontal /> Slide images should be 1920x800 for best
                quality
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

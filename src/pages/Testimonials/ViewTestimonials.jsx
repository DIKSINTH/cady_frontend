import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api";

export default function ViewTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  const loadTestimonials = () => {
    fetch(`${API_BASE}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error loading testimonials:", err));
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const deleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;
    const res = await fetch(`${API_BASE}/api/testimonials/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("Testimonial deleted successfully!");
      loadTestimonials();
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-light text-slate-800 tracking-tight">
                Client{" "}
                <span className="font-bold text-indigo-600">Testimonials</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Manage the feedback displayed in the slider section.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/view-testimonials/add")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <FiPlus size={20} /> Add Testimonial
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Client
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Review
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {testimonials.length > 0 ? (
                    testimonials.map((t) => (
                      <tr
                        key={t.id}
                        className="group hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="py-6 px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100 flex-shrink-0">
                              {t.image ? (
                                <img
                                  src={`${API_BASE}/uploads/${t.image}`}
                                  className="w-full h-full object-cover"
                                  alt={t.name}
                                />
                              ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                  <FiUser size={20} />
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-800 leading-tight">
                                {t.name}
                              </h3>
                              <p className="text-xs text-indigo-500 font-semibold">
                                {t.position}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <div className="max-w-md">
                            <div
                              className="text-sm text-slate-600 line-clamp-2 leading-relaxed italic"
                              dangerouslySetInnerHTML={{
                                __html: t.description,
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/view-testimonials/edit/${t.id}`
                                )
                              }
                              className="p-2.5 rounded-xl bg-white border border-slate-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteTestimonial(t.id)}
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
                        No testimonials found.
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

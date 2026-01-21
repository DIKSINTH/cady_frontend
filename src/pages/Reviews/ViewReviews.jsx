import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiMessageCircle,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api.js";

export default function ViewReviews() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const loadReviews = () => {
    fetch(`${API_BASE}/api/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error loading reviews:", err));
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    const res = await fetch(`${API_BASE}/api/reviews/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      loadReviews();
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
                User <span className="font-bold text-indigo-600">Reviews</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Browse and manage customer feedback.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/view-reviews/add")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <FiPlus size={20} /> Add Review
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      ID
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Reviewer
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Feedback
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <tr
                        key={review.id}
                        className="group hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="py-6 px-6 text-sm font-bold text-slate-400">
                          # {review.id}
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                              <FiUser size={14} />
                            </div>
                            <span className="font-bold text-slate-700">
                              {review.Name}
                            </span>
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <p className="text-sm text-slate-600 line-clamp-2 max-w-md italic leading-relaxed">
                            "{review.Review}"
                          </p>
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/view-reviews/edit/${review.id}`
                                )
                              }
                              className="p-2.5 rounded-xl bg-white border border-slate-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteReview(review.id)}
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
                        colSpan="4"
                        className="text-center py-20 text-slate-400 font-medium italic"
                      >
                        No reviews found.
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

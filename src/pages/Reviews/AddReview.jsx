import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiPlus, FiUser, FiMessageCircle } from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function AddReview() {
  const [Name, setName] = useState("");
  const [Review, setReview] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Name, Review }),
    });
    if (res.ok) navigate("/dashboard/view-reviews");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <Link
                to="/dashboard/view-reviews"
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-semibold mb-2 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
                Back to Reviews
              </Link>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Add New <span className="text-indigo-600">Review</span>
              </h1>
            </div>
            <button
              form="review-form"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              <FiPlus size={20} /> Publish Review
            </button>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100">
            <form
              id="review-form"
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="group">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-3 ml-1">
                  Reviewer Name
                </label>
                <div className="relative">
                  <FiUser className="absolute top-4 left-4 text-slate-300" />
                  <input
                    type="text"
                    placeholder="Enter customer name..."
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 pl-12 rounded-xl outline-none transition-all font-semibold text-slate-700 shadow-inner"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-3 ml-1">
                  The Feedback
                </label>
                <div className="relative">
                  <FiMessageCircle className="absolute top-4 left-4 text-slate-300" />
                  <textarea
                    placeholder="What did the customer say?..."
                    value={Review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 pl-12 rounded-xl outline-none transition-all h-40 leading-relaxed text-slate-600 shadow-inner"
                    required
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

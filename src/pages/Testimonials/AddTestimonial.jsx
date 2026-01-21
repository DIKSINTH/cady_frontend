import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiPlus,
  FiUploadCloud,
  FiUser,
  FiBriefcase,
  FiMessageSquare,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function AddTestimonial() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("description", description);
    if (image) formData.append("image", image);

    const res = await fetch(`${API_BASE}/api/testimonials`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) navigate("/dashboard/view-testimonials");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <Link
                to="/dashboard/view-testimonials"
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-semibold mb-2 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
                Back
              </Link>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Add New <span className="text-indigo-600">Review</span>
              </h1>
            </div>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              <FiPlus size={20} /> Publish Testimonial
            </button>
          </div>

          <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                    Client Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute top-4 left-4 text-slate-300" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 pl-12 rounded-xl outline-none transition-all font-semibold"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                    Position/Role
                  </label>
                  <div className="relative">
                    <FiBriefcase className="absolute top-4 left-4 text-slate-300" />
                    <input
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 pl-12 rounded-xl outline-none transition-all font-semibold"
                      placeholder="e.g. CEO, Tech Corp"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="group">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                  The Review
                </label>
                <textarea
                  rows="6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 rounded-xl outline-none transition-all h-48"
                  placeholder="Enter the client's feedback here..."
                  required
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Avatar Image
              </label>
              <div className="relative rounded-full w-40 h-40 mx-auto overflow-hidden bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <FiUser size={60} className="text-slate-200" />
                )}
              </div>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-indigo-50 transition-all">
                <FiUploadCloud size={30} className="text-slate-300 mb-2" />
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  Select Profile Photo
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                  required
                />
              </label>
              <p className="text-[10px] text-slate-400 text-center italic font-medium">
                Use a square 1:1 image for best results.
              </p>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

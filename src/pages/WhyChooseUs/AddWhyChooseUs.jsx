import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiPlus,
  FiType,
  FiFileText,
  FiUploadCloud,
  FiImage,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function AddWhyChooseUs() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Description", Description);
    formData.append("Image", Image);

    const res = await fetch(`${API_BASE}/api/whychooseus`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) navigate("/dashboard/view-whychooseus");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <Link
                to="/dashboard/view-whychooseus"
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-semibold mb-2 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
                Back to List
              </Link>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Add Value <span className="text-indigo-600">Point</span>
              </h1>
            </div>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              <FiPlus size={20} /> Publish Point
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                  Point Title
                </label>
                <div className="relative">
                  <FiType className="absolute top-4 left-4 text-slate-300" />
                  <input
                    type="text"
                    placeholder="e.g., 24/7 Premium Support"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 pl-12 rounded-xl outline-none transition-all font-semibold text-slate-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                  Description
                </label>
                <div className="relative">
                  <FiFileText className="absolute top-4 left-4 text-slate-300" />
                  <textarea
                    placeholder="Explain why this benefit matters..."
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 pl-12 rounded-xl outline-none transition-all h-48 leading-relaxed text-slate-600"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6 flex flex-col items-center">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 self-start">
                Visual Asset
              </label>
              <div className="w-full aspect-square bg-slate-100 rounded-3xl border-4 border-white shadow-xl overflow-hidden flex items-center justify-center relative group">
                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                ) : (
                  <FiImage size={48} className="text-slate-200" />
                )}
              </div>
              <label className="w-full flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-all group">
                <FiUploadCloud
                  size={24}
                  className="text-slate-300 group-hover:text-indigo-400 mb-2"
                />
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Select Image
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                  required
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiPlus,
  FiUploadCloud,
  FiType,
  FiAlignLeft,
  FiImage,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function AddBanner() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Title", Title);
    formData.append("Description", Description);
    formData.append("Image", Image);

    const res = await fetch(`${API_BASE}/api/banners`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      navigate("/dashboard/view-banners");
    } else {
      alert("Failed to add banner");
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
        <div className="max-w-5xl mx-auto">
          {/* Action Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <Link
                to="/dashboard/view-banners"
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-semibold mb-2 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
                Back to Library
              </Link>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Create New <span className="text-indigo-600">Banner</span>
              </h1>
            </div>

            <button
              form="add-banner-form"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              <FiPlus size={20} /> Publish Banner
            </button>
          </div>

          <form
            id="add-banner-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Side: Text Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-8 text-slate-800 border-b border-slate-50 pb-4">
                  <FiType className="text-indigo-500" />
                  <h2 className="font-bold uppercase text-xs tracking-widest text-slate-400">
                    Banner Content
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1 transition-colors group-focus-within:text-indigo-500">
                      Headline Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Summer Collection 2024"
                      value={Title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 rounded-xl outline-none transition-all font-semibold text-slate-700 shadow-inner"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1 transition-colors group-focus-within:text-indigo-500">
                      Sub-text Description
                    </label>
                    <div className="relative">
                      <FiAlignLeft className="absolute top-4 left-4 text-slate-300" />
                      <textarea
                        placeholder="Describe the promotion or message for this banner..."
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 pl-12 rounded-xl outline-none transition-all h-48 leading-relaxed text-slate-600 shadow-inner"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Media Upload */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 h-full">
                <div className="flex items-center gap-2 mb-8 text-slate-800 border-b border-slate-50 pb-4">
                  <FiImage className="text-indigo-500" />
                  <h2 className="font-bold uppercase text-xs tracking-widest text-slate-400">
                    Media Preview
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Image Preview Window */}
                  <div className="relative group rounded-3xl overflow-hidden bg-slate-100 border-4 border-white shadow-lg aspect-[4/3] lg:aspect-auto lg:h-64 flex items-center justify-center">
                    {preview ? (
                      <img
                        src={preview}
                        className="w-full h-full object-cover"
                        alt="New Banner Preview"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-300 text-center p-6">
                        <FiImage size={48} className="mb-3 opacity-20" />
                        <p className="text-xs font-bold uppercase tracking-wider opacity-40">
                          No Image Selected
                        </p>
                      </div>
                    )}
                    {preview && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    )}
                  </div>

                  {/* Upload Area */}
                  <div className="relative">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-3 ml-1">
                      Upload Banner Image
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUploadCloud className="w-8 h-8 mb-3 text-slate-300 group-hover:text-indigo-400" />
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">
                          Select File
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImage(file);
                            setPreview(URL.createObjectURL(file));
                          }
                        }}
                        required
                      />
                    </label>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                    <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                      <strong>Note:</strong> For best results on widescreen
                      monitors, please use an image with a 1920x800 resolution
                      or similar aspect ratio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

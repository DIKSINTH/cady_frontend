import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiTablet,
  FiArrowLeft,
  FiSave,
  FiUploadCloud,
  FiBookOpen,
  FiCheckCircle,
  FiGrid,
  FiType,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditIosDevelopment() {
  const [form, setForm] = useState({
    Title: "",
    Description: "",
    Term1: "",
    Term2: "",
    Term3: "",
    Term4: "",
    Term5: "",
    Term6: "",
    Description1: "",
    Description2: "",
    Description3: "",
    Description4: "",
    Description5: "",
    Description6: "",
    Why_Ios1: "",
    Why_Ios2: "",
    Why_Ios3: "",
    Why_Ios4: "",
    Service1: "",
    Service2: "",
    Service3: "",
    Service4: "",
  });

  const [oldImage, setOldImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const imageRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/iosdevelopment/edit`)
      .then((res) => res.json())
      .then((res) => {
        setForm(res);
        setOldImage(res.Image);
        setPreviewImage(`${API_BASE}/uploads/${res.Image}`);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    fd.append("oldImage", oldImage);
    if (imageRef.current.files[0])
      fd.append("Image", imageRef.current.files[0]);

    const response = await fetch(`${API_BASE}/api/iosdevelopment/update`, {
      method: "POST",
      body: fd,
    });
    await response.json();
    navigate("/dashboard/view-iosdevelopment");
  };

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-3 mb-6 pt-4 border-t border-slate-100 first:border-t-0 first:pt-0">
      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-bold text-slate-800 tracking-tight">
        {title}
      </h3>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 pb-20">
        {/* Header Navigation */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard/view-iosdevelopment")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-blue-600 transition-colors mb-2"
          >
            <FiArrowLeft /> Back to View iOS
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Edit iOS Service
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Update Swift technicalities, Apple ecosystem visuals, and core
            service features.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Hero Card */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <SectionHeader icon={FiType} title="Primary Branding" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Display Title
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={form.Title}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Service Overview
                  </label>
                  <textarea
                    name="Description"
                    value={form.Description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50 leading-relaxed"
                  />
                </div>
              </div>

              <div className="space-y-4 text-center">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  App Preview Asset
                </label>
                <div className="relative h-64 lg:h-full min-h-[220px] group border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 overflow-hidden flex flex-col items-center justify-center hover:border-blue-400 transition-all shadow-inner">
                  {previewImage && (
                    <img
                      src={previewImage}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                      alt="Preview"
                    />
                  )}
                  <input
                    type="file"
                    ref={imageRef}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="relative z-0 bg-white/90 backdrop-blur-md shadow-lg p-4 rounded-2xl flex flex-col items-center pointer-events-none border border-white">
                    <FiUploadCloud size={24} className="text-blue-600 mb-1" />
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">
                      Update Image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Glossary Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <SectionHeader icon={FiBookOpen} title="iOS Tech Stacks (Terms)" />
            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 group"
                >
                  <div className="md:col-span-1">
                    <label className="block text-[9px] font-black text-slate-300 uppercase mb-1">
                      Term {num}
                    </label>
                    <input
                      type="text"
                      name={`Term${num}`}
                      value={form[`Term${num}`] || ""}
                      onChange={handleChange}
                      placeholder="e.g., SwiftUI Design"
                      className="w-full border-b-2 border-slate-100 py-3 focus:border-blue-500 outline-none transition-all text-sm font-bold bg-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[9px] font-black text-slate-300 uppercase mb-1">
                      Description {num}
                    </label>
                    <input
                      type="text"
                      name={`Description${num}`}
                      value={form[`Description${num}`] || ""}
                      onChange={handleChange}
                      placeholder="Explain the iOS concept..."
                      className="w-full border-b-2 border-slate-100 py-3 focus:border-blue-500 outline-none transition-all text-sm bg-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why iOS & Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Why iOS */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <SectionHeader icon={FiCheckCircle} title="The iOS Advantage" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center gap-4 group">
                    <span className="text-[10px] font-black text-blue-200">
                      {num}
                    </span>
                    <input
                      type="text"
                      name={`Why_Ios${num}`}
                      value={form[`Why_Ios${num}`] || ""}
                      onChange={handleChange}
                      placeholder="iOS value proposition..."
                      className="flex-1 border-b border-slate-100 py-2 focus:border-blue-500 outline-none transition-all text-sm hover:bg-slate-50 px-2 rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Services List */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <SectionHeader icon={FiGrid} title="Key iOS Services" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center gap-4 group">
                    <span className="text-[10px] font-black text-blue-200">
                      {num}
                    </span>
                    <input
                      type="text"
                      name={`Service${num}`}
                      value={form[`Service${num}`] || ""}
                      onChange={handleChange}
                      placeholder="Service offering..."
                      className="flex-1 border-b border-slate-100 py-2 focus:border-blue-500 outline-none transition-all text-sm hover:bg-slate-50 px-2 rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-6 pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/view-iosdevelopment")}
              className="text-sm font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
            >
              Cancel Changes
            </button>
            <button
              type="submit"
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all active:scale-95 group"
            >
              <FiSave className="group-hover:scale-110 transition-transform" />
              Save iOS Module
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

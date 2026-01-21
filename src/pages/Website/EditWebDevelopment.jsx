import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiArrowLeft,
  FiSave,
  FiUploadCloud,
  FiImage,
  FiCode,
  FiCpu,
  FiGitPullRequest,
  FiAlignLeft,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditWebDevelopment() {
  const [form, setForm] = useState({
    Title: "",
    Description: "",
    Design1: "",
    Design2: "",
    Design3: "",
    Design4: "",
    Design5: "",
    Process1: "",
    Process2: "",
    Process3: "",
    Process4: "",
    Process5: "",
    Process6: "",
    Content1: "",
    Content2: "",
  });

  const [oldImage, setOldImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const imageRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/webdevelopment/edit`)
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
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    fd.append("oldImage", oldImage);
    if (imageRef.current.files[0]) {
      fd.append("Image", imageRef.current.files[0]);
    }

    const response = await fetch(`${API_BASE}/api/webdevelopment/update`, {
      method: "POST",
      body: fd,
    });

    await response.json();
    navigate("/dashboard/view-webdevelopment");
  };

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-3 mb-6 pt-4 border-t border-slate-100 first:border-t-0 first:pt-0">
      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
    </div>
  );

  return (
    <DashboardLayout>
      {/* Header Navigation */}
      <div className="mb-8 max-w-5xl mx-auto px-4">
        <button
          onClick={() => navigate("/dashboard/view-webdevelopment")}
          className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-indigo-600 transition-colors mb-2"
        >
          <FiArrowLeft /> Back to Web Development View
        </button>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Edit Service Content
        </h1>
        <p className="text-slate-500 text-sm">
          Update the technical specifications, development lifecycle, and hero
          visuals.
        </p>
      </div>

      <div className="flex justify-center pb-20 px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-8">
          {/* Main Content & Banner Card */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <SectionHeader icon={FiCode} title="Hero Information" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Service Title
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={form.Title}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Main Description
                  </label>
                  <textarea
                    name="Description"
                    value={form.Description}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all min-h-[120px] bg-slate-50/50 leading-relaxed"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">
                  Banner Visual
                </label>
                <div className="relative h-full min-h-[220px] group border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 overflow-hidden flex flex-col items-center justify-center hover:border-indigo-400 transition-all shadow-inner">
                  {previewImage && (
                    <img
                      src={previewImage}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                      alt="Preview"
                    />
                  )}
                  <input
                    type="file"
                    ref={imageRef}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="relative z-0 bg-white/90 backdrop-blur-md shadow-lg p-4 rounded-2xl flex flex-col items-center pointer-events-none">
                    <FiUploadCloud size={24} className="text-indigo-600 mb-1" />
                    <span className="text-[10px] font-bold text-slate-700 uppercase">
                      Replace Image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs & Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tech Stack List */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <SectionHeader icon={FiCpu} title="Core Tech Stack" />
              <div className="space-y-3">
                {["Design1", "Design2", "Design3", "Design4", "Design5"].map(
                  (item, idx) => (
                    <div key={item} className="flex items-center gap-4 group">
                      <span className="text-[10px] font-black text-indigo-200">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        name={item}
                        value={form[item] || ""}
                        onChange={handleChange}
                        placeholder="e.g., React.js / Node.js"
                        className="flex-1 border-b border-slate-100 py-2 focus:border-indigo-500 outline-none transition-all text-sm group-hover:bg-slate-50 px-2 rounded-md"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Development Process List */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <SectionHeader
                icon={FiGitPullRequest}
                title="Dev Roadmap Steps"
              />
              <div className="space-y-3">
                {[
                  "Process1",
                  "Process2",
                  "Process3",
                  "Process4",
                  "Process5",
                  "Process6",
                ].map((item, idx) => (
                  <div key={item} className="flex items-center gap-4 group">
                    <span className="text-[10px] font-black text-indigo-200">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      name={item}
                      value={form[item] || ""}
                      onChange={handleChange}
                      placeholder="Step description..."
                      className="flex-1 border-b border-slate-100 py-2 focus:border-indigo-500 outline-none transition-all text-sm group-hover:bg-slate-50 px-2 rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Narrative Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <SectionHeader
              icon={FiAlignLeft}
              title="Detailed Service Narrative"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {["Content1", "Content2"].map((item, idx) => (
                <div key={item}>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Narrative Block {idx + 1}
                  </label>
                  <textarea
                    name={item}
                    value={form[item] || ""}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all min-h-[150px] text-sm leading-relaxed bg-slate-50/30"
                    placeholder="Enter deep-dive service information here..."
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sticky-style Form Actions */}
          <div className="flex items-center justify-end gap-6 pt-6 pb-10">
            <button
              type="button"
              onClick={() => navigate("/dashboard/view-webdevelopment")}
              className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-indigo-600 shadow-xl shadow-slate-200 hover:shadow-indigo-200 transition-all active:scale-95 group"
            >
              <FiSave className="group-hover:rotate-12 transition-transform" />
              Save Development Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

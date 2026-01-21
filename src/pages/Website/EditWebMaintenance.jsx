import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiArrowLeft,
  FiSave,
  FiUploadCloud,
  FiImage,
  FiSettings,
  FiShield,
  FiRepeat,
  FiFileText,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditWebMaintenance() {
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
    fetch(`${API_BASE}/api/webmaintenance/edit`)
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

    const response = await fetch(`${API_BASE}/api/webmaintenance/update`, {
      method: "POST",
      body: fd,
    });

    await response.json();
    navigate("/dashboard/view-webmaintenance");
  };

  const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-6 pt-2">
      <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-bold text-slate-800 tracking-tight">
        {title}
      </h3>
    </div>
  );

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8 max-w-5xl mx-auto px-4">
        <button
          onClick={() => navigate("/dashboard/view-webmaintenance")}
          className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-amber-600 transition-colors mb-2"
        >
          <FiArrowLeft /> Return to Maintenance View
        </button>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Edit Maintenance Plans
        </h1>
        <p className="text-slate-500 text-sm">
          Update service level agreements, maintenance tasks, and support
          visuals.
        </p>
      </div>

      <div className="flex justify-center pb-20 px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-8">
          {/* Top Card: Hero Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <SectionTitle icon={FiSettings} title="Hero Section & Media" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                    Primary Heading
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={form.Title}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-bold text-slate-800 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                    Service Description
                  </label>
                  <textarea
                    name="Description"
                    value={form.Description}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none transition-all min-h-[120px] bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Image Upload Area */}
              <div className="flex flex-col">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 text-center">
                  Plan Visual
                </label>
                <div className="relative group flex-1 min-h-[200px] border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 overflow-hidden flex flex-col items-center justify-center hover:border-amber-400 transition-all">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                      alt="Preview"
                    />
                  ) : null}
                  <input
                    type="file"
                    ref={imageRef}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="relative z-0 bg-white/90 backdrop-blur shadow-sm p-4 rounded-2xl flex flex-col items-center pointer-events-none">
                    <FiUploadCloud size={24} className="text-amber-500 mb-1" />
                    <span className="text-[10px] font-bold text-slate-700">
                      Update Photo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Cards: Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Design/Support Features */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <SectionTitle icon={FiShield} title="Maintenance Features" />
              <div className="space-y-4">
                {["Design1", "Design2", "Design3", "Design4", "Design5"].map(
                  (item, idx) => (
                    <div key={item} className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-black text-amber-200">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        name={item}
                        value={form[item] || ""}
                        onChange={handleChange}
                        placeholder="Feature title..."
                        className="w-full pl-6 pr-4 py-2 border-b border-slate-100 focus:border-amber-500 outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Maintenance Workflow */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <SectionTitle icon={FiRepeat} title="Service Workflow" />
              <div className="space-y-4">
                {[
                  "Process1",
                  "Process2",
                  "Process3",
                  "Process4",
                  "Process5",
                  "Process6",
                ].map((item, idx) => (
                  <div key={item} className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-black text-amber-200">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      name={item}
                      value={form[item] || ""}
                      onChange={handleChange}
                      placeholder="Process step..."
                      className="w-full pl-6 pr-4 py-2 border-b border-slate-100 focus:border-amber-500 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Card: Content Blocks */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <SectionTitle icon={FiFileText} title="Plan Details & Copy" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {["Content1", "Content2"].map((item, idx) => (
                <div key={item}>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                    Block {idx + 1}
                  </label>
                  <textarea
                    name={item}
                    value={form[item] || ""}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none transition-all min-h-[140px] text-sm leading-relaxed"
                    placeholder="Enter detailed maintenance copy..."
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Floating-style Footer Actions */}
          <div className="flex items-center justify-end gap-4 p-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/view-webmaintenance")}
              className="px-8 py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancel changes
            </button>
            <button
              type="submit"
              className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-amber-500 shadow-xl shadow-slate-200 hover:shadow-amber-200 transition-all active:scale-95"
            >
              <FiSave size={18} /> Update Plan Data
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

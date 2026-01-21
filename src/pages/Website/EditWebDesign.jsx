import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiArrowLeft,
  FiSave,
  FiUploadCloud,
  FiImage,
  FiPenTool,
  FiLayers,
  FiActivity,
  FiAlignLeft,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditWebDesign() {
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
    Content1: "",
    Content2: "",
  });

  const [oldImage, setOldImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const imageRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/webdesign/edit`)
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

    const response = await fetch(`${API_BASE}/api/webdesign/update`, {
      method: "POST",
      body: fd,
    });

    await response.json();
    navigate("/dashboard/view-webdesign");
  };

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-4 pt-4 border-t border-slate-100 first:border-t-0 first:pt-0">
      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
        <Icon size={18} />
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
    </div>
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/dashboard/view-webdesign")}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-2"
        >
          <FiArrowLeft /> Back to View
        </button>
        <h1 className="text-3xl font-bold text-slate-900">
          Edit Web Design Content
        </h1>
        <p className="text-slate-500">
          Manage hero sections, design features, and work processes.
        </p>
      </div>

      <div className="flex justify-center pb-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-5xl bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-10"
        >
          {/* Main Hero Section */}
          <section>
            <SectionHeader icon={FiPenTool} title="Main Hero Content" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Service Title
                </label>
                <input
                  type="text"
                  name="Title"
                  value={form.Title}
                  onChange={handleChange}
                  className="w-full border border-slate-200 p-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  name="Description"
                  value={form.Description}
                  onChange={handleChange}
                  className="w-full border border-slate-200 p-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  rows={3}
                />
              </div>

              {/* Image Group */}
              <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Banner Image
                  </label>
                  <div className="relative border-2 border-dashed border-slate-200 rounded-2xl h-40 flex flex-col items-center justify-center bg-white hover:border-blue-400 transition-all group">
                    <input
                      type="file"
                      ref={imageRef}
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <FiUploadCloud
                      size={24}
                      className="text-slate-300 group-hover:text-blue-500 mb-2"
                    />
                    <span className="text-xs font-semibold text-slate-500">
                      Click to replace
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Live Preview
                  </span>
                  <div className="h-40 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-white">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-300">
                        <FiImage size={32} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features and Process */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Design Features Column */}
            <section className="space-y-4">
              <SectionHeader icon={FiLayers} title="Design Features" />
              {["Design1", "Design2", "Design3", "Design4", "Design5"].map(
                (item, idx) => (
                  <div key={item}>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                      Feature {idx + 1}
                    </label>
                    <input
                      type="text"
                      name={item}
                      value={form[item] || ""}
                      onChange={handleChange}
                      placeholder={`Feature detail...`}
                      className="w-full border border-slate-100 p-2.5 rounded-lg bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-sm"
                    />
                  </div>
                )
              )}
            </section>

            {/* Work Process Column */}
            <section className="space-y-4">
              <SectionHeader icon={FiActivity} title="Work Process" />
              {["Process1", "Process2", "Process3", "Process4", "Process5"].map(
                (item, idx) => (
                  <div key={item}>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                      Step {idx + 1}
                    </label>
                    <input
                      type="text"
                      name={item}
                      value={form[item] || ""}
                      onChange={handleChange}
                      placeholder={`Process step...`}
                      className="w-full border border-slate-100 p-2.5 rounded-lg bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-sm"
                    />
                  </div>
                )
              )}
            </section>
          </div>

          {/* Sub Content */}
          <section className="space-y-4">
            <SectionHeader
              icon={FiAlignLeft}
              title="Additional Content Blocks"
            />
            <div className="grid grid-cols-1 gap-6">
              {["Content1", "Content2"].map((item) => (
                <div key={item}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {item === "Content1"
                      ? "First Section Body"
                      : "Second Section Body"}
                  </label>
                  <textarea
                    name={item}
                    value={form[item] || ""}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all min-h-[100px]"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/dashboard/view-webdesign")}
              className="text-slate-400 hover:text-slate-600 font-medium transition-colors"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-10 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-95"
            >
              <FiSave /> Update Web Design
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

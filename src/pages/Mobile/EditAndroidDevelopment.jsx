import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiSmartphone,
  FiArrowLeft,
  FiSave,
  FiUploadCloud,
  FiBookOpen,
  FiCheckCircle,
  FiGrid,
  FiType,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditAndroidDevelopment() {
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
    Why_Android1: "",
    Why_Android2: "",
    Why_Android3: "",
    Why_Android4: "",
    Why_Android5: "",
    Why_Android6: "",
    Service1: "",
    Service2: "",
    Service3: "",
    Service4: "",
    Service5: "",
    Service6: "",
  });

  const [oldImage, setOldImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const imageRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/androiddevelopment/edit`)
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

    const response = await fetch(`${API_BASE}/api/androiddevelopment/update`, {
      method: "POST",
      body: fd,
    });
    await response.json();
    navigate("/dashboard/view-androiddevelopment");
  };

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-3 mb-6 pt-4 border-t border-slate-100 first:border-t-0 first:pt-0">
      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
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
            onClick={() => navigate("/dashboard/view-androiddevelopment")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-emerald-600 transition-colors mb-2"
          >
            <FiArrowLeft /> Back to View Android
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Edit Android Service
          </h1>
          <p className="text-slate-500 text-sm">
            Update technical terms, core services, and mobile-specific visual
            assets.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Hero Card */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <SectionHeader icon={FiType} title="Main Identity" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Primary Title
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={form.Title}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Core Description
                  </label>
                  <textarea
                    name="Description"
                    value={form.Description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-slate-50/50 leading-relaxed"
                  />
                </div>
              </div>

              <div className="space-y-4 text-center">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Banner Asset
                </label>
                <div className="relative h-64 lg:h-full min-h-[220px] group border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 overflow-hidden flex flex-col items-center justify-center hover:border-emerald-400 transition-all shadow-inner">
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
                    <FiUploadCloud
                      size={24}
                      className="text-emerald-600 mb-1"
                    />
                    <span className="text-[10px] font-black text-slate-700 uppercase">
                      Change Image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Paired Terms & Descriptions Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <SectionHeader
              icon={FiBookOpen}
              title="Technical Glossary (Terms)"
            />
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
                      placeholder={`e.g., Kotlin Coroutines`}
                      className="w-full border-b-2 border-slate-100 py-3 focus:border-emerald-500 outline-none transition-all text-sm font-bold bg-transparent"
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
                      placeholder="Explain the technical concept..."
                      className="w-full border-b-2 border-slate-100 py-3 focus:border-emerald-500 outline-none transition-all text-sm bg-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Android & Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Why Android */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <SectionHeader icon={FiCheckCircle} title="Why Choose Android" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="flex items-center gap-4 group">
                    <span className="text-[10px] font-black text-emerald-200">
                      {num}
                    </span>
                    <input
                      type="text"
                      name={`Why_Android${num}`}
                      value={form[`Why_Android${num}`] || ""}
                      onChange={handleChange}
                      placeholder="Benefit/Value Point"
                      className="flex-1 border-b border-slate-100 py-2 focus:border-emerald-500 outline-none transition-all text-sm hover:bg-slate-50 px-2 rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Services List */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <SectionHeader icon={FiGrid} title="App Services Offered" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="flex items-center gap-4 group">
                    <span className="text-[10px] font-black text-emerald-200">
                      {num}
                    </span>
                    <input
                      type="text"
                      name={`Service${num}`}
                      value={form[`Service${num}`] || ""}
                      onChange={handleChange}
                      placeholder="Service detail..."
                      className="flex-1 border-b border-slate-100 py-2 focus:border-emerald-500 outline-none transition-all text-sm hover:bg-slate-50 px-2 rounded-md"
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
              onClick={() => navigate("/dashboard/view-androiddevelopment")}
              className="text-sm font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-emerald-600 shadow-xl shadow-slate-200 transition-all active:scale-95 group"
            >
              <FiSave className="group-hover:scale-110 transition-transform" />
              Save Android Content
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

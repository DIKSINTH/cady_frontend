import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiArrowLeft,
  FiSave,
  FiLayers,
  FiInfo,
  FiList,
  FiPlus,
  FiCheckCircle,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditCrossPlatform() {
  const [form, setForm] = useState({
    Title: "",
    Description: "",
    Term1: "",
    Term2: "",
    Term3: "",
    Term4: "",
    Description1: "",
    Description2: "",
    Description3: "",
    Description4: "",
    Why_Crossplatform1: "",
    Why_Crossplatform2: "",
    Why_Crossplatform3: "",
    Why_Crossplatform4: "",
    Why_Crossplatform5: "",
    Why_Crossplatform6: "",
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
    fetch(`${API_BASE}/api/crossplatform/edit`)
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

    const response = await fetch(`${API_BASE}/api/crossplatform/update`, {
      method: "POST",
      body: fd,
    });
    await response.json();
    alert("Updated Successfully!");
    navigate("/dashboard/view-crossplatform");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10 font-sans">
        <div className="max-w-5xl mx-auto">
          {/* Header Area */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <button
                onClick={() => navigate("/dashboard/view-crossplatform")}
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-semibold mb-3 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
              </button>
              <h2 className="text-4xl font-light text-slate-800">
                Edit{" "}
                <span className="font-semibold text-indigo-600">
                  Cross-Platform
                </span>
              </h2>
            </div>

            <button
              form="main-form"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-semibold shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              <FiSave size={18} />
              Publish Changes
            </button>
          </header>

          <form id="main-form" onSubmit={handleSubmit} className="space-y-8">
            {/* 1. HERO SECTION */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FiInfo size={120} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Main Title
                    </label>
                    <input
                      type="text"
                      name="Title"
                      value={form.Title}
                      onChange={handleChange}
                      className="w-full text-2xl font-medium bg-transparent border-b-2 border-slate-100 focus:border-indigo-500 outline-none pb-2 transition-colors"
                      placeholder="Enter headline..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Description
                    </label>
                    <textarea
                      name="Description"
                      rows={4}
                      value={form.Description}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-slate-200 p-4 rounded-2xl outline-none transition-all leading-relaxed text-slate-600"
                      placeholder="Write service details..."
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-full aspect-square max-w-[200px] group cursor-pointer">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-[2.5rem] shadow-lg group-hover:opacity-75 transition-all"
                    />
                    <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <div className="bg-white/90 backdrop-blur p-3 rounded-full shadow-xl">
                        <FiPlus className="text-indigo-600" size={24} />
                      </div>
                      <input
                        type="file"
                        ref={imageRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Click image to replace
                  </span>
                </div>
              </div>
            </div>

            {/* 2. TECHNICAL TERMS SECTION */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <FiLayers size={20} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Framework Specifics
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className="group grid grid-cols-1 md:grid-cols-4 gap-6 items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                  >
                    <div className="md:col-span-1">
                      <input
                        type="text"
                        name={`Term${num}`}
                        value={form[`Term${num}`] || ""}
                        onChange={handleChange}
                        placeholder={`Tech Term ${num}`}
                        className="w-full bg-transparent font-bold text-indigo-600 placeholder:text-slate-300 outline-none"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <input
                        type="text"
                        name={`Description${num}`}
                        value={form[`Description${num}`] || ""}
                        onChange={handleChange}
                        placeholder="Explain this technical advantage..."
                        className="w-full bg-transparent text-slate-500 placeholder:text-slate-300 outline-none border-l-0 md:border-l md:pl-6 border-slate-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 3. ADVANTAGES */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FiCheckCircle className="text-emerald-500" size={20} />
                  <h3 className="font-semibold text-slate-800">
                    Key Advantages
                  </h3>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <input
                      key={num}
                      type="text"
                      name={`Why_Crossplatform${num}`}
                      value={form[`Why_Crossplatform${num}`] || ""}
                      onChange={handleChange}
                      placeholder={`Point ${num}...`}
                      className="w-full bg-slate-50 p-3 px-5 rounded-xl text-sm border border-transparent focus:border-emerald-200 focus:bg-white outline-none transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* 4. OFFERINGS */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FiList className="text-indigo-500" size={20} />
                  <h3 className="font-semibold text-slate-800">
                    Core Offerings
                  </h3>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((num) => (
                    <input
                      key={num}
                      type="text"
                      name={`Service${num}`}
                      value={form[`Service${num}`] || ""}
                      onChange={handleChange}
                      placeholder={`Service ${num}...`}
                      className="w-full bg-slate-50 p-3 px-5 rounded-xl text-sm border border-transparent focus:border-indigo-200 focus:bg-white outline-none transition-all font-medium"
                    />
                  ))}
                </div>
              </div>
            </div>
          </form>

          {/* Spacer for bottom button */}
          <div className="h-20" />
        </div>
      </div>
    </DashboardLayout>
  );
}

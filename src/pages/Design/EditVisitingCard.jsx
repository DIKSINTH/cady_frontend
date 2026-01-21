import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSave,
  FiUploadCloud,
  FiEdit3,
  FiLayers,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditVisitingCard() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [Image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/visitingcard`)
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        if (data.Image) setPreview(`${API_BASE}/uploads/${data.Image}`);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value ?? "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "id" && key !== "Image") fd.append(key, value);
    });
    if (Image) fd.append("Image", Image);

    await fetch(`${API_BASE}/api/visitingcard/update/${form.id}`, {
      method: "PUT",
      body: fd,
    });
    navigate("/dashboard/view-visitingcard");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Action Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <button
                onClick={() => navigate("/dashboard/view-visitingcard")}
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-semibold mb-2 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
                Back to Preview
              </button>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Edit Service:{" "}
                <span className="text-indigo-600">Visiting Card</span>
              </h1>
            </div>
            <button
              form="main-form"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
            >
              <FiSave size={20} /> Save Changes
            </button>
          </div>

          {Object.keys(form).length > 0 && (
            <form
              id="main-form"
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Column: Primary Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-6 text-slate-800">
                    <FiEdit3 className="text-indigo-500" />{" "}
                    <h2 className="font-bold">Main Content</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                        Service Title
                      </label>
                      <input
                        type="text"
                        name="Title"
                        value={form.Title}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 p-4 rounded-xl outline-none transition-all font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                        Description
                      </label>
                      <textarea
                        name="Description"
                        rows={4}
                        value={form.Description}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 p-4 rounded-xl outline-none transition-all leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary Fields Grid */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-6 text-slate-800">
                    <FiLayers className="text-indigo-500" />{" "}
                    <h2 className="font-bold">Feature & Step Details</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.keys(form)
                      .filter(
                        (key) =>
                          ![
                            "id",
                            "Title",
                            "Description",
                            "Bottom_Description",
                            "Image",
                          ].includes(key)
                      )
                      .map((key) => (
                        <div key={key}>
                          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                            {key.replace(/_/g, " ")}
                          </label>
                          <input
                            type="text"
                            name={key}
                            value={form[key] || ""}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-100 p-3 rounded-lg text-sm focus:border-indigo-400 outline-none"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Image & Final Details */}
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-4">
                    Service Preview Image
                  </label>
                  <div className="relative group border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-indigo-400 transition-colors bg-slate-50">
                    {preview ? (
                      <img
                        src={preview}
                        className="w-full aspect-square object-cover rounded-xl shadow-sm mb-4"
                        alt="Preview"
                      />
                    ) : (
                      <div className="aspect-square flex items-center justify-center text-slate-300 bg-white rounded-xl mb-4">
                        <FiUploadCloud size={40} />
                      </div>
                    )}
                    <label className="inline-flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold shadow-sm border border-slate-100 cursor-pointer hover:bg-indigo-50 transition-all w-full justify-center">
                      <FiUploadCloud /> Upload New
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          setPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                    Bottom Description
                  </label>
                  <textarea
                    name="Bottom_Description"
                    rows={3}
                    value={form.Bottom_Description}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm"
                    placeholder="Closing statement..."
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

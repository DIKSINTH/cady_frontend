import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiArrowLeft,
  FiSave,
  FiType,
  FiHash,
  FiUploadCloud,
  FiImage,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditFact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Count, setCount] = useState("");
  const [Image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/facts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.Name);
        setCount(data.Count);
        setPreview(`${API_BASE}/uploads/${data.Image}`);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("Name", Name);
    fd.append("Count", Count);
    if (Image) fd.append("Image", Image);

    fetch(`${API_BASE}/api/facts/update/${id}`, {
      method: "PUT",
      body: fd,
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/dashboard/view-facts");
      });
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <Link
                to="/dashboard/view-facts"
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-semibold mb-2 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
                Back to Facts
              </Link>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Modify <span className="text-indigo-600">Fact</span>
              </h1>
            </div>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              <FiSave size={20} /> Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Side */}
            <div className="lg:col-span-7 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                  Fact Title
                </label>
                <div className="relative">
                  <FiType className="absolute top-4 left-4 text-slate-300" />
                  <input
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 pl-12 rounded-xl outline-none transition-all font-semibold text-slate-700"
                    placeholder="e.g. Happy Clients"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                  Value / Count
                </label>
                <div className="relative">
                  <FiHash className="absolute top-4 left-4 text-slate-300" />
                  <input
                    type="text"
                    value={Count}
                    onChange={(e) => setCount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 pl-12 rounded-xl outline-none transition-all font-bold text-indigo-600"
                    placeholder="e.g. 500+"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-5 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Icon Asset
              </label>

              <div className="w-full aspect-square bg-slate-50 rounded-3xl border-4 border-white shadow-xl flex items-center justify-center p-12 relative overflow-hidden group">
                {preview ? (
                  <img
                    src={preview}
                    className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110 duration-500"
                    alt="Preview"
                  />
                ) : (
                  <FiImage size={40} className="text-slate-200" />
                )}
              </div>

              <label className="w-full flex flex-col items-center justify-center h-28 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-all group">
                <FiUploadCloud
                  size={24}
                  className="text-slate-300 group-hover:text-indigo-400 mb-2"
                />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                  Change Icon
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

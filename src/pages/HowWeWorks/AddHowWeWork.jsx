import { useState, useRef } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import {
  FiArrowLeft,
  FiPlus,
  FiType,
  FiLink,
  FiUploadCloud,
  FiLayers,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function AddHowWeWorks() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const [URL, setURL] = useState("");
  const [preview, setPreview] = useState("");

  const editor = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Description", Description);
    formData.append("URL", URL);
    formData.append("Image", Image);

    const res = await fetch(`${API_BASE}/api/howweworks`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) navigate("/dashboard/view-howweworks");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <Link
                to="/dashboard/view-howweworks"
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-semibold mb-2 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
                Back
              </Link>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Add Workflow <span className="text-indigo-600">Step</span>
              </h1>
            </div>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              <FiPlus size={20} /> Publish Step
            </button>
          </div>

          <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                  Step Name
                </label>
                <div className="relative">
                  <FiType className="absolute top-4 left-4 text-slate-300" />
                  <input
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 pl-12 rounded-xl outline-none transition-all font-semibold"
                    placeholder="e.g. Initial Consultation"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                  Process Description
                </label>
                <div className="rounded-xl overflow-hidden border border-slate-200">
                  <JoditEditor
                    ref={editor}
                    value={Description}
                    onChange={(content) => setDescription(content)}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                  Documentation URL
                </label>
                <div className="relative">
                  <FiLink className="absolute top-4 left-4 text-slate-300" />
                  <input
                    value={URL}
                    onChange={(e) => setURL(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 pl-12 rounded-xl outline-none transition-all font-medium text-indigo-600"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Step Visual
              </label>
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <FiLayers size={50} className="text-slate-200" />
                )}
              </div>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-indigo-50 transition-all">
                <FiUploadCloud size={30} className="text-slate-300 mb-2" />
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Upload Icon
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                  required
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

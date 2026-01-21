import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiSave,
  FiUploadCloud,
  FiType,
  FiLink,
  FiLayers,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditService() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [URL_Link, setURL_Link] = useState("");
  const [preview, setPreview] = useState("");
  const [Image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${API_BASE}/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.Name);
        setDescription(data.Description);
        setURL_Link(data.URL);
        setPreview(data.Image ? `${API_BASE}/uploads/${data.Image}` : "");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Description", Description);
    formData.append("URL", URL_Link);
    if (Image) formData.append("Image", Image);

    const res = await fetch(`${API_BASE}/api/services/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (res.ok) navigate("/dashboard/view-services");
  };

  if (loading)
    return (
      <DashboardLayout>
        <div className="p-10 font-bold text-slate-400">
          Fetching service data...
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <Link
                to="/dashboard/view-services"
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-semibold mb-2 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
                Back
              </Link>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Edit <span className="text-indigo-600">Service</span>
              </h1>
            </div>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              <FiSave size={20} /> Update Service
            </button>
          </div>

          <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <div className="group">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Service Name
                </label>
                <input
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 rounded-xl outline-none transition-all font-semibold"
                />
              </div>
              <div className="group">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Description
                </label>
                <textarea
                  rows="6"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 rounded-xl outline-none transition-all h-48"
                />
              </div>
              <div className="group">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  URL
                </label>
                <input
                  value={URL_Link}
                  onChange={(e) => setURL_Link(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 rounded-xl outline-none transition-all font-medium text-indigo-600"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 text-center">
                Current Asset
              </label>
              <div className="relative rounded-3xl overflow-hidden bg-slate-100 aspect-square flex items-center justify-center border-4 border-white shadow-xl">
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
                  Replace Image
                </span>
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
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

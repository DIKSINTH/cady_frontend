import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiArrowLeft,
  FiSave,
  FiUploadCloud,
  FiType,
  FiAlignLeft,
  FiImage,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditTestimonialContent() {
  const navigate = useNavigate();
  const [Heading, setHeading] = useState("");
  const [Content, setContent] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/testimonialcontent`)
      .then((res) => res.json())
      .then((data) => {
        setHeading(data.Heading || "");
        setContent(data.Content || "");
        setCurrentImage(data.Image || "");
        setPreview(data.Image ? `${API_BASE}/uploads/${data.Image}` : "");
      })
      .catch((err) => console.error(err));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedFile && !currentImage) return alert("Image is required.");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("Heading", Heading);
      formData.append("Content", Content);
      if (selectedFile) formData.append("Image", selectedFile);

      const res = await fetch(`${API_BASE}/api/testimonialcontent`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) navigate("/dashboard/view-testimonialcontent");
    } catch (err) {
      alert("Error updating content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <Link
                to="/dashboard/view-testimonialcontent"
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-semibold mb-2 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
                Back
              </Link>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Edit <span className="text-indigo-600">Section Style</span>
              </h1>
            </div>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              <FiSave size={20} /> {loading ? "Saving..." : "Update Section"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <div className="group">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Main Heading
                </label>
                <input
                  value={Heading}
                  onChange={(e) => setHeading(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 rounded-xl outline-none transition-all font-semibold"
                  placeholder="e.g. What our clients say"
                />
              </div>
              <div className="group">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Section Subtext
                </label>
                <textarea
                  value={Content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 rounded-xl outline-none transition-all h-40"
                  placeholder="Brief intro for the testimonials section..."
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Background Image
              </label>
              <div className="relative rounded-3xl overflow-hidden bg-slate-100 aspect-video flex items-center justify-center border-4 border-white shadow-lg">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <FiImage size={40} className="text-slate-300" />
                )}
              </div>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-indigo-50 transition-all">
                <FiUploadCloud size={30} className="text-slate-300 mb-2" />
                <span className="text-xs font-bold text-slate-500">
                  Change Image
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
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

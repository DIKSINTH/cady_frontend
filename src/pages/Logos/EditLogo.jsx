import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiArrowLeft, FiUploadCloud, FiImage, FiSave } from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditLogo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    // Fetch the specific logo data
    fetch(`${API_BASE}/api/logos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Check if data exists and use the correct property name (Image)
        if (data && data.Image) {
          setPreview(`${API_BASE}/uploads/${data.Image}`);
        }
      })
      .catch((err) => console.error("Error fetching logo:", err));
  }, [id]);

  const updateLogo = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Use the key "logo" to match your backend's expected field name
    if (image) formData.append("logo", image);

    fetch(`${API_BASE}/api/logos/update/${id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/dashboard/view-logos");
      })
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8 max-w-xl mx-auto">
        <button
          onClick={() => navigate("/dashboard/view-logos")}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-2"
        >
          <FiArrowLeft /> Back to Logos
        </button>
        <h1 className="text-3xl font-bold text-slate-900">Edit Logo</h1>
        <p className="text-slate-500 mt-1">
          Update your brand or partner asset.
        </p>
      </div>

      <div className="flex justify-center">
        <form
          onSubmit={updateLogo}
          className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full max-w-xl"
        >
          {/* Current Image Preview */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Current Logo Preview
            </label>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex justify-center items-center h-40 shadow-inner overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="text-slate-400 flex flex-col items-center">
                  <FiImage size={32} className="mb-2 opacity-20" />
                  <span className="text-xs uppercase tracking-widest">
                    No Image Found
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Upload New Logo
            </label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-all group bg-slate-50/50">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    setPreview(URL.createObjectURL(file)); // This creates a local preview instantly
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="text-slate-500">
                <FiUploadCloud
                  size={32}
                  className="mx-auto mb-2 text-slate-400 group-hover:text-blue-500 transition-colors"
                />
                <p className="text-sm font-medium">Click to replace image</p>
                <p className="text-xs mt-1 text-slate-400">
                  Recommended: PNG or SVG with transparent background
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              <FiSave /> Update Logo
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/view-logos")}
              className="text-slate-500 text-sm font-medium py-2 hover:text-slate-800 transition-colors text-center"
            >
              Cancel Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

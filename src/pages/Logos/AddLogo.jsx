import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiArrowLeft, FiUploadCloud, FiPlus, FiImage } from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function AddLogo() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a logo first");
      return;
    }

    const formData = new FormData();
    formData.append("logo", image);

    fetch(`${API_BASE}/api/logos/add`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/dashboard/view-logos");
      })
      .catch((err) => console.error("Upload error:", err));
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
        <h1 className="text-3xl font-bold text-slate-900">Add New Logo</h1>
        <p className="text-slate-500 mt-1">
          Upload a new partner or client brand asset.
        </p>
      </div>

      <div className="flex justify-center">
        <form
          onSubmit={submitForm}
          className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full max-w-xl"
        >
          {/* Upload Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-4">
              Logo Image
            </label>

            <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:border-blue-400 transition-all group bg-slate-50/50">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="text-slate-500">
                <FiUploadCloud
                  size={40}
                  className="mx-auto mb-3 text-slate-400 group-hover:text-blue-500 transition-colors"
                />
                <p className="text-base font-semibold text-slate-700">
                  Click or drag to upload
                </p>
                <p className="text-xs mt-2 text-slate-400">
                  PNG, SVG or JPG (Recommended transparent background)
                </p>
              </div>
            </div>
          </div>

          {/* New Image Preview Area */}
          {preview && (
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Selected Preview
              </label>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex justify-center items-center h-40 shadow-inner">
                <img
                  src={preview}
                  alt="New Logo Preview"
                  className="max-h-full w-auto object-contain"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              <FiPlus size={20} /> Save Logo
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/view-logos")}
              className="text-slate-500 text-sm font-medium py-2 hover:text-slate-800 transition-colors text-center"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

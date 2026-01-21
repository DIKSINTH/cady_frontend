import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiArrowLeft,
  FiSave,
  FiUploadCloud,
  FiImage,
  FiType,
  FiAlignLeft,
} from "react-icons/fi";
import { API_BASE } from "../../config/api";

export default function EditBlogContent() {
  const navigate = useNavigate();

  const [Heading, setHeading] = useState("");
  const [Content, setContent] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/blogcontent`)
      .then((res) => res.json())
      .then((data) => {
        setHeading(data.Heading || "");
        setContent(data.Content || "");
        setCurrentImage(data.Image || "");
      })
      .catch((err) => console.error(err));
  }, []);

  const handleUpdate = async () => {
    if (!Heading || !Content) {
      alert("Heading and Content cannot be empty.");
      return;
    }

    if (!selectedFile) {
      alert("Image is required when updating.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("Heading", Heading);
      formData.append("Content", Content);
      formData.append("Image", selectedFile);

      const res = await fetch(`${API_BASE}/api/blogcontent`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update content");

      navigate("/dashboard/view-blogcontent");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8 max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/dashboard/view-blogcontent")}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-2"
        >
          <FiArrowLeft /> Back to View
        </button>
        <h1 className="text-3xl font-bold text-slate-900">
          Edit Blog Landing Page
        </h1>
        <p className="text-slate-500 mt-1">
          Update the hero heading and intro text for your main blog listing.
        </p>
      </div>

      <div className="flex justify-center pb-12">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full max-w-4xl space-y-8">
          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <FiType className="text-blue-500" /> Page Heading
              </label>
              <input
                className="w-full border border-slate-200 p-3.5 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-lg font-medium text-slate-800"
                value={Heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Enter hero heading..."
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <FiAlignLeft className="text-blue-500" /> Introductory Content
              </label>
              <textarea
                className="w-full border border-slate-200 p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-slate-700 h-40 leading-relaxed"
                value={Content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter the landing page description..."
              />
            </div>
          </div>

          {/* Media Section */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">
              Banner Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current/Preview Image */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Displaying
                </p>
                <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      className="w-full h-full object-cover"
                      alt="New preview"
                    />
                  ) : currentImage ? (
                    <img
                      src={`${API_BASE}/uploads/${currentImage}`}
                      className="w-full h-full object-cover"
                      alt="Current"
                    />
                  ) : (
                    <div className="text-slate-300 text-center">
                      <FiImage size={40} className="mx-auto opacity-20 mb-2" />
                      <p className="text-xs">No image set</p>
                    </div>
                  )}
                  {selectedFile && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] px-2 py-1 rounded-md font-bold uppercase">
                      New Preview
                    </div>
                  )}
                </div>
              </div>

              {/* Upload New Image */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Upload Required
                </p>
                <div className="relative h-48 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center hover:border-blue-400 transition-all group bg-slate-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <FiUploadCloud
                    size={32}
                    className="text-slate-400 group-hover:text-blue-500 transition-colors mb-2"
                  />
                  <p className="text-sm font-semibold text-slate-700">
                    Click to replace image
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 text-center px-4">
                    Required for update. <br /> PNG or JPG recommended.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave /> {loading ? "Updating Content..." : "Update Content"}
            </button>
            <button
              onClick={() => navigate("/dashboard/view-blogcontent")}
              className="text-slate-500 font-medium hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

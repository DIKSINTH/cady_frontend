import { useState, useRef, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import {
  FiArrowLeft,
  FiSave,
  FiImage,
  FiUploadCloud,
  FiEdit3,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditBlog() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [Image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const editor = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Load blog data
  useEffect(() => {
    fetch(`${API_BASE}/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.Name);
        setDescription(data.Description);
        setCurrentImage(data.Image || null);
        if (data.Image) {
          setPreview(`${API_BASE}/uploads/${data.Image}`);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Description", Description);
    if (Image) formData.append("Image", Image);

    const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      navigate("/dashboard/view-blogs");
    } else {
      alert("Error updating blog!");
    }
  };

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8 max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/dashboard/view-blogs")}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-2"
        >
          <FiArrowLeft /> Back to Blogs
        </button>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <FiEdit3 size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Edit Post</h1>
            <p className="text-slate-500 mt-1">
              Refine your content and update your featured image.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full max-w-4xl space-y-8"
        >
          {/* Blog Title Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Enter a catchy title..."
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-200 p-3.5 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-lg font-medium text-slate-800"
              required
            />
          </div>

          {/* Description Editor */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Content Body
            </label>
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <JoditEditor
                ref={editor}
                value={Description}
                config={{
                  readonly: false,
                  placeholder: "Start writing your story...",
                  minHeight: 400,
                }}
                onChange={(newContent) => setDescription(newContent)}
              />
            </div>
          </div>

          {/* Featured Image Section */}
          <div className="pt-4">
            <label className="block text-sm font-semibold text-slate-700 mb-4">
              Featured Image
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload Box */}
              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-all group bg-slate-50/50">
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
                    size={32}
                    className="mx-auto mb-2 text-slate-400 group-hover:text-blue-500 transition-colors"
                  />
                  <p className="text-sm font-semibold">Change Image</p>
                  <p className="text-xs mt-1 text-slate-400">
                    Drag and drop or click to browse
                  </p>
                </div>
              </div>

              {/* Preview Box */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex justify-center items-center h-44 shadow-inner overflow-hidden relative group">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-slate-300 flex flex-col items-center">
                    <FiImage size={32} className="opacity-20 mb-2" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">
                      No Image Selected
                    </span>
                  </div>
                )}
                {Image && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase shadow-lg">
                    New
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/dashboard/view-blogs")}
              className="text-slate-500 font-medium hover:text-slate-800 transition-colors"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-10 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              <FiSave /> Update Post
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

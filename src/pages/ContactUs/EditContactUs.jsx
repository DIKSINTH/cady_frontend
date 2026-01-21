import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSave, FiUploadCloud, FiImage } from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditContactUs() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Title, setTitle] = useState("");
  const [Sub_Title, setSubTitle] = useState("");
  const [Image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/contactus`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.Title);
        setSubTitle(data.Sub_Title);
        setPreview(`${API_BASE}/uploads/${data.Image}`);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("Title", Title);
    form.append("Sub_Title", Sub_Title);
    if (Image) form.append("image", Image);

    await fetch(`${API_BASE}/api/contactus/update/${id}`, {
      method: "PUT",
      body: form,
    });

    navigate("/dashboard/contact-us");
  };

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8 max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/dashboard/contact-us")}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-2"
        >
          <FiArrowLeft /> Back to View
        </button>
        <h1 className="text-3xl font-bold text-slate-900">
          Edit Contact Content
        </h1>
        <p className="text-slate-500 mt-1">
          Modify the primary heading and introductory text for your contact
          page.
        </p>
      </div>

      <div className="flex justify-center pb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full max-w-2xl space-y-6"
        >
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Main Title
            </label>
            <input
              type="text"
              placeholder="e.g. Get in Touch"
              className="w-full border border-slate-200 p-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-slate-700"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Subtitle Textarea */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sub Title / Description
            </label>
            <textarea
              placeholder="Enter a brief description..."
              className="w-full border border-slate-200 p-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-slate-700"
              rows="4"
              value={Sub_Title}
              onChange={(e) => setSubTitle(e.target.value)}
            ></textarea>
          </div>

          {/* Media Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <FiImage className="text-slate-400" /> Header Image
              </label>
              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-blue-400 transition-all group bg-slate-50/50">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setImage(e.target.files[0]);
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                <div className="text-slate-500">
                  <FiUploadCloud
                    size={28}
                    className="mx-auto mb-2 text-slate-400 group-hover:text-blue-500"
                  />
                  <p className="text-xs font-medium">Click to upload new</p>
                </div>
              </div>
            </div>

            {/* Image Preview Area */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Live Preview
              </label>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-2 h-[104px] flex justify-center items-center shadow-inner overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    className="h-full w-full object-cover rounded-xl"
                    alt="Preview"
                  />
                ) : (
                  <div className="text-slate-300 flex flex-col items-center">
                    <FiImage size={24} className="opacity-20" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              <FiSave /> Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/contact-us")}
              className="text-slate-500 font-medium hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

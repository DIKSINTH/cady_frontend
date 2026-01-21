import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api.js";

export default function EditAboutUs() {
  const [form, setForm] = useState({
    Description: "",
    Scroll_Content: "",
    About: "",
    Vision: "",
    Mission: "",
    Value1: "",
    Value2: "",
    Value3: "",
    Value4: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/aboutus`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          Description: data.Description || "",
          Scroll_Content: data.Scroll_Content || "",
          About: data.About || "",
          Vision: data.Vision || "",
          Mission: data.Mission || "",
          Value1: data.Value1 || "",
          Value2: data.Value2 || "",
          Value3: data.Value3 || "",
          Value4: data.Value4 || "",
        });
        if (data.Image) setPreview(`${API_BASE}${data.Image}`);
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateAboutUs = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (image) formData.append("Image", image);

    await fetch(`${API_BASE}/api/aboutus`, {
      method: "PUT",
      body: formData,
    });
    navigate("/dashboard/about-us");
  };

  const inputClass =
    "w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white text-slate-700";
  const labelClass =
    "block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide";

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto pb-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Edit About Us
            </h1>
            <p className="text-slate-500">
              Update your company information and brand values.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/about-us")}
            className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={updateAboutUs} className="space-y-8">
          {/* Section: Core Content */}
          <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-blue-600 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              Core Content
            </h2>
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Main Description</label>
                <textarea
                  name="Description"
                  value={form.Description}
                  onChange={handleChange}
                  className={inputClass}
                  rows="4"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Scroll Content</label>
                  <textarea
                    name="Scroll_Content"
                    value={form.Scroll_Content}
                    onChange={handleChange}
                    className={inputClass}
                    rows="3"
                  />
                </div>
                <div>
                  <label className={labelClass}>About Summary</label>
                  <textarea
                    name="About"
                    value={form.About}
                    onChange={handleChange}
                    className={inputClass}
                    rows="3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-indigo-600 mb-4">
                Our Vision
              </h2>
              <textarea
                name="Vision"
                value={form.Vision}
                onChange={handleChange}
                className={inputClass}
                rows="4"
              />
            </div>
            <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-indigo-600 mb-4">
                Our Mission
              </h2>
              <textarea
                name="Mission"
                value={form.Mission}
                onChange={handleChange}
                className={inputClass}
                rows="4"
              />
            </div>
          </div>

          {/* Section: Values */}
          <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-emerald-600 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-600 rounded-full"></span>
              Core Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["Value1", "Value2", "Value3", "Value4"].map((v, i) => (
                <div key={v}>
                  <label className={labelClass}>Value {i + 1}</label>
                  <textarea
                    name={v}
                    value={form[v]}
                    onChange={handleChange}
                    className={inputClass}
                    rows="2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section: Media */}
          <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6">
              Display Image
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/2">
                <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-8 hover:bg-slate-50 transition-colors text-center cursor-pointer">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <p className="text-slate-600 font-medium">
                    Click to upload new image
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    PNG, JPG or WEBP preferred
                  </p>
                </div>
              </div>

              {preview && (
                <div className="w-full md:w-1/2">
                  <p className={labelClass}>Preview</p>
                  <div className="relative group overflow-hidden rounded-xl border border-slate-200 shadow-inner bg-slate-100">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-64 mx-auto object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 active:scale-95">
              Update About Us
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

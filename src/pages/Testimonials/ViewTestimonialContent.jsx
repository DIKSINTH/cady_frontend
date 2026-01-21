import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiImage, FiType, FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api";

export default function ViewTestimonialContent() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/testimonialcontent`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data)
    return (
      <DashboardLayout>
        <div className="p-10 text-slate-500">Loading...</div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-light text-slate-800 tracking-tight">
                Section{" "}
                <span className="font-bold text-indigo-600">Configuration</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Control the main heading and background image of the
                testimonials area.
              </p>
            </div>
            <button
              onClick={() =>
                navigate("/dashboard/view-testimonialcontent/edit")
              }
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <FiEdit2 size={20} /> Edit Section
            </button>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Text Info */}
              <div className="space-y-8">
                <div className="group">
                  <div className="flex items-center gap-2 mb-2">
                    <FiType className="text-indigo-500" />
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Section Heading
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {data.Heading}
                  </h2>
                </div>

                <div className="group">
                  <div className="flex items-center gap-2 mb-2">
                    <FiFileText className="text-indigo-500" />
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Subtitle / Content
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {data.Content}
                  </p>
                </div>
              </div>

              {/* Image Preview */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <FiImage className="text-indigo-500" />
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Background Asset
                  </span>
                </div>
                <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-lg shadow-slate-200 ring-1 ring-slate-100">
                  {data.Image ? (
                    <img
                      src={`${API_BASE}/uploads/${data.Image}`}
                      className="w-full h-full object-cover"
                      alt="Section Background"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300 italic">
                      No image uploaded
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

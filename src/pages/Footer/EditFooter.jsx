import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiSave,
  FiType,
  FiList,
  FiAlignLeft,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditFooter() {
  const [form, setForm] = useState({
    Content: "",
    Item1: "",
    Item2: "",
    Item3: "",
    Item4: "",
    Item5: "",
    Item6: "",
    Item7: "",
    Item8: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/footer`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateFooter = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/api/footer`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate("/dashboard/view-footer");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <Link
                to="/dashboard/view-footer"
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-semibold mb-2 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
                Back to View
              </Link>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Edit <span className="text-indigo-600">Footer Content</span>
              </h1>
            </div>
            <button
              onClick={updateFooter}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              <FiSave size={20} /> Save Changes
            </button>
          </div>

          <form onSubmit={updateFooter} className="space-y-8">
            {/* Main Description Section */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-4 ml-1 flex items-center gap-2">
                <FiAlignLeft className="text-indigo-500" /> Primary Description
              </label>
              <textarea
                name="Content"
                value={form.Content}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-5 rounded-2xl outline-none transition-all font-medium text-slate-600 leading-relaxed shadow-inner"
                rows="4"
                placeholder="Enter main footer text or copyright info..."
              />
            </div>

            {/* Link Items Grid */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-6 ml-1 flex items-center gap-2">
                <FiList className="text-indigo-500" /> Navigation & Social Items
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.keys(form)
                  .filter((key) => key !== "Content")
                  .map((key) => (
                    <div key={key} className="relative group">
                      <span className="absolute top-3 left-4 text-[9px] font-black text-slate-300 uppercase group-focus-within:text-indigo-400 transition-colors">
                        {key}
                      </span>
                      <input
                        type="text"
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white pt-8 pb-3 px-4 rounded-xl outline-none transition-all font-bold text-slate-700 text-sm shadow-sm"
                        placeholder="Item label..."
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button className="bg-slate-800 text-white px-12 py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
                Update Footer Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

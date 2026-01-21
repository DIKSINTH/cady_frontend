import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiSave,
  FiGlobe,
  FiPhone,
  FiMail,
  FiMap,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMessageCircle,
} from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function EditSettings() {
  const [form, setForm] = useState({
    Address: "",
    Mobile_Number: "",
    Email: "",
    Facebook_URL: "",
    Instagram_URL: "",
    LinkedIn_URL: "",
    Skype_URL: "",
    Google_Map: "",
    Whatsapp: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/settings`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          Address: data.Address || "",
          Mobile_Number: data.Mobile_Number || "",
          Email: data.Email || "",
          Facebook_URL: data.Facebook_URL || "",
          Instagram_URL: data.Instagram_URL || "",
          LinkedIn_URL: data.LinkedIn_URL || "",
          Skype_URL: data.Skype_URL || "",
          Google_Map: data.Google_Map || "",
          Whatsapp: data.Whatsapp || "",
        });
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateSettings = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/api/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate("/dashboard/view-settings");
  };

  // Icon mapping for aesthetics
  const getIcon = (key) => {
    const icons = {
      Address: <FiMap />,
      Mobile_Number: <FiPhone />,
      Email: <FiMail />,
      Facebook_URL: <FiFacebook />,
      Instagram_URL: <FiInstagram />,
      LinkedIn_URL: <FiLinkedin />,
      Skype_URL: <FiMessageCircle />,
      Google_Map: <FiGlobe />,
      Whatsapp: <FiMessageCircle />,
    };
    return icons[key] || <FiSettings />;
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <Link
                to="/dashboard/view-settings"
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-semibold mb-2 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
                Cancel Changes
              </Link>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Configure <span className="text-indigo-600">Platform</span>
              </h1>
            </div>
            <button
              onClick={updateSettings}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              <FiSave size={20} /> Update Settings
            </button>
          </div>

          <form
            onSubmit={updateSettings}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100"
          >
            {Object.keys(form).map((key) => (
              <div
                key={key}
                className={
                  key === "Address" || key === "Google_Map"
                    ? "md:col-span-2"
                    : ""
                }
              >
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                  {key.replace("_", " ")}
                </label>
                <div className="relative group">
                  <div className="absolute top-4 left-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                    {getIcon(key)}
                  </div>
                  <textarea
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-4 pl-12 rounded-xl outline-none transition-all font-medium text-slate-600 shadow-inner min-h-[56px] resize-none"
                    rows={key === "Address" || key === "Google_Map" ? "3" : "1"}
                  />
                </div>
              </div>
            ))}

            <div className="md:col-span-2 pt-6">
              <button className="w-full bg-slate-800 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.99]">
                Verify & Save Configuration
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

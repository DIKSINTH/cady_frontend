import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2, FiImage } from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function ViewLogos() {
  const [logos, setLogos] = useState([]);
  const navigate = useNavigate();

  const loadLogos = () => {
    fetch(`${API_BASE}/api/logos`)
      .then((res) => res.json())
      .then((data) => setLogos(data));
  };

  useEffect(() => {
    loadLogos();
  }, []);

  const deleteLogo = (id) => {
    if (!window.confirm("Are you sure you want to delete this logo?")) return;

    fetch(`${API_BASE}/api/logos/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => loadLogos());
  };

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Brand Logos</h1>
          <p className="text-slate-500 mt-1">
            Manage the partner and client logos displayed on your site.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/view-logos/add")}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95 w-fit"
        >
          <FiPlus size={20} /> Add New Logo
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-20 text-center">
                  #
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Logo Preview
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {logos.length > 0 ? (
                logos.map((logo, index) => (
                  <tr
                    key={logo.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-6 text-sm text-slate-500 text-center font-medium">
                      {index + 1}
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex justify-center">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-inner">
                          <img
                            src={`${API_BASE}/uploads/${logo.Image}`}
                            alt="Logo"
                            className="h-12 w-auto object-contain mx-auto"
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex justify-center gap-2">
                        <button
                          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all group"
                          onClick={() =>
                            navigate(`/dashboard/view-logos/edit/${logo.id}`)
                          }
                          title="Edit"
                        >
                          <FiEdit2
                            size={18}
                            className="group-hover:scale-110 transition-transform"
                          />
                        </button>

                        <button
                          className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all group"
                          onClick={() => deleteLogo(logo.id)}
                          title="Delete"
                        >
                          <FiTrash2
                            size={18}
                            className="group-hover:scale-110 transition-transform"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    <FiImage size={40} className="mx-auto mb-3 opacity-20" />
                    <p>No logos found. Click "Add New Logo" to get started.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

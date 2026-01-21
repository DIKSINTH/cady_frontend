import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiExternalLink,
  FiLayers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api.js";

export default function ViewServices() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const loadServices = () => {
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error loading services:", err));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    const res = await fetch(`${API_BASE}/api/services/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      loadServices();
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-light text-slate-800 tracking-tight">
                Company{" "}
                <span className="font-bold text-indigo-600">Services</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Showcase the solutions and expertise you offer.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/view-services/add")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <FiPlus size={20} /> Add Service
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Icon / Image
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Service Details
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Target Link
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {services.length > 0 ? (
                    services.map((service) => (
                      <tr
                        key={service.id}
                        className="group hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="py-6 px-6">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm flex-shrink-0">
                            {service.Image ? (
                              <img
                                src={`${API_BASE}/uploads/${service.Image}`}
                                className="w-full h-full object-cover"
                                alt=""
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <FiLayers size={24} />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">
                            {service.Name}
                          </h3>
                          <div
                            className="text-sm text-slate-500 line-clamp-1 max-w-sm"
                            dangerouslySetInnerHTML={{
                              __html: service.Description,
                            }}
                          />
                        </td>
                        <td className="py-6 px-6">
                          {service.URL ? (
                            <a
                              href={service.URL}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:text-indigo-700 underline underline-offset-4 decoration-indigo-200"
                            >
                              <FiExternalLink size={14} /> View Page
                            </a>
                          ) : (
                            <span className="text-slate-300 text-xs">—</span>
                          )}
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/view-services/edit/${service.id}`
                                )
                              }
                              className="p-2.5 rounded-xl bg-white border border-slate-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteService(service.id)}
                              className="p-2.5 rounded-xl bg-white border border-slate-100 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-20 text-slate-400"
                      >
                        No services found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

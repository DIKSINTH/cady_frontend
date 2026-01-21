import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiImage } from "react-icons/fi";
import { API_BASE } from "../../config/api.js";

export default function ContactUs() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/contactus`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
        <p className="text-slate-500 mt-1">
          Update the title, subtitle, and primary image for your contact page.
        </p>
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Sub Title
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Image
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data ? (
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-6 text-sm text-slate-500 text-center font-medium">
                    1
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-sm font-semibold text-slate-700">
                      {data.Title || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-sm text-slate-600 leading-relaxed max-w-xs">
                    {data.Sub_Title || "—"}
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-center">
                      {data.Image ? (
                        <img
                          src={`${API_BASE}/uploads/${data.Image}`}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm"
                          alt="contact"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 border border-dashed border-slate-200">
                          <FiImage size={20} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-center">
                      <button
                        className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all group"
                        onClick={() =>
                          navigate(`/dashboard/contact-us/edit/${data.id}`)
                        }
                        title="Edit Contact Info"
                      >
                        <FiEdit2
                          size={18}
                          className="group-hover:scale-110 transition-transform"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                      <p className="text-sm">Loading contact information...</p>
                    </div>
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

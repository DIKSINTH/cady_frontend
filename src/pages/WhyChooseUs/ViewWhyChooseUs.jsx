import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiCheckCircle,
  FiImage,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api";

export default function ViewWhyChooseUs() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const loadItems = () => {
    fetch(`${API_BASE}/api/whychooseus`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    const res = await fetch(`${API_BASE}/api/whychooseus/${id}`, {
      method: "DELETE",
    });
    if (res.ok) loadItems();
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-light text-slate-800 tracking-tight">
                Value{" "}
                <span className="font-bold text-indigo-600">Propositions</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Manage the "Why Choose Us" selling points.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/view-whychooseus/add")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <FiPlus size={20} /> Add New Point
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Icon / Image
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Title & Detail
                    </th>
                    <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <tr
                        key={item.id}
                        className="group hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="py-6 px-6">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm">
                            <img
                              src={`${API_BASE}/uploads/${item.Image}`}
                              className="w-full h-full object-cover"
                              alt={item.Name}
                              onError={(e) => {
                                e.target.src =
                                  "https://placehold.co/100x100?text=No+Image";
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full uppercase">
                              ID: {item.id}
                            </span>
                            <h3 className="font-bold text-slate-800 tracking-tight">
                              {item.Name}
                            </h3>
                          </div>
                          <div
                            className="text-sm text-slate-500 line-clamp-2 max-w-lg leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: item.Description,
                            }}
                          />
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/view-whychooseus/edit/${item.id}`
                                )
                              }
                              className="p-2.5 rounded-xl bg-white border border-slate-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteItem(item.id)}
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
                      <td colSpan="3" className="text-center py-24">
                        <FiCheckCircle
                          size={40}
                          className="mx-auto text-slate-200 mb-3"
                        />
                        <p className="text-slate-400 font-medium italic">
                          No value propositions added yet.
                        </p>
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

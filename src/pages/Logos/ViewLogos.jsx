import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function ViewLogos() {
  const [logos, setLogos] = useState([]);
  const navigate = useNavigate();

  const loadLogos = () => {
    fetch("http://localhost:5000/api/logos")
      .then((res) => res.json())
      .then((data) => setLogos(data));
  };

  useEffect(() => {
    loadLogos();
  }, []);

  const deleteLogo = (id) => {
    if (!window.confirm("Are you sure you want to delete this logo?")) return;

    fetch(`http://localhost:5000/api/logos/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => loadLogos());
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Logos</h2>

          <button
            onClick={() => navigate("/dashboard/view-logos/add")}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            ➕ Add New Logo
          </button>
        </div>

        <table className="w-full border rounded shadow bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 w-20">#</th>
              <th className="p-3">Image</th>
              <th className="p-3 w-32">Action</th>
            </tr>
          </thead>

          <tbody>
            {logos.map((logo, index) => (
              <tr key={logo.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>

                <td className="p-3">
                  <img
                    src={`http://localhost:5000/uploads/${logo.Image}`}
                    alt="Logo"
                    className="h-16 mx-auto object-contain"
                  />
                </td>

                <td className="p-3 flex gap-4 text-blue-600 text-xl">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/view-logos/edit/${logo.id}`)
                    }
                  >
                    ✏️
                  </button>

                  <button onClick={() => deleteLogo(logo.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

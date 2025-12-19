import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ViewServices() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const loadServices = () => {
    fetch("http://localhost:5000/api/services")
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

    const res = await fetch(`http://localhost:5000/api/services/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Service deleted successfully!");
      loadServices();
    } else {
      alert("Failed to delete service!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">View Services</h1>

          <button
            onClick={() => navigate("/dashboard/view-services/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Service
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 border-r">ID</th>
                <th className="py-2 px-4 border-r">Name</th>
                <th className="py-2 px-4 border-r">Description</th>
                <th className="py-2 px-4 border-r">Image</th>
                <th className="py-2 px-4 border-r">URL</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {services.length > 0 ? (
                services.map((service) => (
                  <tr key={service.id} className="border-b">
                    <td className="py-2 px-4 border-r">{service.id}</td>

                    <td className="py-2 px-4 border-r">{service.Name}</td>

                    <td
                      className="py-2 px-4 border-r"
                      dangerouslySetInnerHTML={{
                        __html: service.Description,
                      }}
                    ></td>

                    <td className="py-2 px-4 border-r">
                      {service.Image ? (
                        <img
                          src={`http://localhost:5000/uploads/${service.Image}`}
                          alt="Service"
                          className="w-20 h-20 object-cover rounded"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>

                    <td className="py-2 px-4 border-r">
                      {service.URL ? (
                        <a
                          href={service.URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {service.URL}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="py-2 px-4 flex gap-3 justify-center">
                      <FiEdit2
                        className="text-blue-600 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/dashboard/view-services/edit/${service.id}`
                          )
                        }
                      />

                      <FiTrash2
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteService(service.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No services found
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

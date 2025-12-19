import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ViewBanners() {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  const loadBanners = () => {
    fetch("http://localhost:5000/api/banners")
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .catch((err) => console.error("Error loading banners:", err));
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const deleteBanner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    const res = await fetch(`http://localhost:5000/api/banners/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Banner deleted successfully!");
      loadBanners();
    } else {
      alert("Failed to delete banner!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">View Banners</h1>

          <button
            onClick={() => navigate("/dashboard/view-banners/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Banner
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 border-r">ID</th>
                <th className="py-2 px-4 border-r">Title</th>
                <th className="py-2 px-4 border-r">Description</th>
                <th className="py-2 px-4 border-r">Image</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {banners.length > 0 ? (
                banners.map((banner) => (
                  <tr key={banner.id} className="border-b">
                    <td className="py-2 px-4 border-r">{banner.id}</td>
                    <td className="py-2 px-4 border-r">{banner.Title}</td>

                    <td
                      className="py-2 px-4 border-r"
                      dangerouslySetInnerHTML={{
                        __html: banner.Description,
                      }}
                    ></td>

                    <td className="py-2 px-4 border-r">
                      {banner.Image ? (
                        <img
                          src={`http://localhost:5000/uploads/${banner.Image}`}
                          alt="Banner"
                          className="w-20 h-20 object-cover rounded"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>

                    <td className="py-2 px-4 flex gap-3 justify-center">
                      <FiEdit2
                        className="text-blue-600 cursor-pointer"
                        onClick={() =>
                          navigate(`/dashboard/view-banners/edit/${banner.id}`)
                        }
                      />

                      <FiTrash2
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteBanner(banner.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No banners found
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

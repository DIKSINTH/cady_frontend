import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ViewWhyChooseUs() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const loadItems = () => {
    fetch("http://localhost:5000/api/whychooseus")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    const res = await fetch(`http://localhost:5000/api/whychooseus/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Deleted successfully!");
      loadItems();
    } else {
      alert("Delete failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Why Choose Us</h1>
          <button
            onClick={() => navigate("/dashboard/view-whychooseus/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add New
          </button>
        </div>

        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-2 border-r">ID</th>
              <th className="p-2 border-r">Name</th>
              <th className="p-2 border-r">Description</th>
              <th className="p-2 border-r">Image</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 border-r">{item.id}</td>
                  <td className="p-2 border-r">{item.Name}</td>

                  <td
                    className="p-2 border-r"
                    dangerouslySetInnerHTML={{ __html: item.Description }}
                  ></td>

                  <td className="p-2 border-r">
                    <img
                      src={`http://localhost:5000/uploads/${item.Image}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>

                  <td className="p-2 flex gap-4 justify-center">
                    <FiEdit2
                      className="text-blue-600 cursor-pointer"
                      onClick={() =>
                        navigate(`/dashboard/view-whychooseus/edit/${item.id}`)
                      }
                    />

                    <FiTrash2
                      className="text-red-600 cursor-pointer"
                      onClick={() => deleteItem(item.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

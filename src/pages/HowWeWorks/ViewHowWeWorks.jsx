import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ViewHowWeWorks() {
  const [howweworks, setHowWeWorks] = useState([]);
  const navigate = useNavigate();

  const loadHowWeWorks = () => {
    fetch("http://localhost:5000/api/howweworks")
      .then((res) => res.json())
      .then((data) => setHowWeWorks(data))
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    loadHowWeWorks();
  }, []);

  const deleteHowWeWork = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    const res = await fetch(`http://localhost:5000/api/howweworks/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Deleted successfully!");
      loadHowWeWorks();
    } else {
      alert("Delete failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">View How We Works</h1>

          <button
            onClick={() => navigate("/dashboard/view-howweworks/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add New
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border-r">ID</th>
              <th className="p-2 border-r">Name</th>
              <th className="p-2 border-r">Description</th>
              <th className="p-2 border-r">Image</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {howweworks.length > 0 ? (
              howweworks.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 border-r">{item.id}</td>
                  <td className="p-2 border-r">{item.Name}</td>

                  <td
                    className="p-2 border-r w-[300px]"
                    dangerouslySetInnerHTML={{ __html: item.Description }}
                  ></td>

                  <td className="p-2 border-r">
                    {item.Image ? (
                      <img
                        src={`http://localhost:5000/uploads/${item.Image}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td className="p-2 flex gap-4 justify-center">
                    <FiEdit2
                      className="text-blue-600 cursor-pointer"
                      onClick={() =>
                        navigate(`/dashboard/view-howweworks/edit/${item.id}`)
                      }
                    />

                    <FiTrash2
                      className="text-red-600 cursor-pointer"
                      onClick={() => deleteHowWeWork(item.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

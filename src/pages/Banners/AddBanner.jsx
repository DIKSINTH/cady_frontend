import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function AddBanner() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Title", Title);
    formData.append("Description", Description);
    formData.append("Image", Image);

    const res = await fetch("http://localhost:5000/api/banners", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Banner added successfully!");
      navigate("/dashboard/view-banners");
    } else {
      alert("Failed to add banner");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Banner</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Banner Title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <textarea
            placeholder="Enter Description..."
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded h-40"
            required
          ></textarea>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full rounded"
            required
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Banner
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

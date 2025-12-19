import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function AddWhyChooseUs() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Description", Description);
    formData.append("Image", Image);

    const res = await fetch("http://localhost:5000/api/whychooseus", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Added successfully!");
      navigate("/dashboard/view-whychooseus");
    } else {
      alert("Error adding item");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add Why Choose Us</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <textarea
            className="border p-2 w-full h-32 rounded"
            placeholder="Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full rounded"
            required
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Item
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function AddService() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const [URL, setURL] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Description", Description);
    formData.append("URL", URL);
    formData.append("Image", Image);

    const res = await fetch("http://localhost:5000/api/services", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Service Added Successfully!");
      navigate("/dashboard/view-services");
    } else {
      alert("Error adding service!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Service</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Service Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <label className="font-semibold">Description</label>
          <textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded h-32"
            required
          ></textarea>

          <input
            type="text"
            placeholder="URL (optional)"
            value={URL}
            onChange={(e) => setURL(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full rounded"
            required
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Service
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

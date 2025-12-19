import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function AddTestimonial() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("description", description);
    if (image) formData.append("image", image);

    const res = await fetch("http://localhost:5000/api/testimonials", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Testimonial Added Successfully!");
      navigate("/dashboard/view-testimonials");
    } else {
      alert("Error adding testimonial!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Testimonial</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Testimonial Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <label className="font-semibold">Description</label>
          <textarea
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full rounded"
            required
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Testimonial
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

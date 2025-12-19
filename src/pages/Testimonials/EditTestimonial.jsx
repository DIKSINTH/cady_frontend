import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTestimonial() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/testimonials/${id}`);
        if (!res.ok) throw new Error("Failed to fetch testimonial");

        const data = await res.json();

        setName(data.name || "");
        setPosition(data.position || "");
        setDescription(data.description || "");
        setCurrentImage(data.image || null);
      } catch (err) {
        setError("Failed to load testimonial data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error();

      alert("Testimonial updated successfully!");
      navigate("/dashboard/view-testimonials");
    } catch {
      alert("Error updating testimonial!");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;

  return (
    <DashboardLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Testimonial</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <textarea
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          {currentImage && !image && (
            <img
              src={`http://localhost:5000/uploads/${currentImage}`}
              className="w-32 h-32 object-cover rounded"
              alt="Current"
            />
          )}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Update Testimonial
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

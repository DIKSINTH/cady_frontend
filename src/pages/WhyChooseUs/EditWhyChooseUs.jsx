import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";

export default function EditWhyChooseUs() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [Image, setImage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/whychooseus/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.Name);
        setDescription(data.Description);
        setCurrentImage(data.Image);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Description", Description);

    if (Image) formData.append("Image", Image);

    const res = await fetch(`http://localhost:5000/api/whychooseus/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("Updated Successfully!");
      navigate("/dashboard/view-whychooseus");
    } else {
      alert("Update Failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Why Choose Us</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <textarea
            className="border p-2 w-full h-32 rounded"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          {currentImage && (
            <img
              src={`http://localhost:5000/uploads/${currentImage}`}
              className="w-32 h-32 object-cover rounded"
            />
          )}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Update
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

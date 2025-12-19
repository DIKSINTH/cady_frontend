import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBanner() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [Image, setImage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/banners/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.Title);
        setDescription(data.Description);
        setCurrentImage(data.Image);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Title", Title);
    formData.append("Description", Description);

    if (Image) formData.append("Image", Image);

    const res = await fetch(`http://localhost:5000/api/banners/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("Banner updated successfully!");
      navigate("/dashboard/view-banners");
    } else {
      alert("Error updating banner!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Banner</h2>

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
            className="border p-2 w-full rounded h-40"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          {currentImage && (
            <div>
              <p className="font-semibold">Current Image:</p>
              <img
                src={`http://localhost:5000/uploads/${currentImage}`}
                alt="Banner"
                className="w-32 h-32 object-cover rounded mb-2"
              />
            </div>
          )}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Update Banner
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

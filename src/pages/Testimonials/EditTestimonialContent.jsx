import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

export default function EditTestimonialContent() {
  const navigate = useNavigate();

  const [Heading, setHeading] = useState("");
  const [Content, setContent] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/testimonialcontent")
      .then((res) => res.json())
      .then((data) => {
        setHeading(data.Heading || "");
        setContent(data.Content || "");
        setCurrentImage(data.Image || "");
      })
      .catch((err) => console.error(err));
  }, []);

  const handleUpdate = async () => {
    if (!Heading || !Content) {
      alert("Heading and Content cannot be empty.");
      return;
    }

    if (!selectedFile) {
      alert("Image is required when updating.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("Heading", Heading);
      formData.append("Content", Content);
      formData.append("Image", selectedFile);

      const res = await fetch("http://localhost:5000/api/testimonialcontent", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update content");

      navigate("/dashboard/view-testimonialcontent");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-5">Edit Testimonial Content</h1>

      <div className="bg-white shadow p-5 rounded space-y-4">
        <input
          className="border p-2 w-full"
          value={Heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Heading"
        />

        <textarea
          className="border p-2 w-full h-40"
          value={Content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />

        <div>
          <p className="mb-2">Current Image:</p>
          {currentImage ? (
            <img
              src={`http://localhost:5000/uploads/${currentImage}`}
              className="w-40 h-40 object-cover mb-2"
            />
          ) : (
            <div>No current image</div>
          )}
        </div>

        <div>
          <label className="block mb-1">Upload New Image (required):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-blue-500 text-white px-5 py-2 rounded mt-3"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </DashboardLayout>
  );
}

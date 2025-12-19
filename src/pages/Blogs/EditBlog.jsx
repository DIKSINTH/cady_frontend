import { useState, useRef, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";

export default function EditBlog() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState(""); // Controlled editor
  const [currentImage, setCurrentImage] = useState(null);
  const [Image, setImage] = useState(null);

  const editor = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Load blog data
  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.Name);
        setDescription(data.Description); // directly set state
        setCurrentImage(data.Image || null);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Description", Description);
    if (Image) formData.append("Image", Image);

    const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("Blog updated successfully!");
      navigate("/dashboard/view-blogs");
    } else {
      alert("Error updating blog!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Blog Name */}
          <input
            type="text"
            placeholder="Blog Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          {/* Description */}
          <label className="font-semibold">Description</label>
          <JoditEditor
            ref={editor}
            value={Description}
            onChange={(newContent) => setDescription(newContent)}
          />

          {/* Current Image */}
          {currentImage && !Image && (
            <div className="mb-2">
              <p className="font-semibold">Current Image:</p>
              <img
                src={`http://localhost:5000/uploads/${currentImage}`}
                alt="Current Blog"
                className="w-32 h-32 object-cover rounded mb-2"
              />
            </div>
          )}

          {/* Image Upload */}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Update Blog
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

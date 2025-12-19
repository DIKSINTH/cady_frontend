import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";

export default function EditHowWeWorks() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [URL, setURL] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [Image, setImage] = useState(null);

  const editor = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/howweworks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.Name);
        setDescription(data.Description);
        setURL(data.URL);
        setCurrentImage(data.Image);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Description", Description);
    formData.append("URL", URL);
    if (Image) formData.append("Image", Image);

    const res = await fetch(`http://localhost:5000/api/howweworks/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("Updated successfully!");
      navigate("/dashboard/view-howweworks");
    } else {
      alert("Update failed!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit How We Work</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <label>Description</label>
          <JoditEditor
            ref={editor}
            value={Description}
            onChange={(content) => setDescription(content)}
          />

          <input
            type="text"
            value={URL}
            onChange={(e) => setURL(e.target.value)}
            className="border p-2 w-full rounded"
          />

          {currentImage && (
            <div>
              <p>Current Image:</p>
              <img
                src={`http://localhost:5000/uploads/${currentImage}`}
                className="w-32 h-32 object-cover rounded"
              />
            </div>
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

import { useState, useRef } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

export default function AddHowWeWorks() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const [URL, setURL] = useState("");

  const editor = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Description", Description);
    formData.append("URL", URL);
    formData.append("Image", Image);

    const res = await fetch("http://localhost:5000/api/howweworks", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Added successfully!");
      navigate("/dashboard/view-howweworks");
    } else {
      alert("Add failed!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add How We Work</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
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
            Add
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

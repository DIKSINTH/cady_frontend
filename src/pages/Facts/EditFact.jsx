import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

export default function EditFact() {
  const { id } = useParams();
  const [Name, setName] = useState("");
  const [Count, setCount] = useState("");
  const [Image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/facts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.Name);
        setCount(data.Count);
        setPreview(`http://localhost:5000/uploads/${data.Image}`);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("Name", Name);
    fd.append("Count", Count);
    if (Image) fd.append("Image", Image);

    fetch(`http://localhost:5000/api/facts/update/${id}`, {
      method: "PUT",
      body: fd,
    })
      .then((res) => res.json())
      .then(() => {
        alert("Fact updated successfully!");
        window.location.href = "/dashboard/view-facts";
      });
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Fact</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="text"
            value={Count}
            onChange={(e) => setCount(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <img src={preview} className="h-24 mb-2" />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Update
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

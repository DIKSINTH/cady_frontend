import { useState, useRef } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
export default function AddBlog() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const editor = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Description", Description);
    formData.append("Image", Image);
    const res = await fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      alert("Blog Added Successfully!");
      navigate("/dashboard/view-blogs");
    } else {
      alert("Error adding blog!");
    }
  };
  return (
    <DashboardLayout>
      {" "}
      <div className="p-4 max-w-2xl mx-auto">
        {" "}
        <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>{" "}
        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          {/* Blog Name */}{" "}
          <input
            type="text"
            placeholder="Blog Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />{" "}
          <label className="font-semibold">Description</label>{" "}
          {/* JODIT EDITOR */}{" "}
          <JoditEditor
            ref={editor}
            value={Description}
            onChange={(newContent) => setDescription(newContent)}
          />{" "}
          {/* Image Upload */}{" "}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full rounded"
            required
          />{" "}
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            {" "}
            Add Blog{" "}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </DashboardLayout>
  );
}

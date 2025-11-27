import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function EditAboutUs() {
  const [description, setDescription] = useState("");
  const [scrollContent, setScrollContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  // ✅ FETCH DATA FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/aboutus")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch About Us");
        return res.json();
      })
      .then((data) => {
        setDescription(data.description || "");
        setScrollContent(data.scrollContent || "");
        setPreview(data.image || ""); // full URL from backend
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ✅ HANDLE UPDATE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    formData.append("scrollContent", scrollContent);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch("http://localhost:5000/api/aboutus", {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("About Us Updated Successfully!");

        // 🔥 Corrected route
        navigate("/dashboard/about-us");
      } else {
        const errData = await res.json();
        alert(
          "Update failed: " + (errData.error || errData.message || "Unknown")
        );
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Edit About Us</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded shadow space-y-4"
      >
        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="border w-full p-2 mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>

        {/* Scrolling Content */}
        <div>
          <label className="font-semibold">Scrolling Content</label>
          <textarea
            className="border w-full p-2 mt-1"
            value={scrollContent}
            onChange={(e) => setScrollContent(e.target.value)}
            rows="3"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-semibold">Image</label>
          <div className="flex items-center space-x-4 mt-2">
            {preview && (
              <img
                src={preview}
                width="150"
                className="rounded shadow border"
                alt="Preview"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Changes
        </button>
      </form>
    </DashboardLayout>
  );
}

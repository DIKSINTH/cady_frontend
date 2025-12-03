import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function EditAboutUs() {
  const [form, setForm] = useState({
    Description: "",
    Scroll_Content: "",
    About: "",
    Vision: "",
    Mission: "",
    Value1: "",
    Value2: "",
    Value3: "",
    Value4: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/aboutus")
      .then((res) => res.json())
      .then((data) => {
        setForm({
          Description: data.Description || "",
          Scroll_Content: data.Scroll_Content || "",
          About: data.About || "",
          Vision: data.Vision || "",
          Mission: data.Mission || "",
          Value1: data.Value1 || "",
          Value2: data.Value2 || "",
          Value3: data.Value3 || "",
          Value4: data.Value4 || "",
        });
        if (data.Image) setPreview(`http://localhost:5000${data.Image}`);
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateAboutUs = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (image) formData.append("Image", image);

    await fetch("http://localhost:5000/api/aboutus", {
      method: "PUT",
      body: formData,
    });
    navigate("/dashboard/about-us");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-5">Edit About Us</h1>
      <form
        onSubmit={updateAboutUs}
        className="bg-white shadow rounded-lg p-5 space-y-4"
      >
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label className="font-semibold">{key.replace("_", " ")}</label>
            <textarea
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows="3"
            />
          </div>
        ))}

        <div>
          <label className="font-semibold">Image</label>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="max-w-sm rounded mt-3 border"
            />
          )}
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </DashboardLayout>
  );
}

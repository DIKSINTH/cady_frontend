import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function EditAboutUs() {
  const [form, setForm] = useState({
    description: "",
    scrollContent: "",
    About: "",
    Vision: "",
    Mission: "",
    value1: "",
    value2: "",
    value3: "",
    value4: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/aboutus")
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setPreview(data.image);
      });
  }, []);

  const updateAboutUs = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (image) formData.append("image", image);

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
        <Field
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <Field
          label="Scroll Content"
          name="scrollContent"
          value={form.scrollContent}
          onChange={handleChange}
        />

        {/* EXTRA FIELDS */}
        <Field
          label="About"
          name="About"
          value={form.About}
          onChange={handleChange}
        />
        <Field
          label="Vision"
          name="Vision"
          value={form.Vision}
          onChange={handleChange}
        />
        <Field
          label="Mission"
          name="Mission"
          value={form.Mission}
          onChange={handleChange}
        />

        <Field
          label="Value 1"
          name="value1"
          value={form.value1}
          onChange={handleChange}
        />
        <Field
          label="Value 2"
          name="value2"
          value={form.value2}
          onChange={handleChange}
        />
        <Field
          label="Value 3"
          name="value3"
          value={form.value3}
          onChange={handleChange}
        />
        <Field
          label="Value 4"
          name="value4"
          value={form.value4}
          onChange={handleChange}
        />

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
              className="max-w-sm rounded mt-2"
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

function Field({ label, name, value, onChange }) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <textarea
        className="w-full border p-2 rounded"
        rows="3"
        name={name}
        value={value || ""}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

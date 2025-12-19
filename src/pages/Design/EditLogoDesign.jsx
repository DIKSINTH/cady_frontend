import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function EditLogoDesign() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Title: "",
    Description: "",
    Design_Process1: "",
    Design_Process2: "",
    Design_Process3: "",
    Design_Process4: "",
    Design_Process11: "",
    Design_Process12: "",
    Design_Process21: "",
    Design_Process22: "",
    Design_Process31: "",
    Design_Process32: "",
    Design_Process41: "",
    Design_Process42: "",
    Why_Choose_Us1: "",
    Why_Choose_Us2: "",
    Why_Choose_Us3: "",
    Why_Choose_Us4: "",
    Process1: "",
    Process2: "",
    Process3: "",
    Process4: "",
    Bottom_Description: "",
  });

  const [Image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  /* -----------------------------
        FETCH DATA
  ------------------------------ */
  useEffect(() => {
    fetch("http://localhost:5000/api/logodesign")
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setPreview(`http://localhost:5000/uploads/${data.Image}`);
      });
  }, []);

  /* -----------------------------
       HANDLE INPUT CHANGE
  ------------------------------ */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* -----------------------------
            SUBMIT
  ------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));

    if (Image) fd.append("Image", Image);

    await fetch("http://localhost:5000/api/logodesign/update", {
      method: "PUT",
      body: fd,
    });

    navigate("/dashboard/view-logodesign");
  };

  return (
    <DashboardLayout>
      <div className="p-5 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Logo Design</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* TITLE */}
          <div className="col-span-2">
            <label className="font-semibold mb-1 block">Title</label>
            <input
              type="text"
              name="Title"
              value={form.Title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-2">
            <label className="font-semibold mb-1 block">Description</label>
            <textarea
              name="Description"
              value={form.Description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* ALL OTHER DB FIELDS */}
          {Object.keys(form)
            .filter((key) => key !== "Title" && key !== "Description")
            .map((key) => (
              <div key={key} className="col-span-1 flex flex-col">
                <label className="font-semibold mb-1">{key}</label>
                <input
                  type="text"
                  name={key}
                  value={form[key] || ""}
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
              </div>
            ))}

          {/* IMAGE */}
          <div className="col-span-2">
            <label className="font-semibold mb-1 block">Image</label>
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            {preview && (
              <img
                src={preview}
                className="w-32 h-32 mt-3 rounded object-cover"
              />
            )}
          </div>

          <button className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

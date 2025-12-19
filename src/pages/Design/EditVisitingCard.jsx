import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function EditVisitingCard() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [Image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Fetch data and store ID
  useEffect(() => {
    fetch("http://localhost:5000/api/visitingcard")
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        if (data.Image)
          setPreview(`http://localhost:5000/uploads/${data.Image}`);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value ?? "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "id" && key !== "Image") fd.append(key, value);
    });

    if (Image) fd.append("Image", Image);

    await fetch(`http://localhost:5000/api/visitingcard/update/${form.id}`, {
      method: "PUT",
      body: fd,
    });

    navigate("/dashboard/view-visitingcard");
  };

  return (
    <DashboardLayout>
      <div className="p-5 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Visiting Card</h1>

        {Object.keys(form).length > 0 && (
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
            {Object.keys(form)
              .filter((key) => key !== "id" && key !== "Image")
              .map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="font-semibold mb-1">{key}</label>
                  {key === "Description" || key === "Bottom_Description" ? (
                    <textarea
                      name={key}
                      value={form[key] || ""}
                      onChange={handleChange}
                      className="p-2 border rounded"
                      rows={4}
                    />
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={form[key] || ""}
                      onChange={handleChange}
                      className="p-2 border rounded"
                    />
                  )}
                </div>
              ))}

            <div className="col-span-2">
              <label className="font-semibold mb-1">Image</label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>

            {preview && (
              <img
                src={preview}
                className="w-40 h-40 object-cover rounded shadow col-span-2"
                alt="Preview"
              />
            )}

            <button className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}

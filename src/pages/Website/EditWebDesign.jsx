import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

export default function EditWebDesign() {
  const [form, setForm] = useState({
    Title: "",
    Description: "",
    Design1: "",
    Design2: "",
    Design3: "",
    Design4: "",
    Design5: "",
    Process1: "",
    Process2: "",
    Process3: "",
    Process4: "",
    Process5: "",
    Content1: "",
    Content2: "",
  });

  const [oldImage, setOldImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const imageRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/webdesign/edit")
      .then((res) => res.json())
      .then((res) => {
        setForm(res);
        setOldImage(res.Image);
        setPreviewImage(`http://localhost:5000/uploads/${res.Image}`);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    fd.append("oldImage", oldImage);
    if (imageRef.current.files[0]) {
      fd.append("Image", imageRef.current.files[0]);
    }

    const response = await fetch("http://localhost:5000/api/webdesign/update", {
      method: "POST",
      body: fd,
    });

    await response.json();
    alert("Updated Successfully!");
    navigate("/dashboard/view-webdesign");
  };

  return (
    <DashboardLayout>
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-4">Edit Web Design</h2>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="col-span-2">
            <label className="font-semibold">Title</label>
            <input
              type="text"
              name="Title"
              value={form.Title}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="col-span-2">
            <label className="font-semibold">Description</label>
            <textarea
              name="Description"
              value={form.Description}
              onChange={handleChange}
              className="border p-2 w-full"
              rows={3}
            />
          </div>

          <div className="col-span-2">
            <label className="font-semibold">Image</label>
            <input type="file" ref={imageRef} className="border p-2 w-full" />
            {previewImage && (
              <img
                src={previewImage}
                className="w-32 mt-2 border"
                alt="Preview"
              />
            )}
          </div>

          {["Design1", "Design2", "Design3", "Design4", "Design5"].map(
            (item) => (
              <div key={item}>
                <label className="font-semibold">{item}</label>
                <input
                  type="text"
                  name={item}
                  value={form[item] || ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
            )
          )}

          {["Process1", "Process2", "Process3", "Process4", "Process5"].map(
            (item) => (
              <div key={item}>
                <label className="font-semibold">{item}</label>
                <input
                  type="text"
                  name={item}
                  value={form[item] || ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
            )
          )}

          {["Content1", "Content2"].map((item) => (
            <div className="col-span-2" key={item}>
              <label className="font-semibold">{item}</label>
              <textarea
                name={item}
                value={form[item] || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                rows={3}
              />
            </div>
          ))}

          <button className="bg-blue-600 text-white p-2 col-span-2 rounded">
            Update Web Design
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

export default function EditIosDevelopment() {
  const [form, setForm] = useState({
    Title: "",
    Description: "",
    Term1: "",
    Term2: "",
    Term3: "",
    Term4: "",
    Term5: "",
    Term6: "",
    Description1: "",
    Description2: "",
    Description3: "",
    Description4: "",
    Description5: "",
    Description6: "",
    Why_Ios1: "",
    Why_Ios2: "",
    Why_Ios3: "",
    Why_Ios4: "",
    Service1: "",
    Service2: "",
    Service3: "",
    Service4: "",
  });

  const [oldImage, setOldImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const imageRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/iosdevelopment/edit")
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

    const response = await fetch(
      "http://localhost:5000/api/iosdevelopment/update",
      {
        method: "POST",
        body: fd,
      }
    );

    await response.json();
    alert("Updated Successfully!");
    navigate("/dashboard/view-iosdevelopment");
  };

  return (
    <DashboardLayout>
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-4">Edit Android Development</h2>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* TITLE */}
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

          {/* DESCRIPTION */}
          <div className="col-span-2">
            <label className="font-semibold">Description</label>
            <textarea
              name="Description"
              value={form.Description}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          {/* IMAGE */}
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

          {/* TERM + DESCRIPTION PAIRED */}
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div className="col-span-2 grid grid-cols-2 gap-4" key={num}>
              {/* TERM */}
              <div>
                <label className="font-semibold">Term{num}</label>
                <input
                  type="text"
                  name={`Term${num}`}
                  value={form[`Term${num}`] || ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="font-semibold">Description{num}</label>
                <textarea
                  name={`Description${num}`}
                  value={form[`Description${num}`] || ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  rows={2}
                />
              </div>
            </div>
          ))}

          {/* WHY ANDROID */}
          {[1, 2, 3, 4].map((num) => (
            <div key={num}>
              <label className="font-semibold">Why_Android{num}</label>
              <input
                type="text"
                name={`Why_Ios${num}`}
                value={form[`Why_Ios${num}`] || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
          ))}

          {/* SERVICES */}
          {[1, 2, 3, 4].map((num) => (
            <div key={num}>
              <label className="font-semibold">Service{num}</label>
              <input
                type="text"
                name={`Service${num}`}
                value={form[`Service${num}`] || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
          ))}

          <button className="bg-blue-600 text-white p-2 col-span-2 rounded">
            Update Android Development
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

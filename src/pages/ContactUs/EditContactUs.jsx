import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";

export default function EditContactUs() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Title, setTitle] = useState("");
  const [Sub_Title, setSubTitle] = useState("");
  const [Image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/contactus")
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.Title);
        setSubTitle(data.Sub_Title);
        setPreview(`http://localhost:5000/uploads/${data.Image}`);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("Title", Title);
    form.append("Sub_Title", Sub_Title);
    if (Image) form.append("image", Image);

    await fetch(`http://localhost:5000/api/contactus/update/${id}`, {
      method: "PUT",
      body: form,
    });

    navigate("/dashboard/contact-us");
  };

  return (
    <DashboardLayout>
      <div className="p-5 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Sub Title"
            className="w-full p-2 border rounded"
            value={Sub_Title}
            onChange={(e) => setSubTitle(e.target.value)}
          ></textarea>

          <input
            type="file"
            className="w-full p-2 border rounded"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {preview && (
            <img src={preview} className="w-32 h-32 object-cover rounded" />
          )}

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

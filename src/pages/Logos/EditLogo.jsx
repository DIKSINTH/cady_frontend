import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

export default function EditLogo() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/logos/${id}`)
      .then((res) => res.json())
      .then((data) => setPreview(`http://localhost:5000/uploads/${data.logo}`));
  }, [id]);

  const updateLogo = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append("logo", image);

    fetch(`http://localhost:5000/api/logos/update/${id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        alert("Logo Updated");
        window.location.href = "/dashboard/view-logos";
      });
  };

  return (
    <DashboardLayout>
      <div className="p-6 flex justify-center">
        <form
          onSubmit={updateLogo}
          className="bg-white p-6 rounded shadow w-96"
        >
          <h2 className="text-xl font-bold mb-4">Edit Logo</h2>

          <img src={preview} className="h-24 mx-auto mb-4" />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-4"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Update
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

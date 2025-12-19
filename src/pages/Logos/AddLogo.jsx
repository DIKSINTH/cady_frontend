import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";

export default function AddLogo() {
  const [image, setImage] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("logo", image);

    fetch("http://localhost:5000/api/logos/add", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        alert("Logo Added Successfully");
        window.location.href = "/dashboard/view-logos";
      });
  };

  return (
    <DashboardLayout>
      <div className="p-6 flex justify-center">
        <form
          onSubmit={submitForm}
          className="bg-white p-6 rounded shadow w-96"
        >
          <h2 className="text-xl font-bold mb-4">Add New Logo</h2>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-4"
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
            Submit
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

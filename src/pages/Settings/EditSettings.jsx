import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function EditSettings() {
  const [form, setForm] = useState({
    Address: "",
    Mobile_Number: "",
    Email: "",
    Facebook_URL: "",
    Instagram_URL: "",
    LinkedIn_URL: "",
    Skype_URL: "",
    Google_Map: "",
    Whatsapp: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setForm({
          Address: data.Address || "",
          Mobile_Number: data.Mobile_Number || "",
          Email: data.Email || "",
          Facebook_URL: data.Facebook_URL || "",
          Instagram_URL: data.Instagram_URL || "",
          LinkedIn_URL: data.LinkedIn_URL || "",
          Skype_URL: data.Skype_URL || "",
          Google_Map: data.Google_Map || "",
          Whatsapp: data.Whatsapp || "",
        });
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateSettings = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    navigate("/dashboard/view-settings");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-5">Edit Settings</h1>

      <form
        onSubmit={updateSettings}
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
              rows="2"
            />
          </div>
        ))}

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </DashboardLayout>
  );
}

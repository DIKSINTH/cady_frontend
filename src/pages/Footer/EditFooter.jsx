import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function EditFooter() {
  const [form, setForm] = useState({
    Content: "",
    Item1: "",
    Item2: "",
    Item3: "",
    Item4: "",
    Item5: "",
    Item6: "",
    Item7: "",
    Item8: "",
    Item9: "",
    Item10: "",
    Item11: "",
    Item12: "",
    Item13: "",
    Item14: "",
    Item15: "",
    Item16: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/footer")
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateFooter = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/footer", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    navigate("/dashboard/view-footer");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-5">Edit Footer</h1>

      <form
        onSubmit={updateFooter}
        className="bg-white shadow p-5 rounded-lg space-y-4"
      >
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label className="font-semibold">{key}</label>
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

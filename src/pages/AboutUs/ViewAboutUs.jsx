import DashboardLayout from "../../layout/DashboardLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewAboutUs() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/aboutus")
      .then((res) => res.json())
      .then((data) => {
        setData(data || {});
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <DashboardLayout>Loading...</DashboardLayout>;
  if (error)
    return <DashboardLayout>Error: {error.toString()}</DashboardLayout>;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-5">About Us</h1>
      <div className="bg-white shadow rounded-lg p-5 space-y-4">
        {Object.entries(data).map(([key, value]) =>
          key !== "Image" ? (
            <Info key={key} label={key.replace("_", " ")} value={value} />
          ) : null
        )}
        {data.Image && (
          <img
            src={`http://localhost:5000${data.Image}`}
            alt="About Us"
            className="max-w-sm rounded"
          />
        )}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/dashboard/about-us/edit")}
        >
          ✏ Edit
        </button>
      </div>
    </DashboardLayout>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <h2 className="font-semibold">{label}</h2>
      <p>{value || "—"}</p>
    </div>
  );
}

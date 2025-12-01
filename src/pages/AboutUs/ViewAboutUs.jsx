import DashboardLayout from "../../layout/DashboardLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewAboutUs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/aboutus")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch About Us");
        return res.json();
      })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <DashboardLayout>Loading...</DashboardLayout>;
  if (error) return <DashboardLayout>Error: {error}</DashboardLayout>;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-5">About Us</h1>

      <div className="bg-white shadow rounded-lg p-5 space-y-4">
        <Info label="Description" value={data.description} />
        <Info label="Scroll Content" value={data.scrollContent} />

        {data.image && (
          <div>
            <h2 className="font-semibold text-lg">Image:</h2>
            <img src={data.image} alt="About Us" className="max-w-sm" />
          </div>
        )}

        {/* EXTRA FIELDS */}
        <Info label="About" value={data.About} />
        <Info label="Vision" value={data.Vision} />
        <Info label="Mission" value={data.Mission} />

        <Info label="Value 1" value={data.value1} />
        <Info label="Value 2" value={data.value2} />
        <Info label="Value 3" value={data.value3} />
        <Info label="Value 4" value={data.value4} />

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
      <h2 className="font-semibold text-lg">{label}:</h2>
      <p>{value}</p>
    </div>
  );
}

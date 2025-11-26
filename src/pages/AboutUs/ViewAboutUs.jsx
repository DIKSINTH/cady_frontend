import DashboardLayout from "../../layout/DashboardLayout";
import { useState, useEffect } from "react";

export default function ViewAboutUs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/aboutus")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch About Us content");
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
        <div>
          <h2 className="font-semibold text-lg">Description:</h2>
          <p>{data.description}</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Scroll Content:</h2>
          <p>{data.scrollContent}</p>
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => alert("Edit functionality coming soon")}
        >
          ✏ Edit
        </button>
      </div>
    </DashboardLayout>
  );
}

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
  if (error) return <DashboardLayout>Error: {error}</DashboardLayout>;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-5">AboutUs</h1>

      <div className="bg-white shadow rounded-lg p-5 overflow-x-auto">
        <table className="w-full border text-center">
          <thead>
            <tr className="border-b text-lg font-semibold">
              <th className="py-3 border-r w-12">#</th>
              <th className="py-3 border-r">Description</th>
              <th className="py-3 border-r">Scroll Content</th>
              <th className="py-3 border-r">Image</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-4 border-r">1</td>

              <td className="py-4 border-r px-4">{data.Description || "—"}</td>

              <td className="py-4 border-r px-4">
                {data.Scroll_Content || "—"}
              </td>

              <td className="py-4 border-r px-4">
                {data.Image ? (
                  <img
                    src={`http://localhost:5000${data.Image}`}
                    alt="About"
                    className="w-28 rounded mx-auto"
                  />
                ) : (
                  "—"
                )}
              </td>

              <td className="py-4">
                <button
                  className="text-blue-600 hover:text-blue-800 text-xl"
                  onClick={() => navigate("/dashboard/about-us/edit")}
                >
                  ✏
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

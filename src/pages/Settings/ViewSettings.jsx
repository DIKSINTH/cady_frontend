import DashboardLayout from "../../layout/DashboardLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewSettings() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/settings")
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
      <h1 className="text-3xl font-bold mb-5">Settings</h1>

      <div className="bg-white shadow rounded-lg p-5 overflow-x-auto">
        <table className="w-full border text-center">
          <thead>
            <tr className="border-b text-lg font-semibold">
              <th className="py-3 border-r w-12">#</th>
              <th className="py-3 border-r">Address</th>
              <th className="py-3 border-r">Mobile Number</th>
              <th className="py-3 border-r">Email</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-4 border-r">1</td>
              <td className="py-4 border-r px-4">{data.Address || "—"}</td>
              <td className="py-4 border-r px-4">
                {data.Mobile_Number || "—"}
              </td>
              <td className="py-4 border-r px-4">{data.Email || "—"}</td>

              <td className="py-4">
                <button
                  className="text-blue-600 hover:text-blue-800 text-xl"
                  onClick={() => navigate("/dashboard/view-settings/edit")}
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

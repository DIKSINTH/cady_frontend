import DashboardLayout from "../../layout/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewFooter() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/footer")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <DashboardLayout>Loading…</DashboardLayout>;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-5">Footer</h1>

      <div className="bg-white shadow rounded-lg p-5 overflow-x-auto">
        <table className="w-full border text-center">
          <thead>
            <tr className="border-b font-semibold text-lg">
              <th className="py-3 border-r w-12">ID</th>
              <th className="py-3 border-r">Description</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-4 border-r">1</td>
              <td className="py-4 border-r px-4">{data.Content || "—"}</td>
              <td className="py-4">
                <button
                  className="text-blue-600 hover:text-blue-800 text-xl"
                  onClick={() => navigate("/dashboard/view-footer/edit")}
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

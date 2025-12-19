import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

export default function ViewCrossPlatform() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/crossplatform")
      .then((res) => res.json())
      .then((res) => setData(res || null))
      .catch((err) => console.log(err));
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Cross Platform Development</h1>

      <div className="bg-white p-5 shadow rounded-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Image</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {data && (
              <tr className="border-b">
                <td className="p-3">1</td>
                <td className="p-3">{data.Title}</td>
                <td className="p-3">{data.Description}</td>
                <td className="p-3">
                  {data.Image && (
                    <img
                      src={`http://localhost:5000/uploads/${data.Image}`}
                      alt="iOS Development"
                      className="w-24 rounded shadow"
                    />
                  )}
                </td>
                <td className="p-3">
                  <Link
                    to="/dashboard/view-crossplatform/edit"
                    className="text-blue-500 underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

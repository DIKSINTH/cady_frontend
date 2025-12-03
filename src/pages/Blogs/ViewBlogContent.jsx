import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ViewBlogContent() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/blogcontent")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <DashboardLayout>Loading...</DashboardLayout>;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-5">Blog Content</h1>

      <div className="bg-white shadow-md p-4 rounded">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Image</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">{data.Heading}</td>
              <td className="p-2">{data.Content}</td>
              <td className="p-2">
                {data.Image ? (
                  <img
                    src={`http://localhost:5000/uploads/${data.Image}`}
                    className="w-20 h-20 object-cover"
                    alt="blog"
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td className="p-2">
                <FiEdit2
                  className="cursor-pointer text-blue-500"
                  onClick={() => navigate("/dashboard/view-blogcontent/edit")}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

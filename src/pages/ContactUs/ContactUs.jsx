import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/contactus")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

        {data && (
          <table className="w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="p-3">#</th>
                <th className="p-3">Title</th>
                <th className="p-3">Sub Title</th>
                <th className="p-3">Image</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-3">1</td>
                <td className="p-3">{data.Title}</td>
                <td className="p-3">{data.Sub_Title}</td>
                <td className="p-3">
                  {data.Image && (
                    <img
                      src={`http://localhost:5000/uploads/${data.Image}`}
                      className="w-20 h-20 object-cover rounded"
                      alt="contact"
                    />
                  )}
                </td>
                <td className="p-3">
                  <button
                    className="text-blue-600 underline"
                    onClick={() =>
                      navigate(`/dashboard/contact-us/edit/${data.id}`)
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}

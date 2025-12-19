import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function ViewFacts() {
  const [facts, setFacts] = useState([]);
  const navigate = useNavigate();

  const loadFacts = () => {
    fetch("http://localhost:5000/api/facts")
      .then((res) => res.json())
      .then((data) => setFacts(data));
  };

  useEffect(() => {
    loadFacts();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Facts</h2>

        <table className="w-full border rounded shadow bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 w-10">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Count</th>
              <th className="p-3">Image</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {facts.map((fact, i) => (
              <tr key={fact.id} className="border-b">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{fact.Name}</td>
                <td className="p-3">{fact.Count}</td>

                <td className="p-3">
                  <img
                    src={`http://localhost:5000/uploads/${fact.Image}`}
                    className="h-16 object-contain"
                  />
                </td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/view-facts/edit/${fact.id}`)
                    }
                    className="text-blue-600"
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

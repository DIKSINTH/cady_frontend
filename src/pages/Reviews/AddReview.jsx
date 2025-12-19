import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function AddReview() {
  const [Name, setName] = useState("");
  const [Review, setReview] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Name, Review }),
    });

    if (res.ok) {
      alert("Review Added Successfully!");
      navigate("/dashboard/view-reviews");
    } else {
      alert("Error adding review!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Review</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Review Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <textarea
            placeholder="Write Review..."
            value={Review}
            onChange={(e) => setReview(e.target.value)}
            className="border p-2 w-full rounded h-32"
            required
          ></textarea>

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Review
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

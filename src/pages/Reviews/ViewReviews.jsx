import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ViewReviews() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const loadReviews = () => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error loading reviews:", err));
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Review deleted successfully!");
      loadReviews();
    } else {
      alert("Failed to delete review!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">View Reviews</h1>

          <button
            onClick={() => navigate("/dashboard/view-reviews/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Review
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 border-r">ID</th>
                <th className="py-2 px-4 border-r">Name</th>
                <th className="py-2 px-4 border-r">Review</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <tr key={review.id} className="border-b">
                    <td className="py-2 px-4 border-r">{review.id}</td>
                    <td className="py-2 px-4 border-r">{review.Name}</td>
                    <td className="py-2 px-4 border-r">{review.Review}</td>

                    <td className="py-2 px-4 flex gap-3 justify-center">
                      <FiEdit2
                        className="text-blue-600 cursor-pointer"
                        onClick={() =>
                          navigate(`/dashboard/view-reviews/edit/${review.id}`)
                        }
                      />

                      <FiTrash2
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteReview(review.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No reviews found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

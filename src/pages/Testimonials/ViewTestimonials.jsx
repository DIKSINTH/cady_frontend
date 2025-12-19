import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ViewTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  const loadTestimonials = () => {
    fetch("http://localhost:5000/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error loading testimonials:", err));
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const deleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;

    const res = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Testimonial deleted successfully!");
      loadTestimonials();
    } else {
      alert("Failed to delete testimonial!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">View Testimonials</h1>

          <button
            onClick={() => navigate("/dashboard/view-testimonials/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Testimonial
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 border-r">ID</th>
                <th className="py-2 px-4 border-r">Name</th>
                <th className="py-2 px-4 border-r">Position</th>
                <th className="py-2 px-4 border-r">Description</th>
                <th className="py-2 px-4 border-r">Image</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {testimonials.length > 0 ? (
                testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="border-b">
                    <td className="py-2 px-4 border-r">{testimonial.id}</td>
                    <td className="py-2 px-4 border-r">{testimonial.name}</td>
                    <td className="py-2 px-4 border-r">
                      {testimonial.position}
                    </td>
                    <td
                      className="py-2 px-4 border-r"
                      dangerouslySetInnerHTML={{
                        __html: testimonial.description,
                      }}
                    />
                    <td className="py-2 px-4 border-r">
                      {testimonial.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${testimonial.image}`}
                          alt="Testimonial"
                          className="w-20 h-20 object-cover rounded"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className="py-2 px-4 flex gap-3 justify-center">
                      <FiEdit2
                        className="text-blue-600 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/dashboard/view-testimonials/edit/${testimonial.id}`
                          )
                        }
                      />
                      <FiTrash2
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteTestimonial(testimonial.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No testimonials found
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

import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ViewBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const loadBlogs = () => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error loading blogs:", err));
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Blog deleted successfully!");
      loadBlogs();
    } else {
      alert("Failed to delete blog!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">View Blogs</h1>

          <button
            onClick={() => navigate("/dashboard/view-blogs/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Blog
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 border-r">ID</th>
                <th className="py-2 px-4 border-r">Name</th>
                <th className="py-2 px-4 border-r">Description</th>
                <th className="py-2 px-4 border-r">Image</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog.id} className="border-b">
                    <td className="py-2 px-4 border-r">{blog.id}</td>
                    <td className="py-2 px-4 border-r">{blog.Name}</td>

                    {/* Render HTML safely */}
                    <td
                      className="py-2 px-4 border-r"
                      dangerouslySetInnerHTML={{ __html: blog.Description }}
                    ></td>

                    <td className="py-2 px-4 border-r">
                      {blog.Image ? (
                        <img
                          src={`http://localhost:5000/uploads/${blog.Image}`}
                          alt="Blog"
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
                          navigate(`/dashboard/view-blogs/edit/${blog.id}`)
                        }
                      />

                      <FiTrash2
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteBlog(blog.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No blogs found
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

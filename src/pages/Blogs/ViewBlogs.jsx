import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { FiEdit2, FiTrash2, FiPlus, FiImage, FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api.js";

export default function ViewBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const loadBlogs = () => {
    fetch(`${API_BASE}/api/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error loading blogs:", err));
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadBlogs();
    } else {
      alert("Failed to delete blog!");
    }
  };

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-slate-500 mt-1">
            Manage your articles, news, and company updates.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/view-blogs/add")}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95 w-fit"
        >
          <FiPlus size={20} /> Add New Blog
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">
                  #
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Post Details
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-6 text-sm text-slate-400 text-center font-medium">
                      {index + 1}
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        {/* Blog Image */}
                        <div className="h-14 w-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0">
                          {blog.Image ? (
                            <img
                              src={`${API_BASE}/uploads/${blog.Image}`}
                              alt="Blog"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-slate-300">
                              <FiImage size={20} />
                            </div>
                          )}
                        </div>
                        {/* Blog Title */}
                        <div className="max-w-[200px]">
                          <p
                            className="text-sm font-bold text-slate-900 truncate"
                            title={blog.Name}
                          >
                            {blog.Name}
                          </p>
                          <p className="text-xs text-blue-600 font-medium">
                            Article ID: #{blog.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div
                        className="text-sm text-slate-500 line-clamp-2 max-w-md leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blog.Description }}
                      ></div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex justify-center gap-2">
                        <button
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all group"
                          onClick={() =>
                            navigate(`/dashboard/view-blogs/edit/${blog.id}`)
                          }
                          title="Edit Post"
                        >
                          <FiEdit2
                            size={18}
                            className="group-hover:scale-110 transition-transform"
                          />
                        </button>

                        <button
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all group"
                          onClick={() => deleteBlog(blog.id)}
                          title="Delete Post"
                        >
                          <FiTrash2
                            size={18}
                            className="group-hover:scale-110 transition-transform"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-16 text-center text-slate-400"
                  >
                    <FiFileText size={40} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm">No blog posts found.</p>
                    <button
                      onClick={() => navigate("/dashboard/view-blogs/add")}
                      className="mt-3 text-blue-600 text-sm font-semibold hover:underline"
                    >
                      Create your first post
                    </button>
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

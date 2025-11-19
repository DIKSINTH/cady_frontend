import React, { useState } from "react";

export default function BlogForm() {
  const [blogHeading, setBlogHeading] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blogHeading || !blogContent) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append("blogHeading", blogHeading);
    formData.append("blogContent", blogContent);
    if (blogImage) formData.append("blogImage", blogImage);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/admin", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create blog");

      const data = await res.json();
      alert("Blog Created Successfully!");
      console.log(data);
      alert("Blog Created Successfully!");
      console.log(res.data);
      setBlogHeading("");
      setBlogImage(null);
      setBlogContent("");
    } catch (err) {
      alert("Error while creating blog");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create Blog
        </h2>

        {/* Blog Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Blog Name
          </label>
          <input
            type="text"
            value={blogHeading}
            onChange={(e) => setBlogHeading(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:ring focus:ring-blue-300 outline-none"
            placeholder="Enter blog name"
          />
        </div>

        {/* Blog Image */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Blog Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBlogImage(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-xl bg-white cursor-pointer"
          />
        </div>

        {/* Blog Content (Mini MS Word) */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Blog Content
          </label>
          <textarea
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            rows="8"
            className="w-full p-3 border rounded-xl focus:ring focus:ring-blue-300 outline-none resize-none bg-white shadow-inner"
            placeholder="Write your blog content here..."
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}

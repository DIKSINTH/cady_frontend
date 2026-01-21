import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../../config/api.js";

const API_URL = `${API_BASE}/api/blog-lists`;

// ✅ Image helper
const getImagePath = (filename) => {
  if (!filename) return "";
  return `${API_BASE}/uploads/${filename}`;
};

// --- Single Blog Card ---
const BlogCard = ({ post }) => {
  const imageUrl = getImagePath(post.image_url);

  return (
    <Link to={`/blog/${post.id}`} target="_blank" rel="noopener noreferrer">
      <div className="flex flex-col rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-xl w-full cursor-pointer">
        {/* Image */}
        <div className="w-full bg-gray-200">
          <img
            src={imageUrl}
            alt={post.name}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Title */}
        <div className="p-5 bg-white text-center">
          <h3 className="text-lg font-semibold text-gray-800">{post.name}</h3>
        </div>
      </div>
    </Link>
  );
};

const BlogLists = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="py-20 text-center">Loading blogs...</div>;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default BlogLists;

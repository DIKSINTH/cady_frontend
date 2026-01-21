import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config/api";
const API_URL = `${API_BASE}/api/blog-lists`;

// Helper function to get backend image path
const getImagePath = (filename) => {
  if (!filename) return "";
  return `${API_BASE}/uploads/${filename}`;
};

// --- Single Blog Card ---
const BlogCard = ({ post }) => {
  const imageUrl = getImagePath(post.image_url);

  return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-xl w-full">
      {/* Blog Image */}
      <div className="relative w-full bg-gray-200">
        <img
          src={imageUrl}
          alt={post.name}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Blog Content */}
      <div className="p-4 md:p-6 bg-white flex flex-col justify-between flex-grow items-center text-center">
        {/* Name */}
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
          {post.name}
        </h3>

        {/* Read More (ONLY THIS CLICKS) */}
        <Link
          to={`/blog/${post.id}`}
          className="text-indigo-600 font-semibold hover:text-[#3498db] underline underline-offset-4 transition duration-150"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

// --- Main Blogs Section ---
const BlogLists = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setBlogs(data);
        setIsLoading(false);
      } catch (e) {
        console.error("Fetch error:", e);
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="py-20 flex justify-center text-gray-700">
        Loading recent blogs...
      </div>
    );

  if (error)
    return (
      <div className="py-20 flex justify-center text-red-500">
        Error loading data: {error}
      </div>
    );

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Recent Blogs
          </h2>
          <div className="w-12 h-1 cady mx-auto mt-3"></div>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {blogs.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-12">
          <button className="px-6 py-3 cady text-white font-semibold rounded-lg shadow-md hover:bg-[#3498db]-300 transition">
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogLists;

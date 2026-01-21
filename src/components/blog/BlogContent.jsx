import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api.js";
const API_URL = `${API_BASE}/api/blog-contents`;
const LIKE_EXPIRY_DAYS = 365;

// Helper: image path (IMPORTANT FIX)
const getImagePath = (filename) => {
  if (!filename) return "";
  return `${API_BASE}/uploads/${filename}`;
};

// Helper: get stored like data safely
const getStoredLikeData = (id) => {
  try {
    const data = localStorage.getItem(`blog-like-${id}`);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

// Helper: set stored like data
const setStoredLikeData = (id, likes) => {
  localStorage.setItem(
    `blog-like-${id}`,
    JSON.stringify({
      likes,
      lastLiked: Date.now(),
    })
  );
};

// Helper: format countdown
const formatTimeLeft = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${days}d ${hours}h ${minutes}m`;
};

const BlogContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const pageUrl = window.location.href;

  // Fetch blog & restore like state
  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      });

    const stored = getStoredLikeData(id);

    if (stored) {
      const storedLikes = typeof stored.likes === "number" ? stored.likes : 0;

      setLikes(storedLikes);

      const expiryMs = LIKE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      const elapsed = Date.now() - stored.lastLiked;

      if (elapsed < expiryMs) {
        setLiked(true);
        setTimeLeft(formatTimeLeft(expiryMs - elapsed));
      }
    }
  }, [id]);

  // ⏳ Countdown Timer
  useEffect(() => {
    if (!liked) return;

    const interval = setInterval(() => {
      const stored = getStoredLikeData(id);
      if (!stored) return;

      const expiryMs = LIKE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      const elapsed = Date.now() - stored.lastLiked;
      const remaining = expiryMs - elapsed;

      if (remaining <= 0) {
        setLiked(false);
        setTimeLeft("");
        clearInterval(interval);
      } else {
        setTimeLeft(formatTimeLeft(remaining));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [liked, id]);

  // Like handler
  const handleLike = () => {
    if (liked) return;

    const newLikes = likes + 1;
    setLikes(newLikes);
    setLiked(true);
    setStoredLikeData(id, newLikes);

    const expiryMs = LIKE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    setTimeLeft(formatTimeLeft(expiryMs));
  };

  if (loading) {
    return <div className="py-20 text-center bg-cyan-50">Loading blog...</div>;
  }

  return (
    <section className="py-16 bg-cyan-50 min-h-screen">
      {/* 🔙 EXIT / BACK BUTTON (FIXED ON SCROLL) */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-45 left-4 z-50 bg-white shadow-md rounded-full p-3 hover:bg-gray-100 transition"
        title="Go Back"
      >
        <i className="fas fa-arrow-left text-gray-700"></i>
      </button>

      <div className="max-w-4xl mx-auto px-4">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
          {blog.name}
        </h1>

        {/* Image */}
        {blog.image && (
          <img
            src={getImagePath(blog.image)}
            alt={blog.name}
            className="w-full max-h-[400px] object-contain mx-auto mb-8"
          />
        )}

        {/* Content */}
        <div
          className="text-gray-700 text-lg leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* SHARE & LIKE */}
        <div className="mt-12 pt-6 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Share */}
          <div className="text-center md:text-left">
            <p className="font-semibold mb-3">Share to your social media</p>
            <div className="flex justify-center md:justify-start gap-4 cady-text text-2xl">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${pageUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(pageUrl)}
                title="Copy link"
              >
                <i className="fas fa-link"></i>
              </button>
            </div>
          </div>

          {/* Like */}
          <div className="text-center md:text-right">
            <p className="font-semibold mb-2">
              Give us a Like… It costs Nothing
            </p>

            {liked && timeLeft && (
              <p className="text-sm text-gray-500 mb-2">
                ⏳ You can like again in <b>{timeLeft}</b>
              </p>
            )}

            <button
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-white ${
                liked
                  ? "bg-gray-400 cursor-not-allowed"
                  : "cady hover:bg-[#3498db]-700"
              }`}
            >
              <i className="fas fa-thumbs-up"></i>
              <span>{likes}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogContent;

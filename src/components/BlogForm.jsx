import React, { useState, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Image Tools
import ImageResize from "quill-image-resize-module-react";
import { ImageDrop } from "quill-image-drop-module";

// Register Stable Modules
Quill.register("modules/imageResize", ImageResize.default || ImageResize);
Quill.register("modules/imageDrop", ImageDrop);

export default function BlogForm() {
  const [blogHeading, setBlogHeading] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(false);

  const quillRef = useRef(null);

  // Floating Toolbar
  const [showFloatToolbar, setShowFloatToolbar] = useState(false);
  const [floatPos, setFloatPos] = useState({ top: 0, left: 0 });

  const handleSelection = () => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection();
    if (range && range.length > 0) {
      const bounds = quill.getBounds(range.index);
      setFloatPos({ top: bounds.top - 50, left: bounds.left + 40 });
      setShowFloatToolbar(true);
    } else {
      setShowFloatToolbar(false);
    }
  };

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    quill.on("selection-change", handleSelection);
  }, []);

  // Toolbar + modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
    imageDrop: true,
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

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

      alert("Blog Created Successfully!");

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
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-7xl bg-white shadow-xl rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Create Blog
        </h2>

        {/* Blog Heading */}
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

        {/* Editor */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700">
            Blog Content Editor
          </label>

          {/* Floating Toolbar */}
          {showFloatToolbar && (
            <div
              style={{
                position: "absolute",
                top: floatPos.top,
                left: floatPos.left,
                zIndex: 50,
              }}
              className="bg-white shadow-lg p-2 rounded-xl border flex gap-3"
            >
              <button
                onClick={() =>
                  quillRef.current.getEditor().format("bold", true)
                }
                className="px-2 font-bold hover:bg-gray-200 rounded"
              >
                B
              </button>
              <button
                onClick={() =>
                  quillRef.current.getEditor().format("italic", true)
                }
                className="px-2 italic hover:bg-gray-200 rounded"
              >
                I
              </button>

              <input
                type="color"
                onChange={(e) =>
                  quillRef.current.getEditor().format("color", e.target.value)
                }
                className="w-8 h-8 rounded cursor-pointer"
              />
            </div>
          )}

          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={blogContent}
            onChange={setBlogContent}
            modules={modules}
            formats={formats}
            className="bg-white rounded-xl shadow-inner w-full"
            style={{ height: "550px", marginBottom: "80px" }}
          />
        </div>

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

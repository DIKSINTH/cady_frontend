import React, { useState, useRef, useEffect } from "react";

export default function BlogForm() {
  const quillRef = useRef(null);

  const [ReactQuillComponent, setReactQuillComponent] = useState(null);
  const [QuillInstance, setQuillInstance] = useState(null);

  const [modules, setModules] = useState(null);
  const [formats, setFormats] = useState(null);

  const [blogHeading, setBlogHeading] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Floating toolbar
  const [showFloatToolbar, setShowFloatToolbar] = useState(false);
  const [floatPos, setFloatPos] = useState({ top: 0, left: 0 });

  // Load all Quill modules safely
  useEffect(() => {
    async function load() {
      const { default: RQ, Quill } = await import("react-quill-new");

      const ImageResize = (await import("quill-image-resize-module")).default;
      const ImageDrop = (await import("quill-image-drop-module")).default;

      Quill.register("modules/imageResize", ImageResize);
      Quill.register("modules/imageDrop", ImageDrop);

      setReactQuillComponent(() => RQ);
      setQuillInstance(() => Quill);

      setModules({
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["link", "image", "video"],
          ["clean"],
        ],
        imageResize: true,
        imageDrop: true,
      });

      setFormats([
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "color",
        "align",
        "blockquote",
        "code-block",
        "link",
        "image",
        "video",
      ]);
    }

    load();
  }, []);

  // Floating selection-popup
  const handleSelection = () => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const range = editor.getSelection();
    if (range && range.length > 0) {
      const bounds = editor.getBounds(range.index);
      setFloatPos({ top: bounds.top - 50, left: bounds.left + 40 });
      setShowFloatToolbar(true);
    } else {
      setShowFloatToolbar(false);
    }
  };

  useEffect(() => {
    if (!ReactQuillComponent || !modules) return;

    const editor = quillRef.current?.getEditor();
    if (editor) editor.on("selection-change", handleSelection);
  }, [modules, ReactQuillComponent]);

  // Submit
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
      console.error(err);
      alert("Error while creating blog");
    } finally {
      setLoading(false);
    }
  };

  // 🟥 If still loading → show loading
  if (!ReactQuillComponent || !modules)
    return <p className="text-center mt-10">Loading editor…</p>;

  const ReactQuill = ReactQuillComponent;

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
            className="w-full px-4 py-2 border rounded-xl"
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
            className="w-full px-4 py-2 border rounded-xl cursor-pointer"
          />
        </div>

        {/* Editor */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700">
            Blog Content Editor
          </label>

          {/* Floating toolbar */}
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
                  quillRef.current?.getEditor().format("bold", true)
                }
                className="px-2 font-bold hover:bg-gray-200 rounded"
              >
                B
              </button>
              <button
                onClick={() =>
                  quillRef.current?.getEditor().format("italic", true)
                }
                className="px-2 italic hover:bg-gray-200 rounded"
              >
                I
              </button>

              <input
                type="color"
                onChange={(e) =>
                  quillRef.current?.getEditor().format("color", e.target.value)
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
            className="bg-white rounded-xl shadow-inner"
            style={{ height: "550px", marginBottom: "80px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}

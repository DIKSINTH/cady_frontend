import React, { useState, useRef } from "react";

export default function BlogForm() {
  const [blogHeading, setBlogHeading] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);

  // Handle alignment for images & text
  const alignImage = (alignment) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let node = range.startContainer;

    // If clicked inside text + then selecting image → move up until IMG found
    if (node.nodeType === 3) node = node.parentNode;

    if (node.tagName === "IMG") {
      // Wrap image in a <div> container for alignment
      const wrapper = document.createElement("div");
      wrapper.style.textAlign = alignment;
      wrapper.style.width = "100%";

      node.replaceWith(wrapper);
      wrapper.appendChild(node);
    } else {
      document.execCommand(
        alignment === "left"
          ? "justifyLeft"
          : alignment === "center"
          ? "justifyCenter"
          : alignment === "right"
          ? "justifyRight"
          : "justifyFull",
        false,
        null
      );
    }
  };

  const execCommand = (command, value = null) => {
    if (
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"].includes(
        command
      )
    ) {
      const map = {
        justifyLeft: "left",
        justifyCenter: "center",
        justifyRight: "right",
        justifyFull: "justify",
      };
      return alignImage(map[command]);
    }
    document.execCommand(command, false, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = editorRef.current.innerHTML;
    if (!blogHeading || !content || content === "<br>") {
      return alert("Please fill all fields");
    }

    const formData = new FormData();
    formData.append("blogHeading", blogHeading);
    formData.append("blogContent", content);
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
      editorRef.current.innerHTML = "";
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
        className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
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
            Blog Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBlogImage(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-xl bg-white cursor-pointer"
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            type="button"
            onClick={() => execCommand("bold")}
            className="px-2 py-1 border rounded"
          >
            B
          </button>

          <button
            type="button"
            onClick={() => execCommand("strikeThrough")}
            className="px-2 py-1 border rounded"
          >
            S
          </button>

          <button
            type="button"
            onClick={() => {
              const color = prompt("Enter color name or hex:");
              execCommand("foreColor", color);
            }}
            className="px-2 py-1 border rounded"
          >
            Color
          </button>

          <button
            type="button"
            onClick={() => {
              const size = prompt("Enter font size (1-7):");
              execCommand("fontSize", size);
            }}
            className="px-2 py-1 border rounded"
          >
            Size
          </button>

          {/* Align Buttons (Fixed for images!) */}
          <button
            type="button"
            onClick={() => execCommand("justifyLeft")}
            className="px-2 py-1 border rounded"
          >
            Left
          </button>
          <button
            type="button"
            onClick={() => execCommand("justifyCenter")}
            className="px-2 py-1 border rounded"
          >
            Center
          </button>
          <button
            type="button"
            onClick={() => execCommand("justifyRight")}
            className="px-2 py-1 border rounded"
          >
            Right
          </button>
          <button
            type="button"
            onClick={() => execCommand("justifyFull")}
            className="px-2 py-1 border rounded"
          >
            Justify
          </button>

          {/* Add Image to Editor */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onload = (event) => {
                const img = document.createElement("img");
                img.src = event.target.result;
                img.style.maxWidth = "100%";
                img.style.height = "auto";
                img.style.cursor = "pointer";

                // Resize Logic
                let startX, startY, startWidth, startHeight;
                img.addEventListener("mousedown", (e) => {
                  e.preventDefault();
                  startX = e.clientX;
                  startY = e.clientY;
                  startWidth = img.width;
                  startHeight = img.height;

                  const doResize = (ev) => {
                    img.width = startWidth + (ev.clientX - startX);
                    img.height = startHeight + (ev.clientY - startY);
                  };

                  const stopResize = () => {
                    window.removeEventListener("mousemove", doResize);
                    window.removeEventListener("mouseup", stopResize);
                  };

                  window.addEventListener("mousemove", doResize);
                  window.addEventListener("mouseup", stopResize);
                });

                editorRef.current.appendChild(img);
              };
              reader.readAsDataURL(file);
            }}
            className="px-2 py-1 border rounded"
          />
        </div>

        {/* Editable Content */}
        <div
          ref={editorRef}
          contentEditable
          className="w-full p-4 border rounded-xl min-h-[400px] bg-white shadow-inner"
        ></div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}

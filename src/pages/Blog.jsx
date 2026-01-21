import React from "react";
import Header from "../components/Header.jsx";
import WelcomeBlog from "../components/blog/WelcomeBlog.jsx";
import BlogLists from "../components/blog/BlogLists.jsx";
import FooterList from "../components/FooterList.jsx";

function Blog() {
  return (
    <div>
      <Header />
      <WelcomeBlog />
      <BlogLists />
      <FooterList />
    </div>
  );
}

export default Blog;

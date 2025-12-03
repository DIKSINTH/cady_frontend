import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ViewAboutUs from "./pages/AboutUs/ViewAboutUs.jsx";
import EditAboutUs from "./pages/AboutUs/EditAboutUs.jsx";
import ViewLogos from "./pages/Logos/ViewLogos.jsx";
import AddLogo from "./pages/Logos/AddLogo";
import EditLogo from "./pages/Logos/EditLogo";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import EditContactUs from "./pages/ContactUs/EditContactUs.jsx";
import ViewBlogs from "./pages/Blogs/ViewBlogs.jsx";
import AddBlog from "./pages/Blogs/AddBlog.jsx";
import EditBlog from "./pages/Blogs/EditBlog.jsx";
import ViewBlogContent from "./pages/Blogs/ViewBlogContent.jsx";
import EditBlogContent from "./pages/Blogs/EditBlogContent.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<LoginPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/dashboard/about-us" element={<ViewAboutUs />} />
        <Route path="/dashboard/about-us/edit" element={<EditAboutUs />} />

        <Route path="/dashboard/view-logos" element={<ViewLogos />} />
        <Route path="/dashboard/view-logos/add" element={<AddLogo />} />
        <Route path="/dashboard/view-logos/edit/:id" element={<EditLogo />} />

        <Route path="/dashboard/contact-us" element={<ContactUs />} />
        <Route
          path="/dashboard/contact-us/edit/:id"
          element={<EditContactUs />}
        />

        <Route path="/dashboard/view-blogs" element={<ViewBlogs />} />
        <Route path="/dashboard/view-blogs/add" element={<AddBlog />} />
        <Route path="/dashboard/view-blogs/edit/:id" element={<EditBlog />} />

        {/* Single Blog Content */}
        <Route
          path="/dashboard/view-blogcontent"
          element={<ViewBlogContent />}
        />
        <Route
          path="/dashboard/view-blogcontent/edit"
          element={<EditBlogContent />}
        />
      </Routes>
    </Router>
  );
}

export default App;

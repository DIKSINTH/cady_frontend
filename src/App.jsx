import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ViewAboutUs from "./pages/AboutUs/ViewAboutUs.jsx";
import EditAboutUs from "./pages/AboutUs/EditAboutUs.jsx";

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
        {/* Redirect to admin login */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Login */}
        <Route path="/admin" element={<LoginPage />} />

        {/* Dashboard main */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* About Us - View Page */}
        <Route path="/dashboard/about-us" element={<ViewAboutUs />} />

        {/* About Us - Edit Page */}
        <Route path="/dashboard/about-us/edit" element={<EditAboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;

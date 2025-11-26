import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ViewAboutUs from "./pages/AboutUs/ViewAboutUs.jsx";
// import ViewLogos from "./pages/AboutUs/ViewLogos.jsx";

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

        {/* Dashboard main */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* About Us pages */}
        <Route path="/dashboard/about-us" element={<ViewAboutUs />} />
        {/* <Route path="/dashboard/logos" element={<ViewLogos />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

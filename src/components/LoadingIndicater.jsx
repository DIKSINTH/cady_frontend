import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import loadingimg from "../assets/logodesign.png";

function LoadingIndicator() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFade(true);

    const timer = setTimeout(() => {
      setFade(false);
      setTimeout(() => setLoading(false), 500);
    }, 1200);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Logo */}
      <img
        src={loadingimg}
        alt="Loading"
        className="w-28 h-28 mb-6 animate-pulse drop-shadow-xl"
      />

      {/* Loading Text */}
      <p className="text-gray-600 text-sm tracking-widest mb-4">LOADING</p>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-gray-200 rounded overflow-hidden">
        <div className="h-full cady animate-loading-bar" />
      </div>
    </div>
  );
}

export default LoadingIndicator;

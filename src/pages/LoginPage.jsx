import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "success") {
        navigate("/dashboard", { state: { user: data.user } });
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-300 relative overflow-hidden">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-sky-200">
        <h2 className="text-2xl font-bold text-center text-sky-700 mb-3">
          CadyInfotech
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Please log in.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Email ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-400 transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-400 transition"
            />
          </div>

          <Motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg hover:bg-sky-700 transition shadow-md"
          >
            Log In
          </Motion.button>
        </form>
      </div>
    </div>
  );
}

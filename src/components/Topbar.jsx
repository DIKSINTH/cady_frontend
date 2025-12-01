import { FiUser, FiLogOut } from "react-icons/fi";

export default function Topbar({ email }) {
  const logout = () => {
    localStorage.removeItem("adminEmail");
    window.location.href = "/admin";
  };

  return (
    <div className="w-full h-16 bg-white shadow-md fixed top-0 left-0 flex justify-end items-center px-6 z-30">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <FiUser className="text-xl text-blue-600" />
        </div>

        <p className="font-medium text-gray-800">{email}</p>

        <button
          onClick={logout}
          className="text-red-500 flex items-center gap-2"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}

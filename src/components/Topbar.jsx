import { FiUser, FiLogOut } from "react-icons/fi";

export default function Topbar({ email }) {
  return (
    <div className="w-full h-16 bg-white shadow-md flex justify-end items-center px-6 fixed top-0 left-0 z-30">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <FiUser className="text-xl text-blue-600" />
        </div>

        <p className="font-medium text-gray-800">{email}</p>

        <button
          className="ml-4 flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition"
          onClick={() => (window.location.href = "/admin")}
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
}

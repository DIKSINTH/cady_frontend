export default function Footer() {
  return (
    <footer className="w-full bg-white py-4 mt-10 border-t">
      <div className="flex justify-between items-center px-6 text-sm text-gray-600">
        <p>
          © <span className="text-blue-600">Cady Infotech</span>, All Right
          Reserved.
        </p>

        <p>
          Designed By{" "}
          <span className="text-blue-600 font-medium cursor-pointer">
            APS Infotech
          </span>
        </p>
      </div>
    </footer>
  );
}

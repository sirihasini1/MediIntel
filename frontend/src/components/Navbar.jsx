import { FaHeartbeat, FaSignOutAlt } from "react-icons/fa";

function Navbar() {

  const name =
    localStorage.getItem("name") || "User";

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("name");

    window.location.href = "/auth";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">

            <FaHeartbeat className="text-white text-xl" />

          </div>

          <div>

            <h1 className="text-xl font-bold text-slate-800">
              MediIntel AI
            </h1>

            <p className="text-xs text-slate-500">
              Healthcare Intelligence Platform
            </p>

          </div>

        </div>

        {/* Navigation */}

        <div className="hidden md:flex items-center gap-8">

          <span className="text-slate-600 font-medium">
            Dashboard
          </span>

          <span className="text-slate-600 font-medium">
            Prediction
          </span>

          <span className="text-slate-600 font-medium">
            Analytics
          </span>

          <span className="text-slate-600 font-medium">
            History
          </span>

        </div>

        {/* Right Section */}

        <div className="flex items-center gap-4">

          <div className="hidden md:flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">

            <div className="w-2 h-2 bg-green-500 rounded-full"></div>

            System Active

          </div>

          <div className="hidden md:block text-sm font-medium text-slate-700">

            Welcome, {name} 👋

          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
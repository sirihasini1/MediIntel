import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

function AuthHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-700 flex items-center justify-center px-4">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-12 max-w-lg w-full text-center shadow-2xl">

        <div className="flex justify-center mb-6">

          <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center shadow-xl">

            <FaHeartbeat className="text-blue-600 text-5xl" />

          </div>

        </div>

        <h1 className="text-5xl font-bold text-white mb-4">
          MediIntel AI
        </h1>

        <p className="text-cyan-100 text-lg mb-3">
          AI-Powered Healthcare Intelligence Platform
        </p>

        <p className="text-white/80 mb-10">
          Predict • Analyze • Monitor
        </p>

        <div className="space-y-4">

          <Link to="/login">

            <button className="w-full bg-white text-blue-700 font-bold py-4 rounded-2xl hover:scale-105 transition">
              Login
            </button>

          </Link>

          <Link to="/register">

            <button className="w-full border-2 border-white text-white font-bold py-4 rounded-2xl hover:bg-white hover:text-blue-700 transition">
              Register
            </button>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default AuthHome;
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeartForm from "./components/HeartForm";
import PrescriptionUpload from "./components/PrescriptionUpload";
import PrescriptionHistory from "./components/PrescriptionHistory";

import AuthHome from "./pages/AuthHome";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-10 space-y-12">

        {/* Heart Disease Prediction */}
        <section className="bg-white rounded-3xl shadow-xl p-8">
          <HeartForm />
        </section>

        {/* Prescription Intelligence */}
        <section>
          <PrescriptionUpload />
        </section>

        {/* Prescription History */}
        <section>
          <PrescriptionHistory />
        </section>

      </main>

    </div>
  );
}

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/auth" />;
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Landing Authentication Page */}
        <Route
          path="/auth"
          element={<AuthHome />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/auth" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
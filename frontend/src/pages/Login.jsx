import { useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://mediintel-vxvx.onrender.com";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        `${API_URL}/login`,
        formData
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "name",
        response.data.name
      );

      alert("Login Successful");

      window.location.href = "/";

    } catch (error) {

      console.error(
        "Login Error:",
        error
      );

      if (error.response) {

        alert(
          error.response.data.message ||
          "Invalid Credentials"
        );

      } else {

        alert(
          "Backend Server Not Reachable"
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;
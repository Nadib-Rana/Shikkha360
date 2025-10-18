import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/common/Loader"; 

interface LoginResponse {
  user: {
    email: string;
    role: "admin" | "teacher" | "student" | "parent";
  };
  token: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setError("All fields are required");
      setSuccess("");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:5000/auth/login",
        { email, password }
      );

      const { user, token } = response.data;
      setSuccess("Login successful!");
      setError("");

      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);

      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "teacher":
          navigate("/teacher/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        case "parent":
          navigate("/parent/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 relative overflow-hidden">
      {loading ? (
        <Loader />
      ) : (
        <div className="relative z-10 bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl px-10 py-8 w-[400px] animate-float">
          <h2 className="text-3xl font-extrabold text-white text-center mb-6 tracking-wide drop-shadow">
            🔮 Portal Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 text-white">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white/80 text-gray-800 border border-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/80 text-gray-800 border border-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {error && <p className="text-red-300 text-sm font-semibold">{error}</p>}
            {success && <p className="text-green-300 text-sm font-semibold">{success}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 rounded-md shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-sm text-white text-center opacity-80">
            Need help?{" "}
            <span className="underline cursor-pointer hover:text-white">
              Contact admin
            </span>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
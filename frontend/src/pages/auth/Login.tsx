import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const demo = {
    email: "nadib@gamil.com",
    password: "123456",
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email required");
      setSuccess("");
      return;
    }
    if (!password) {
      setError("Password required");
      setSuccess("");
      return;
    }

    if (email === demo.email && password === demo.password) {
      localStorage.setItem("token", "demo-jwt-token");
      setError("");
      setSuccess("Login successful ✅ Redirecting...");
      setTimeout(() => {
        navigate("/student");
      }, 1500); 
    } else {
      setError("Invalid email or password ❌");
      setSuccess("");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-amber-50 text-center shadow-lg py-6 px-8 rounded-md w-96">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-left text-gray-600 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border-2 py-2 px-3 rounded-md text-gray-700 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-left text-gray-600 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border-2 py-2 px-3 rounded-md text-gray-700 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Error & Success */}
          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
          {success && <p className="text-green-600 text-sm font-semibold">{success}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 w-full mt-2 py-2 rounded-md font-bold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

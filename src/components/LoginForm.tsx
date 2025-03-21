import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import InputField from "./InputField";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login({ email, password });
      navigate("/chat");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-700 to-purple-800 p-10 rounded-3xl shadow-2xl w-96 border border-white/30 text-white">
      <h2 className="text-4xl font-extrabold text-center mb-2">Welcome Back</h2>
      <p className="text-gray-200 text-center mb-6">Log in to continue</p>

      {error && <p className="text-red-400 text-center mb-4 animate-pulse">{error}</p>}

      {/* Email Input */}
      <div className="mb-4">
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleLogin();
            }
          }}
        />
      </div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className={`w-full py-3 rounded-lg font-semibold text-lg transition duration-300 ${
          isLoading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 shadow-md shadow-blue-900"
        }`}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default LoginForm;

import React, { useContext } from "react";
import { useAuth } from "../contexts/AuthContext";

const Auth: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password }); // Correctly passing an object with email and password
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      {/* Your login form goes here */}
      <button onClick={() => handleLogin("user@example.com", "password123")}>
        Login
      </button>
    </div>
  );
};

export default Auth;

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation
import api from "../api/axios.js";

const Signup = () => {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Assuming your backend endpoint is /auth/signup
      const res = await api.post("/auth/signup", {
        name,
        email,
        password,
        role,
      });

      // Auto-Login: Save token immediately so they don't have to login again
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", res.data.user.id);

      toast.success("Account created! Redirecting...");

      // Delay slightly to let the toast show, then redirect
      setTimeout(() => {
        if (role === "driver") {
          navigate("/driver-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }, 1000);
    } catch (error) {
      console.log("Signup error", error);
      // Handle "User already exists" or generic errors
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signup Failed. Please try again.");
      }
    }
  };

  return (
    <section className="bg-[#09122C] w-full min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#152860] border-none rounded-xl p-6 sm:p-8 text-center shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Role Selection */}
          <h3 className="text-lg font-medium mb-2 text-white">I am a...</h3>
          <div className="flex justify-center overflow-hidden mb-6">
            <label
              className={`px-5 py-2 text-sm border border-black/20 cursor-pointer select-none rounded-l transition-all ${
                role === "user"
                  ? "bg-green-300 text-black"
                  : "bg-gray-200 text-black/60"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
                className="sr-only"
              />
              User
            </label>

            <label
              className={`px-5 py-2 text-sm border border-black/20 -ml-px cursor-pointer select-none rounded-r transition-all ${
                role === "driver"
                  ? "bg-green-300 text-black"
                  : "bg-gray-200 text-black/60"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="driver"
                checked={role === "driver"}
                onChange={() => setRole("driver")}
                className="sr-only"
              />
              Driver
            </label>
          </div>

          {/* Input Fields */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-white w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-white w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-white w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <h4 className="text-sm text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-green-300">
            Login
          </Link>
        </h4>
      </div>
      <ToastContainer position="top-right" theme="dark" />
    </section>
  );
};

export default Signup;

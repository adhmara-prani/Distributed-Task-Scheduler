import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

const Login = () => {
  const [value, setValue] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user.id);

      if (res.data.user.role === "driver") {
        nav("/driver-dashboard");
      } else nav("/user-dashboard");
    } catch (error) {
      console.log("Frontend connection (login) error", error.stack);
      toast.error("Login Failed, please try again!");
    }
  };
  return (
    <section className="bg-[#09122C] w-full">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#152860] border-none rounded-xl p-6 sm:p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Welcome Back
          </h2>

          {/* SINGLE FORM WRAPPING EVERYTHING */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* 1. ROLE SELECTOR */}
            <h3 className="text-lg font-medium mb-2 text-white">Choose Role</h3>
            <div className="flex justify-center overflow-hidden mb-6">
              <label
                className={`px-5 py-2 text-sm border border-black/20 cursor-pointer select-none rounded-l transition-all ${
                  value === "user"
                    ? "bg-green-300 text-black"
                    : "bg-gray-200 text-black/60"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={value === "user"}
                  onChange={() => setValue("user")}
                  className="sr-only"
                />
                User
              </label>

              <label
                className={`px-5 py-2 text-sm border border-black/20 -ml-px cursor-pointer select-none rounded-r transition-all ${
                  value === "driver"
                    ? "bg-green-300 text-black"
                    : "bg-gray-200 text-black/60"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="driver"
                  checked={value === "driver"}
                  onChange={() => setValue("driver")}
                  className="sr-only"
                />
                Driver
              </label>
            </div>

            {/* 2. INPUT FIELDS */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-white w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-white w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
            >
              Login
            </button>
          </form>

          <h4 className="text-sm text-white mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="underline hover:text-green-500">
              Sign up
            </Link>
          </h4>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};
export default Login;

/*return (
    <div className="login-container" style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", margin: "10px 0", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", margin: "10px 0", padding: "8px" }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
*/

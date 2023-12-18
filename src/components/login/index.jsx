import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { API_URL } from "../../lib/constants";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auction/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);

        if (data && data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user_email", data.email);
          localStorage.setItem("user_name", data.name);
        }
        setSuccess("Login successful.");
        setTimeout(() => {
          navigate({ to: "/" });
        }, 2000);
      } else {
        setError("Invalid credentials. Please check your email and password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Login error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative bg-gray-800 flex flex-col items-center min-h-screen py-1 overflow-hidden ">
        <div className="w-full max-w-xl mt-4 p-5 bg-gray-700 py-10 rounded-xl">
          <h1 className="text-3xl font-normal text-center text-yellow-50">
            Login
          </h1>
          {error && (
            <div className="mt-2 text-center text-red-600">{error}</div>
          )}
          {success && (
            <div className="mt-2 text-center text-green-600">{success}</div>
          )}
          <form className="max-w-sm m-auto mt-6" onSubmit={handleLogin}>
            <div className="py-1 mb-2">
              <input
                type="email"
                placeholder="Email"
                className="block w-full px-4 py-2 mt-2 text-yellow-50 bg-gray-800 border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="py-3 mb-2">
              <input
                type="password"
                placeholder="Password"
                className="block w-full px-4 py-2 mt-2 text-yellow-50 bg-gray-800 border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-center text-white transition-colors duration-200 transform bg-yellow-500 rounded-3xl hover:bg-blue-700 focus:outline-none focus:bg-blue-500"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>
          <a
            href="#"
            className="flex justify-center pt-10 text-xs text-yellow-500 hover:underline"
          >
            Forgot your password?
          </a>
          <p className="mt-8 text-xs font-light text-center text-gray-400">
            Don´t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-yellow-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

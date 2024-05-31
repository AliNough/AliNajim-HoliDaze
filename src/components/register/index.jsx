import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { API_URL } from "../../lib/constants";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
    venueManager: false,
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const navigateToHome = () => {
    setTimeout(() => {
      navigate({ to: "/login" });
    }, 2000);
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    setMessage("");

    if (
      !formData.email.endsWith("@noroff.no") &&
      !formData.email.endsWith("@stud.noroff.no")
    ) {
      setMessage("Email must be from @noroff.no or @stud.noroff.no");
      setIsLoading(false);
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      bio: formData.bio || undefined,
      avatar: formData.avatarUrl
        ? { url: formData.avatarUrl, alt: formData.avatarAlt || "" }
        : undefined,
      banner: formData.bannerUrl
        ? { url: formData.bannerUrl, alt: formData.bannerAlt || "" }
        : undefined,
      venueManager: formData.venueManager,
    };

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
        }
        setMessage("Registration successful! Welcome aboard.");
        navigateToHome();
      } else {
        setMessage("Registration failed. Please try again later.");
      }
    } catch (error) {
      setMessage("Registration failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-gray-800 flex flex-col items-center min-h-screen py-1 overflow-hidden ">
      <div className="w-full max-w-xl mt-4 p-5 bg-gray-700 py-10 rounded-xl">
        <h1 className="text-3xl font-normal text-center text-yellow-50">
          Register
        </h1>
        {message && (
          <p
            className={`text-center ${
              message.includes("failed") || message.includes("Email")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
        <form className="max-w-sm m-auto mt-6">
          <div className="py-1 mb-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-yellow-50 bg-gray-800 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="py-1 mb-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-yellow-50 bg-gray-800 border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="py-3 mb-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-yellow-50 bg-gray-800 border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="py-3 mb-2">
            <textarea
              name="bio"
              placeholder="Bio - Optional"
              value={formData.bio}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-yellow-50 bg-gray-800 border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="py-3 mb-2">
            <input
              type="text"
              name="avatarUrl"
              placeholder="Avatar URL - Optional"
              value={formData.avatarUrl}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-yellow-50 bg-gray-800 border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="py-3 mb-2">
            <input
              type="text"
              name="bannerUrl"
              placeholder="Banner URL - Optional"
              value={formData.bannerUrl}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-yellow-50 bg-gray-800 border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="py-3 mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="venueManager"
                checked={formData.venueManager}
                onChange={handleChange}
                className="text-yellow-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <span className="ml-2 text-yellow-50">I am a venue Manager</span>
            </label>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleRegistration}
              className="w-full px-4 py-2 tracking-wide text-center text-white transition-colors duration-200 transform bg-yellow-500 rounded-3xl hover:bg-blue-700 focus:outline-none focus:bg-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-yellow-500 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;

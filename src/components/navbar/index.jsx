import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    location.reload();
  };

  const isLoggedIn = localStorage.getItem("accessToken");

  return (
    <>
      <nav className="bg-gray-900 sticky inset-0  border-b-blue-500 ">
        <div className="px-10 mx-auto max-w-7xl">
          <div className="flex items-center justify-between  h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-normal text-yellow-100 ">
                BidVista
              </Link>
            </div>
            <div className="hidden space-x-10 lg:flex">
              <Link
                to="/profile"
                className="text-lg text-gray-200 hover:text-blue-500"
              >
                Profile
              </Link>

              {isLoggedIn ? (
                <Link
                  to="/"
                  className="text-lg text-gray-200 hover:text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-lg text-gray-600 hover:text-blue-500"
                >
                  Login
                </Link>
              )}
            </div>

            <div className="lg:hidden">
              <button
                className="text-gray-600 hover:text-blue-500"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="text-red-600 w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`absolute z-30 backdrop-blur-sm bg-slate-300 font-semibold rounded-md  w-full py-5 text-center lg:hidden border-b-blue-500 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 " : "opacity-0 pointer-events-none"
        }`}
      >
        <Link
          to="/"
          className="block p-2 my-2 text-lg text-gray-900 hover:text-blue-500"
          onClick={toggleMobileMenu}
        >
          Home
        </Link>
        <Link
          to="/profile"
          className="block p-2 my-2 text-lg text-gray-900 hover:text-blue-500"
          onClick={toggleMobileMenu}
        >
          Profile
        </Link>

        <Link
          to="/login"
          className="block p-2 my-2 text-lg text-gray-900 hover:text-blue-500"
          onClick={toggleMobileMenu}
        >
          Login
        </Link>
        <Link
          to="/"
          className="block p-2 my-2 text-lg text-gray-900 hover:text-blue-500"
          onClick={handleLogout}
        >
          Logout
        </Link>
      </div>
    </>
  );
}

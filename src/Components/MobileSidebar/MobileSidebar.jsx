import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import UserContext from "../../Context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { showToastMessage } from "../../utils/helpers";

const MobileSidebar = () => {
  const { pathname } = useLocation();
  const {
    auth: { isAuthenticated, user },
  } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [profileOptions, setProfileOptions] = useState(false);

  const handleSidebarToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleProfileOptions = () => {
    setProfileOptions((prev) => !prev);
  };

  const handleLogout = () => {
    axiosInstance
      .post("/auth/logout")
      .then((response) => {
        showToastMessage(response?.data?.message);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        window.location.reload();
      })
      .catch((error) => {
        error;
      });
  };

  return (
    <div className="lg:hidden flex justify-between px-4 py-2 fixed z-50 w-full top-0 bg-white border items-center">
      {/* Hamburger Menu Button */}

      <Link to="/">Kahani</Link>
      <button
        onClick={handleSidebarToggle}
        className="bg-white rounded-xl backdrop-blur-sm border-2 lg:hidden  p-2"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleSidebarToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-16 px-4">
          {/* Logo */}

          <button
            onClick={handleSidebarToggle}
            className="lg:hidden fixed top-3 right-4 z-50 p-2"
          >
            <X size={24} />
          </button>

          <Link
            to="/"
            className="text-xl font-bold mb-8 px-4"
            onClick={() => setIsOpen(false)}
          >
            Kahani
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            {[
              { name: "Home", url: "/" },
              { name: "About", url: "/about-us" },
              { name: "Stories", url: "/stories" },
              { name: "Contact", url: "/contact-us" },
              !isAuthenticated ? { name: "Login", url: "/login" } : null,
            ]
              .filter(Boolean)
              .map((item) => (
                <Link
                  key={item.url}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    pathname === item.url
                      ? "bg-slate-100 font-bold"
                      : "hover:bg-slate-50"
                  }`}
                  to={item.url}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
          </div>

          {/* User Profile Section */}
          {isAuthenticated && (
            <div className="mt-auto mb-8">
              <div className="border-t pt-4">
                <div
                  onClick={handleProfileOptions}
                  className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-slate-50 rounded-md"
                >
                  <p>Hi {user?.firstname || "User"}!</p>
                  <img
                    src="/assets/icons/downarrow.svg"
                    className="w-6 h-6"
                    alt="downarrow"
                  />
                </div>

                {profileOptions && (
                  <div className="mt-2">
                    <Link
                      to="/profile"
                      className="flex gap-2 items-center px-4 py-2 hover:bg-slate-50 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      <img
                        src="/assets/icons/profile.svg"
                        className="w-5 h-5"
                        alt="profile"
                      />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full flex gap-2 items-center px-4 py-2 hover:bg-slate-50 rounded-md"
                    >
                      <img
                        src="/assets/icons/logout.svg"
                        className="w-5 h-5"
                        alt="logout"
                      />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;

import { ClickAwayListener } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../Context/userContext";
import axiosInstance from "../utils/axiosInstance";
import { showToastMessage } from "../utils/helpers";

const Navbar = () => {
  const { pathname } = useLocation();
  const {
    auth: { isAuthenticated, user },
  } = useContext(UserContext);
  console.log("user:", user);

  const [profileOptions, setProfileOptions] = useState(false);

  const handleProfileOptions = () => {
    setProfileOptions((prev) => !prev);
  };

  const handleClickAway = () => {
    setProfileOptions(false);
  };

  const handleLogout = () => {
    axiosInstance
      .post("/auth/logout")
      .then((response) => {
        console.log(response);
        showToastMessage(response?.data?.message);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sm:flex hidden fixed z-50 top-0 left-0 w-full bg-white shadow-md  items-center justify-between py-3 px-10">
      <Link to="/">Kahani.com</Link>

      <div className="flex items-center gap-4">
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
              className={pathname === item.url ? "underline font-bold" : ""}
              to={item.url}
            >
              {item.name}
            </Link>
          ))}

        {isAuthenticated && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="relative">
              <div
                onClick={handleProfileOptions}
                className="flex items-center cursor-pointer"
              >
                <p>Hi {user?.firstname || "User"} !</p>
                <img
                  src="/assets/icons/downarrow.svg"
                  className="w-6 h-6 mt-1"
                  alt="downarrow"
                />
              </div>

              {profileOptions && (
                <div className="absolute right-0 w-40 bg-white border rounded-sm shadow-md mt-2">
                  <Link
                    to="/profile"
                    className="flex gap-2 hover:bg-slate-100 items-center py-3 px-2 cursor-pointer"
                  >
                    <img
                      src="/assets/icons/profile.svg"
                      className="w-5 h-5"
                      alt="profile"
                    />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex gap-2 hover:bg-slate-100 items-center py-3 px-2 cursor-pointer"
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
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
};

export default Navbar;

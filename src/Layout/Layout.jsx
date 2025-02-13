import React, { Children, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Stories";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchStories } from "../features/stories";
import ScrollToTop from "../Components/ScrolltoTop";
import MobileSidebar from "../Components/MobileSidebar/MobileSidebar";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  return (
    <div className=" w-full ">
      <ScrollToTop />
      <Navbar />
      <MobileSidebar />
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

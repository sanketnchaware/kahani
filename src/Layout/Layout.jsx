import React, { Children, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Stories";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../features/stories";
import ScrollToTop from "../Components/ScrolltoTop";
import MobileSidebar from "../Components/MobileSidebar/MobileSidebar";
import LoaderContext from "../Context/loaderContext";
import Loading from "../Components/Loading/Loading";

const Layout = () => {
  const dispatch = useDispatch();
  const { loading } = useContext(LoaderContext);
  console.log("manualLoading:", loading);

  const loadingSlices = useSelector((state) => state.loading);

  const isLoading =
    Object.values(loadingSlices).some((value) => value) || loading;

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  return (
    <div className=" w-full relative">
      {isLoading && <Loading />}
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

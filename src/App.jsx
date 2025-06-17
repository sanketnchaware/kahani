import React from "react";
import Layout from "./Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Pages/Profile";

import Introduction from "./Pages/Introduction";
import Stories from "./Pages/Stories";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Auth from "./Pages/Auth";
import StoryDetails from "./Pages/StoryDetails";
import AuthSuccess from "./Components/AuthSuccess";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route index element={<Introduction />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:id" element={<StoryDetails />} />
          <Route path="/about-us" element={<AboutUs />} />

          <Route path="/contact-us" element={<ContactUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

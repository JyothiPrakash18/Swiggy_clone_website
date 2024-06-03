import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <div class="page_container body_bg_color">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;

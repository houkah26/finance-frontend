import React from "react";

import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";

import "./index.css";

const Layout = () => (
  <div className="layout-container">
    <Header className="layout-header" />
    <div className="layout-main-container">
      <MainContent className="layout-main-content" />
      <Footer className="layout-footer" />
    </div>
  </div>
);

export default Layout;

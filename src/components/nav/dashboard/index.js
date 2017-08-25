import React from "react";
import PropTypes from "prop-types";
import DashboardNavContainer from "./DashboardNavContainer";

import "./index.css";

const DashboardNav = ({ responsiveLimit }) =>
  <DashboardNavContainer className={"dashboard-nav-container"} />;

DashboardNav.propTypes = {
  responsiveLimit: PropTypes.number.isRequired
};

export default DashboardNav;

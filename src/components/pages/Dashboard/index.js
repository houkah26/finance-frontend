import React from "react";
import { Segment } from "semantic-ui-react";
import MediaQuery from "react-responsive";

import NavMenu from "../../nav/dashboard/index";
import Routes from "./Routes";

import "./index.css";

const Dashboard = () => {
  const responsiveLimit = 793;

  const renderResponsiveSegment = () =>
    <MediaQuery minDeviceWidth={responsiveLimit}>
      {matches =>
        matches
          ? <Segment attached="bottom">
              <Routes />
            </Segment>
          : <Segment vertical className="dashboard-content-container">
              <Routes />
            </Segment>}
    </MediaQuery>;

  return (
    <div>
      <NavMenu responsiveLimit={responsiveLimit} />
      {renderResponsiveSegment()}
    </div>
  );
};

export default Dashboard;

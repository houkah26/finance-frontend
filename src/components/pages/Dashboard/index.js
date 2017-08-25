import React from "react";
import { Segment } from "semantic-ui-react";
import MediaQuery from "react-responsive";

import NavMenu from "../../nav/dashboard/index";
import Routes from "./Routes";

import { RESPONSIVE_LIMIT } from "../../../constants";

import "./index.css";

const Dashboard = () =>
  <div className="dashboard-container">
    <NavMenu responsiveLimit={RESPONSIVE_LIMIT} />
    <MediaQuery minWidth={RESPONSIVE_LIMIT}>
      {matches =>
        matches
          ? <Segment attached="bottom">
              <Routes />
            </Segment>
          : <Segment vertical className="dashboard-content-container">
              <Routes />
            </Segment>}
    </MediaQuery>
  </div>;

export default Dashboard;

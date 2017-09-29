import React from "react";
import { Accordion } from "semantic-ui-react";
import NewTabLink from "../../../util/NewTabLink";
// import PropTypes from "prop-types"; !!TO_DO!!

import "./index.css";

// Semantic-UI Accordion
// https://react.semantic-ui.com/modules/accordion#accordion-example-exclusive

const HomePageAccordion = ({ isMobileRes, className = "" }) => {
  // Index's of panels to display by default
  // Display all on large screens, collapse all on mobile
  const defaultActiveIndex = isMobileRes ? [] : [0, 1];

  // Accordion panels
  const technologiesSubPanels = [
    {
      title: {
        content: (
          <span className="Accordion__Heading Accordion__Heading--sub">
            Front-End
          </span>
        ),
        key: "title-21"
      },
      content: {
        content: (
          <ul className="Accordion__List">
            <li>Framework: React</li>
            <li>State management: Redux</li>
            <li>UI: Semantic-UI</li>
            <li>
              Client Side Routing: React-Router (as well as React-Router-Redux)
            </li>
            <li>Form management/validation: Redux Form</li>
            <li>Deployment: Heroku</li>
            <li>Bootstrapped with Create-React-App</li>
          </ul>
        ),
        key: "content-21"
      }
    },
    {
      title: {
        content: (
          <span className="Accordion__Heading Accordion__Heading--sub">
            Back-End
          </span>
        ),
        key: "title-22"
      },
      content: {
        content: (
          <ul className="Accordion__List">
            <li>Language: Node-JS</li>
            <li>Framework: Express</li>
            <li>Database: MongoDB and Mongoose (for express integration)</li>
            <li>Authentication: PassportJS</li>
            <li>Deployment: Heroku</li>
          </ul>
        ),
        key: "content-22"
      }
    }
  ];

  const mainPanels = [
    {
      title: {
        content: <span className="Accordion__Heading">Features</span>,
        key: "title-1"
      },
      content: {
        content: (
          <ul className="Accordion__List">
            <li>User Authentication utilizing JSON Web Tokens</li>
            <li>
              Real time (15 minute delay) stock prices via a Yahoo API from the
              back-end
            </li>
            <li>Buy and sell stocks</li>
            <li>View sortable stock portfolio and transaction history</li>
            <li>Add funds/cash (no real money)</li>
            <li>Time series stock charts, data via Tradier API</li>
            <li>
              User info page which also shows trading performance (net gain)
            </li>
            <li>Responsive layout</li>
            <li>Progressive Web App</li>
          </ul>
        ),
        key: "content-1"
      }
    },
    {
      title: {
        content: <span className="Accordion__Heading">Technologies</span>,
        key: "title-2"
      },
      content: {
        content: (
          <Accordion.Accordion
            panels={technologiesSubPanels}
            defaultActiveIndex={defaultActiveIndex}
            exclusive={isMobileRes}
          />
        ),
        key: "content-2"
      }
    }
  ];

  const sourceCodeLinkPanel = {
    title: {
      content: <span className="Accordion__Heading">Links to Source Code</span>,
      key: "title-3"
    },
    content: {
      content: (
        <ul className="Accordion__List Accordion__List--link">
          <li>
            <NewTabLink url="https://github.com/houkah26/finance-frontend">
              Front-End
            </NewTabLink>
          </li>
          <li>
            <NewTabLink url="https://github.com/houkah26/finance-backend">
              Back-End
            </NewTabLink>
          </li>
        </ul>
      ),
      key: "content-3"
    }
  };

  // Include source code link panels with main panels at mobile-res
  isMobileRes && mainPanels.push(sourceCodeLinkPanel);

  return (
    <Accordion
      className={"Accordion " + className}
      panels={mainPanels}
      defaultActiveIndex={defaultActiveIndex}
      exclusive={isMobileRes}
      fluid
    />
  );
};

export default HomePageAccordion;

import React from "react";
import { Accordion } from "semantic-ui-react";
// import PropTypes from "prop-types"; !!TO_DO!!

// Semantic-UI Accordion
// https://react.semantic-ui.com/modules/accordion#accordion-example-exclusive

// Styles
const accordionHeadingStyle = {
  fontSize: "1.3rem",
  fontWeight: "bold"
};

const accordionSubHeadingStyle = {
  ...accordionHeadingStyle,
  fontSize: "1.1rem"
};

const ulStyle = {
  margin: "0"
};

const HomePageAccordion = ({ isMobileRes }) => {
  // Index's of panels to display by default
  // Display all on large screens, collapse all on mobile
  const defaultActiveIndex = isMobileRes ? [] : [0, 1];

  // Accordion panels
  const technologiesSubPanels = [
    {
      title: {
        content: <span style={accordionSubHeadingStyle}>Front-End</span>,
        key: "title-21"
      },
      content: {
        content: (
          <ul style={ulStyle}>
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
        content: <span style={accordionSubHeadingStyle}>Back-End</span>,
        key: "title-22"
      },
      content: {
        content: (
          <ul style={ulStyle}>
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
        content: <span style={accordionHeadingStyle}>Features</span>,
        key: "title-1"
      },
      content: {
        content: (
          <ul style={ulStyle}>
            <li>User Authentication utilizing JSON Web Tokens</li>
            <li>
              Real time (15 minute delay) stock prices via a Yahoo API from the
              back-end
            </li>
            <li>Buy and sell stocks</li>
            <li>View sortable stock portfolio and transaction history</li>
            <li>Add funds/cash (no real money)</li>
            <li>Time series stock charts, data via Alpha Vantage API</li>
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
        content: <span style={accordionHeadingStyle}>Technologies</span>,
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

  return (
    <Accordion
      panels={mainPanels}
      defaultActiveIndex={defaultActiveIndex}
      exclusive={isMobileRes}
      fluid
    />
  );
};

export default HomePageAccordion;

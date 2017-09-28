import React from "react";
import { Accordion } from "semantic-ui-react";

import NewTabLink from "../../util/NewTabLink";

// Styles
const accordionHeadingStyle = {
  fontSize: "1.3rem",
  fontWeight: "bold"
};

const ulStyle = {
  margin: "0",
  fontSize: "1.1rem"
};

// Accordion panels
const panels = [
  {
    title: {
      content: <span style={accordionHeadingStyle}>Links to Source Code</span>,
      key: "title-1"
    },
    content: {
      content: (
        <ul style={ulStyle}>
          <li style={{ paddingBottom: "1rem" }}>
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
      key: "content-1"
    }
  }
];

const HomePageLinks = () => <Accordion panels={panels} />;

export default HomePageLinks;

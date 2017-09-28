import React from "react";

import NewTabLink from "../util/NewTabLink";

const Footer = ({ className }) => (
  <footer className={className}>
    <span>
      Brought to you by{" "}
      <NewTabLink url="https://github.com/houkah26">Austin Houk </NewTabLink>
    </span>
    <span>
      Code:{" "}
      <NewTabLink url="https://github.com/houkah26/finance-frontend">
        Front-End
      </NewTabLink>{" "}
      |{" "}
      <NewTabLink url="https://github.com/houkah26/finance-backend">
        Back-End
      </NewTabLink>
    </span>
  </footer>
);

export default Footer;

import React from "react";
import { Header } from "semantic-ui-react";

const Footer = () =>
  <div className="footer">
    <Header size="small" textAlign="center">
      Brought to you by{" "}
      <a
        href="https://github.com/houkah26"
        target="_blank"
        rel="noopener noreferrer"
      >
        Austin Houk
      </a>{" "}
      |{" "}
      <a href="https://github.com/houkah26/finance-frontend">
        Front-End Code{" "}
      </a>{" "}
      | <a href="https://github.com/houkah26/finance-backend">Back-End Code</a>
    </Header>
  </div>;

export default Footer;

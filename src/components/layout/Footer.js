import React from "react";
import { Header } from "semantic-ui-react";

const NewTabLink = ({ url, children }) =>
  <a href={url} target="_blank" rel="noopener noreferrer">
    {children}
  </a>;

const Footer = () =>
  <div className="layout-footer">
    <Header size="small" textAlign="center">
      Brought to you by{" "}
      <NewTabLink url="https://github.com/houkah26">Austin Houk</NewTabLink> |{" "}
      <NewTabLink url="https://github.com/houkah26/finance-frontend">
        Front-End Code{" "}
      </NewTabLink>{" "}
      |{" "}
      <NewTabLink url="https://github.com/houkah26/finance-backend">
        Back-End Code
      </NewTabLink>
    </Header>
  </div>;

export default Footer;

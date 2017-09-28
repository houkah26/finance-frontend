import React from "react";

const NewTabLink = ({ url, children }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export default NewTabLink;

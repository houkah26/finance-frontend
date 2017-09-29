import React from "react";

const divStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem 0"
};

const NotFoundPage = () => (
  <div style={divStyle}>
    <h2>Page Not Found</h2>
    <p>I'm sorry, the page you were looking for cannot be found!</p>
  </div>
);

export default NotFoundPage;

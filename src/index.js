import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import App from "./components/app";

const rootEl = document.getElementById("root");

ReactDOM.render(<App />, rootEl);

if (module.hot) {
  module.hot.accept("./components/app", () => {
    ReactDOM.render(<App />, rootEl);
  });
}

registerServiceWorker();

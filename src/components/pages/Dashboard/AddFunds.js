import React from "react";

import AddFundForm from "../../forms/AddFundForm";

const divStyles = {
  maxWidth: "16rem",
  margin: "0 auto",
  padding: "0.8rem"
};

const AddFunds = () => (
  <div style={divStyles} className="add-funds-container">
    <AddFundForm />
  </div>
);

export default AddFunds;

import React from "react";

import AddFundForm from "../../forms/AddFundForm";

const divStyles = {
  maxWidth: "300px",
  margin: "0 auto"
};

const AddFunds = () => (
  <div style={divStyles} className="add-funds-container">
    <AddFundForm />
  </div>
);

export default AddFunds;

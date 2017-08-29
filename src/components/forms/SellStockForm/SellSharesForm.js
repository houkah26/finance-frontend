import React from "react";
import { Form, Message } from "semantic-ui-react";
import PropTypes from "prop-types";

import renderFields from "../components/renderFields";

const StockForm = ({
  containsError,
  onSubmit,
  inputFields,
  isLoading,
  errorMessage
}) =>
  <Form error={containsError} onSubmit={onSubmit}>
    {renderFields(inputFields)}
    <Form.Button loading={isLoading && !containsError}>Sell Stock</Form.Button>
    <Message error content={errorMessage} />
  </Form>;

StockForm.propTypes = {
  containsError: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  inputFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default StockForm;

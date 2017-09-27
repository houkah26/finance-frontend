import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Form, Icon } from "semantic-ui-react";

import { loginUser, clearAuthErrors } from "../../actions/auth";
import renderFields from "./components/renderFields";
import DismissibleMessage from "../message/DismissibleMessage";

// Input fields to render
const inputFields = [
  { name: "username", type: "text" },
  { name: "password", type: "password" }
];

// Form validation for redux-form
const validate = formProps => {
  const errors = {};

  if (!formProps.username) {
    errors.username = "Please enter an username";
  }

  if (!formProps.password) {
    errors.password = "Please enter a password";
  }

  return errors;
};

class Login extends Component {
  componentDidMount() {
    this.props.clearAuthErrors();
  }

  handleFormSubmit = formProps => {
    this.props.loginUser(formProps);
  };

  render() {
    const { handleSubmit, errorMessage, isLoading } = this.props;
    const containsError = errorMessage.length > 0;

    return (
      <Form
        // Controls display of messages with error property
        error={containsError}
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <DismissibleMessage
          header="Welcome!"
          content="For your convenience you may log in to a test account (username: test, password: test) or go ahead and register."
        />
        <DismissibleMessage error header="Error:" content={errorMessage} />
        {renderFields(inputFields)}
        <Form.Button loading={isLoading}>
          <Icon name="sign in" />Login
        </Form.Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage,
    isLoading: state.auth.isRequesting
  };
};

const createForm = reduxForm({
  form: "login",
  validate
});

export default connect(mapStateToProps, { loginUser, clearAuthErrors })(
  createForm(Login)
);

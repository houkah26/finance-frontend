import React from "react";
import LoginForm from "../forms/LoginForm";

const divStyles = {
  maxWidth: "300px",
  margin: "1rem auto 0 auto"
};

const LoginPage = () => (
  <div style={divStyles}>
    <LoginForm />
  </div>
);

export default LoginPage;

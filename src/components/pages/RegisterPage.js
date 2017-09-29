import React from "react";
import RegisterForm from "../forms/RegisterForm";

const divStyles = {
  maxWidth: "400px",
  margin: "1rem auto 0 auto"
};

const RegisterPage = () => (
  <div style={divStyles}>
    <RegisterForm />
  </div>
);

export default RegisterPage;

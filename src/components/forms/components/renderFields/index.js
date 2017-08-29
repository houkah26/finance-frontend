import React from "react";
import { Field } from "redux-form";
import FormField from "./FormField";

const renderFields = inputFields =>
  inputFields.map(field =>
    <Field
      name={field.name}
      type={field.type}
      component={FormField}
      key={field.name}
    />
  );

export default renderFields;

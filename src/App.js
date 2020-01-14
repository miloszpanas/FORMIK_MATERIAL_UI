import React from "react";
import { Formik, Field, useField } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel
} from "@material-ui/core";

// CUSTOM COMPONENT OVER MATERIAL UI COMPONENT
const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

function App() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: true,
          cookies: [],
          yogurt: ""
        }}
        validate={values => {
          const errors = {};

          if (!values.firstName.length) {
            errors.firstName = "this field is required"
          }
          return errors;
        }}
        onSubmit={(data, { setSubmitting }) => {
          setTimeout(() => {
            // setSubmitting needs to be the result of a promise
            // otherwise, it's being set to false automatically,
            // meaning the "true" never gets fired
            setSubmitting(true);
          }, 1000);
          console.log("submit", data);
          setTimeout(() => {
            setSubmitting(false);
          }, 1100);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
            {/* you can use Field provided by Formik to simplify things, like so */}

            {/* TEXT INPUTS, ONE ORIGINAL FROM MATERIAL UI, ONE WITH FORMIK FIELD ============ */}
            <MyTextField
              name="firstName"
              placeholder="first name"
              type="input"
            />
            <br />
            <TextField
              placeholder="last name"
              disabled={isSubmitting}
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {/* SINGLE CHECKBOX WITH LABEL =========== */}
            <FormControlLabel
              control={<Field name="isTall" type="checkbox" as={Checkbox} />}
              label="isTall"
            />
            {/* ARRAY OF CHECKBOXES ============*/}

            <div>cookies:</div>
            <Field
              name="cookies"
              type="checkbox"
              value="chocolate chip"
              as={Checkbox}
            ></Field>
            <Field
              name="cookies"
              type="checkbox"
              value="snickers"
              as={Checkbox}
            ></Field>
            <Field
              name="cookies"
              type="checkbox"
              value="bounty"
              as={Checkbox}
            ></Field>
            <br />
            <div>
              Yogurt
              <br />
              <FormControlLabel
                control={
                  <Field name="yogurt" type="radio" value="peach" as={Radio} />
                }
                label="Peach"
              />
              {/* CUSTOM ELEMENT DEFINED AT THE START OF CODE */}
              <MyRadio
                name="yogurt"
                type="radio"
                value="blueberries"
                label="Blueberries"
              />
              <MyRadio
                name="yogurt"
                type="radio"
                value="strawberry"
                label="Strawberry"
              />
            </div>
            <Button type="submit">Submit</Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;

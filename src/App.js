import React from "react";
import { Formik, Field } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";

function App() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: true,
          cookies: []
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
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
            {/* you can use Field provided by Formik to simplify things, like so */}
            <Field
              name="firstName"
              placeholder="first name"
              type="input"
              as={TextField}
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
            <FormControlLabel
              control={<Field name="isTall" type="checkbox" as={Checkbox} />}
              label="isTall"
            />
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
            <Button type="submit">Submit</Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;

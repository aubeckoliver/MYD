import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "../style/Registration.module.css";
import { useNavigate } from "react-router-dom";

function Registration() {
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post(process.env.REACT_APP_BACKEND_BASE_URL + "/auth", data)
      .then(() => {
        console.log(data);
      });
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          <h1>Registration</h1>
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="Username..."
          />
          <br />
          <br />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="password"
            placeholder="Password..."
          />
          <br />
          <br />
          <button type="submit" className={styles.regiBtn}>
            Sign up!
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;

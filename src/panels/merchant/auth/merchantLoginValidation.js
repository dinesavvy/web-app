import React from "react";
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("This field is required"),
  password: Yup.string().required("This field is required"),
});

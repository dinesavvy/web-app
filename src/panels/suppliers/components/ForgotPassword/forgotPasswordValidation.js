import React from "react";
import * as Yup from "yup";

export const forgotPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter email id"),
});

export const resetPasswordvalidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
import React from "react";
import * as Yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const distributorValidation = Yup.object().shape({
  distributorName: Yup.string().required("Distributor name is required"),
  distributorContactName: Yup.string().required(
    "Distributor contact name is required"
  ),
  distributorPosition: Yup.string().required(
    "Distributor position is required"
  ),
  distributorEmail: Yup.string()
    .matches(emailRegex, "Please enter a valid email address")
    .required("Distributor email is required"),
  distributorContactNumber: Yup.string().required("Phone number is required"),
  // .matches(/^\d{6,}$/, "Phone number must be at least 6 digits"), // Minimum 6 digits
});

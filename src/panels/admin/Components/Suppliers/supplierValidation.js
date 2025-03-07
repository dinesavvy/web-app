import React from "react";
import * as Yup from "yup";

export const supplierValidation = Yup.object().shape({
  supplierName: Yup.string().required("Supplier name is required"),
  supplierContactName: Yup.string().required(
    "Supplier contact name is required"
  ),
  // supplierPosition: Yup.string().required("Supplier position is required"),
  supplierEmail: Yup.string()
    .email("Please enter a valid email address")
    .required("Supplier email is required"),
  // supplierContactNumber: Yup.string().required("Phone number is required"),
});

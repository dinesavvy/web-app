import React from "react";
import * as Yup from "yup";

export const distributorValidation = Yup.object().shape({
  distributorName: Yup.string().required("Distributor name is required"),
  distributorContactName: Yup.string().required(
    "Distributor contact name is required"
  ),
  distributorPosition: Yup.string().required("Distributor position is required"),
  distributorEmail: Yup.string()
      .email("Please enter a valid email address")
      .required("Distributor email is required"),
});

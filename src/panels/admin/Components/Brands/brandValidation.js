import React from "react";
import * as Yup from "yup";

export const brandValidationSchema = Yup.object().shape({
  brandName: Yup.string().required("Brand name is required"),
  SKUs: Yup.array().of(
    Yup.object().shape({
      msrp: Yup.string()
        .required("MSRP is required"),
        // .matches(/^\$?\d+(\.\d{2})?$/, "Enter a valid price"),
      unit: Yup.string().required("Unit is required"),
      sku: Yup.string().required("SKU is required"),
      description: Yup.string().required("Description is required"),
    })
  ),
});

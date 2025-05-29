import React from "react";
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required"),
  description: Yup.string().required("Description is required"),
  requiredIngredients: Yup.string().required("Required Ingredients is required"),
  preparationInstructions: Yup.string().required("Preparation instruction is required"),
});

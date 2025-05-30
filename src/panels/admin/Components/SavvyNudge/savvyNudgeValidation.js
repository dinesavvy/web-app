import React from "react";
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required"),
  description: Yup.string().required("Description is required"),
  requiredIngredients: Yup.string().required("Required Ingredients is required"),
  preparationInstructions: Yup.string().required("Preparation instruction is required"),
  launchDate: Yup.string().required("Launch Date is required"),
//  youtubeUrl:Yup.string().required("Youtube Url is required"),
youtubeUrl: Yup.string()
    .matches(
      /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\.*/i,
      'Enter a valid HTTPS YouTube URL'
    )
    .required('YouTube URL is required'),
});

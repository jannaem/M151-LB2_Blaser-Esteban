import * as yup from "yup";

export const DialogFormValidation = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("A name has to be entered")
    .min(2, "The name has to be at least 2 characters long")
    .max(25, "test"),
});

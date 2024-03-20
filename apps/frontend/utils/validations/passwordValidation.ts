import * as yup from "yup";

export const passwordValidation = yup
  .string()
  .required(" ")
  .matches(/^[^\s]*$/, "Les espaces ne sont pas acceptés")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,
    "Le format ne correspond pas"
  );

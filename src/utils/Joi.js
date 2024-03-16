import Joi from "joi";
import { convertValidation } from "./utils";

export const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(6).max(40).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  message: Joi.string().alphanum().required(),
});

export const contactFormValidation = (state, setErrors) => {
  const { error } = contactSchema.validate(state, {
    abortEarly: false,
  });
  const errors = {};

  if (error) {
    error.details.forEach((error) => {
      const formattedError = convertValidation(error.message);
      errors[error.context.key] = formattedError;
    });
    console.log(errors);
    setErrors(errors);
  }
};

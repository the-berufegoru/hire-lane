import Joi from "joi";

export const emailSchema = Joi.string()
  .trim()
  .email({ tlds: { allow: false } }) // Prevent invalid TLDs
  .required()
  .messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required and cannot be empty.",
    "string.empty": "Email cannot be just spaces or empty.",
  });

import Joi from "joi";

export const createLeadValidation = Joi.object({
  name: Joi.string().trim().required(),

  email: Joi.string().email().required(),

  status: Joi.string()
    .valid("new", "contacted", "qualified", "lost")
    .required(),

  source: Joi.string()
    .valid("website", "instagram", "referral")
    .required(),
});

export const updateLeadValidation = Joi.object({
  name: Joi.string().trim(),

  email: Joi.string().email(),

  status: Joi.string().valid(
    "new",
    "contacted",
    "qualified",
    "lost"
  ),

  source: Joi.string().valid(
    "website",
    "instagram",
    "referral"
  ),
});
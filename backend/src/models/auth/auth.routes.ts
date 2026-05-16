import { Router } from "express";

import {
  registerUser,
  loginUser,
} from "./auth.controller.js";

import validate from "../../middlewares/validate.middleware.js";

import {
  registerValidation,
  loginValidation,
} from "./auth.validation.js";

const router = Router();

router.post(
  "/register",
  validate(registerValidation),
  registerUser
);

router.post(
  "/login",
  validate(loginValidation),
  loginUser
);

export default router;
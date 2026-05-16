import { Router } from "express";

import {
  createLead,
  getLeads,
  deleteLead,
  getSingleLead,
  updateLead,
} from "./lead.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  createLeadValidation,
  updateLeadValidation,
} from "./lead.validation.js";

const router = Router();

router.post("/lead", protect, validate(createLeadValidation), createLead);

router.get("/", protect, getLeads);

router.get("/:id", protect, getSingleLead);

router.patch("/:id", protect, validate(updateLeadValidation), updateLead);

router.delete("/:id", protect, deleteLead);

export default router;

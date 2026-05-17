import { Router } from "express";

import {
  createLead,
  getLeads,
  deleteLead,
  getSingleLead,
  updateLead,
} from "./lead.controller.js";
import isLeadOwner from "../../middlewares/isOwner.js";
import checkRole from "../../middlewares/roleBase.js";
import { protect } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  createLeadValidation,
  updateLeadValidation,
} from "./lead.validation.js";

const router = Router();

router.post("/lead", protect, validate(createLeadValidation), createLead);

router.get("/", protect, checkRole("admin"), getLeads);

router.get("/:id", protect, isLeadOwner, getSingleLead);

router.patch(
  "/:id",
  protect,
  isLeadOwner,
  validate(updateLeadValidation),
  updateLead,
);

router.delete("/:id", protect, isLeadOwner, deleteLead);

export default router;

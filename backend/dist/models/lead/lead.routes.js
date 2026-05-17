import { Router } from "express";
import { createLead, getLeads, deleteLead, getSingleLead, updateLead, } from "./lead.controller.js";
import isLeadOwner from "../../middlewares/isOwner.js";
import { protect } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createLeadValidation, updateLeadValidation, } from "./lead.validation.js";
const router = Router();
router.get("/", protect, getLeads);
router.post("/", protect, validate(createLeadValidation), createLead);
router.get("/:id", protect, isLeadOwner, getSingleLead);
router.patch("/:id", protect, isLeadOwner, validate(updateLeadValidation), updateLead);
router.delete("/:id", protect, isLeadOwner, deleteLead);
export default router;
//# sourceMappingURL=lead.routes.js.map
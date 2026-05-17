import Lead from "../models/lead/lead.model.js";
const isLeadOwner = async (req, res, next) => {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
        res.status(404).json({
            success: false,
            message: "Lead not found",
        });
        return;
    }
    // ADMIN ACCESS
    if (req.user.role === "admin") {
        next();
        return;
    }
    // OWNER ACCESS
    if (lead.createdBy.toString() !== req.user.id) {
        res.status(403).json({
            success: false,
            message: "Access denied",
        });
        return;
    }
    next();
};
export default isLeadOwner;
//# sourceMappingURL=isOwner.js.map
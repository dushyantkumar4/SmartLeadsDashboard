import Lead from "../models/lead/lead.model.js";
const checkRole = (...roles) => async (req, res, next) => {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
        res.status(404).json({
            success: false,
            message: "Lead not found",
        });
        return;
    }
    // ROLE ACCESS
    if (req.user &&
        roles.includes(req.user.role)) {
        next();
        return;
    }
    // OWNER ACCESS
    if (lead.createdBy.toString() !==
        req.user?.id) {
        res.status(403).json({
            success: false,
            message: "Access denied",
        });
        return;
    }
    next();
};
export default checkRole;
//# sourceMappingURL=roleBase.js.map
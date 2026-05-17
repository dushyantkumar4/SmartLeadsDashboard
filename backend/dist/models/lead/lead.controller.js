import Lead from "./lead.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
// CREATE LEAD
export const createLead = asyncHandler(async (req, res) => {
    const { name, email, status, source, } = req.body;
    const leadExist = await Lead.findOne({ email });
    if (leadExist) {
        throw new ApiError(404, "Lead already exist");
    }
    const lead = await Lead.create({
        name,
        email,
        status,
        source,
        createdBy: req.user.id,
    });
    res.status(201).json({
        success: true,
        data: lead,
    });
});
// GET ALL LEADS
export const getLeads = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const { status, source, search, sort, } = req.query;
    const query = {};
    // FILTER STATUS
    if (status) {
        query.status = status;
    }
    // FILTER SOURCE
    if (source) {
        query.source = source;
    }
    // SEARCH
    if (search) {
        query.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                email: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }
    // SORT
    const sortOption = sort === "oldest"
        ? { createdAt: 1 }
        : { createdAt: -1 };
    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
    res.status(200).json({
        success: true,
        pagination: {
            total,
            page,
            totalPages: Math.ceil(total / limit),
        },
        data: leads,
    });
});
// GET SINGLE LEAD
export const getSingleLead = asyncHandler(async (req, res) => {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
        throw new ApiError(404, "Lead not found");
    }
    res.status(200).json({
        success: true,
        data: lead,
    });
});
// UPDATE LEAD
export const updateLead = asyncHandler(async (req, res) => {
    const { name, email, status, source, } = req.body;
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, {
        name,
        email,
        status,
        source,
    }, {
        new: true,
        runValidators: true,
    });
    if (!updatedLead) {
        throw new ApiError(404, "Lead not found");
    }
    res.status(200).json({
        success: true,
        message: "Lead updated successfully",
        data: updatedLead,
    });
});
// DELETE LEAD
export const deleteLead = asyncHandler(async (req, res) => {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) {
        throw new ApiError(404, "Lead not found");
    }
    res.status(200).json({
        success: true,
        message: "Lead deleted successfully",
    });
});
//# sourceMappingURL=lead.controller.js.map
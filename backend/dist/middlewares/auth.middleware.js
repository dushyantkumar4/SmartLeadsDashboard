import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const splitToken = token.split(" ")[1];
        if (!splitToken) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid Token",
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map
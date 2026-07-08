"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const zod_1 = require("zod");
function validate(schema) {
    return (req, _res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                return _res.status(400).json({
                    message: "Validation failed",
                    errors: err.issues.map((e) => ({
                        field: e.path.join("."),
                        message: e.message,
                    })),
                });
            }
            next(err);
        }
    };
}

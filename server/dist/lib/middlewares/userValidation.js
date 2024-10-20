"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.register = (req, res, next) => {
    const newUser = req.body;
    if (Object.keys(newUser).length === 0) {
        res.status(400).json({ message: "User must be passed" });
    }
    if (!newUser.name || !newUser.email || !newUser.password) {
        res.status(400).json({ message: "User Fields are missing, provide all fields." });
    }
    next();
};
UserValidation.login = (req, res, next) => {
    const newUser = req.body;
    if (!newUser.email || !newUser.password) {
        res.status(400).json({ message: "Empty Login fields" });
    }
    next();
};

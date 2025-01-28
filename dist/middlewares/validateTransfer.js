"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTransfer = exports.transferValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.transferValidationRules = [
    (0, express_validator_1.body)('fromAccountNumber')
        .matches(/^\d{10}$/)
        .withMessage('From account number must be a 10-digit number'),
    (0, express_validator_1.body)('toAccountNumber')
        .matches(/^\d{10}$/)
        .withMessage('To account number must be a 10-digit number'),
    (0, express_validator_1.body)('amount')
        .isDecimal()
        .custom((value) => value >= 500)
        .withMessage('Transfer amount must be at least 500'),
];
const validateTransfer = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validateTransfer = validateTransfer;

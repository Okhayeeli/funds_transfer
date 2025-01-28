import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const transferValidationRules = [
  body('fromAccountNumber')
    .matches(/^\d{10}$/)
    .withMessage('From account number must be a 10-digit number'),
  body('toAccountNumber')
    .matches(/^\d{10}$/)
    .withMessage('To account number must be a 10-digit number'),
  body('amount')
    .isDecimal()
    .custom((value: any) => value >= 500)
    .withMessage('Transfer amount must be at least 500'),
];

export const validateTransfer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
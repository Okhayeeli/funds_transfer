import { Request, Response, NextFunction } from 'express';

const recentTransactions = new Map<string, number>();
const COOLDOWN_PERIOD = 2 * 60 * 1000; // 2 minutes in milliseconds

export const checkDuplicateTransaction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fromAccountNumber, toAccountNumber } = req.body;
  const transactionKey = `${fromAccountNumber}->${toAccountNumber}`;
  const currentTime = Date.now();
  const lastTransactionTime = recentTransactions.get(transactionKey);

  if (lastTransactionTime && currentTime - lastTransactionTime < COOLDOWN_PERIOD) {
    return res.status(429).json({
      error: 'Duplicate transaction detected. Please wait 2 minutes before trying again',
    });
  }

  recentTransactions.set(transactionKey, currentTime);
  next();
};
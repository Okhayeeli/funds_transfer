"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicateTransaction = void 0;
const recentTransactions = new Map();
const COOLDOWN_PERIOD = 2 * 60 * 1000; // 2 minutes in milliseconds
const checkDuplicateTransaction = (req, res, next) => {
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
exports.checkDuplicateTransaction = checkDuplicateTransaction;

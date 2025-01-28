"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const AccountService_1 = require("../services/AccountService");
const logger_1 = require("../utils/logger");
class AccountController {
    constructor() {
        this.accountService = new AccountService_1.AccountService();
    }
    transferFunds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fromAccountNumber, toAccountNumber, amount } = req.body;
                yield this.accountService.transferFunds(fromAccountNumber, toAccountNumber, amount);
                return res.status(200).json({ message: 'Transfer successful' });
            }
            catch (error) {
                logger_1.logger.error('Transfer error:', error);
                return res.status(400).json({ error: error.message });
            }
        });
    }
    getBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { accountNumber } = req.query;
                if (typeof accountNumber !== 'string') {
                    return res.status(400).json({ error: 'Invalid account number' });
                }
                const balance = yield this.accountService.getBalance(accountNumber);
                return res.status(200).json({ balance });
            }
            catch (error) {
                logger_1.logger.error('Balance check error:', error);
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.AccountController = AccountController;

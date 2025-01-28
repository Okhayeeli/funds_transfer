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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const Account_1 = __importDefault(require("../model/Account"));
const db_1 = require("../config/db");
const logger_1 = require("../utils/logger");
class AccountService {
    transferFunds(fromAccountNumber, toAccountNumber, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield db_1.sequelize.transaction();
            try {
                const [fromAccount, toAccount] = yield Promise.all([
                    Account_1.default.findOne({
                        where: { accountNumber: fromAccountNumber },
                        transaction: t,
                        lock: true,
                    }),
                    Account_1.default.findOne({
                        where: { accountNumber: toAccountNumber },
                        transaction: t,
                        lock: true,
                    }),
                ]);
                if (!fromAccount || !toAccount) {
                    throw new Error('One or both accounts not found');
                }
                if (fromAccount.balance < amount) {
                    throw new Error('Insufficient funds in source account');
                }
                yield Promise.all([
                    fromAccount.update({ balance: fromAccount.balance - amount }, { transaction: t }),
                    toAccount.update({ balance: toAccount.balance + amount }, { transaction: t }),
                ]);
                yield t.commit();
                logger_1.logger.info(`Transfer of ${amount} from account ${fromAccountNumber} to account ${toAccountNumber} completed successfully`);
            }
            catch (error) {
                yield t.rollback();
                throw error;
            }
        });
    }
    getBalance(accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield Account_1.default.findOne({
                where: { accountNumber },
            });
            if (!account) {
                throw new Error('Account not found');
            }
            return account.balance;
        });
    }
}
exports.AccountService = AccountService;

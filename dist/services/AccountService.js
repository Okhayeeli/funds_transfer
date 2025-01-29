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
const sequelize_1 = require("sequelize");
const Account_1 = __importDefault(require("../model/Account"));
const Transaction_1 = __importDefault(require("../model/Transaction"));
const db_1 = require("../config/db");
const logger_1 = __importDefault(require("../utils/logger"));
const uuid_1 = require("uuid");
class AccountService {
    transferFunds(fromAccountNumber, toAccountNumber, amount, description) {
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
                const reference = (0, uuid_1.v4)();
                yield Transaction_1.default.create({
                    fromAccountId: fromAccount.id,
                    toAccountId: toAccount.id,
                    fromAccountNumber,
                    toAccountNumber,
                    amount,
                    type: 'TRANSFER',
                    status: 'PENDING',
                    reference,
                    description,
                }, { transaction: t });
                yield Promise.all([
                    fromAccount.update({ balance: fromAccount.balance - amount }, { transaction: t }),
                    toAccount.update({ balance: toAccount.balance + amount }, { transaction: t }),
                ]);
                yield Transaction_1.default.update({ status: 'SUCCESS' }, {
                    where: { reference },
                    transaction: t
                });
                yield t.commit();
                logger_1.default.info(`Transfer of ${amount} from account ${fromAccountNumber} to account ${toAccountNumber} completed successfully. Reference: ${reference}`);
            }
            catch (error) {
                yield t.rollback();
                logger_1.default.error(`Transfer failed: ${error.message}`, { fromAccountNumber, toAccountNumber, amount });
                throw error;
            }
        });
    }
    getTransactionHistory(accountNumber_1) {
        return __awaiter(this, arguments, void 0, function* (accountNumber, page = 1, limit = 10) {
            const offset = (page - 1) * limit;
            const transactions = yield Transaction_1.default.findAndCountAll({
                where: {
                    [sequelize_1.Op.or]: [
                        { fromAccountNumber: accountNumber },
                        { toAccountNumber: accountNumber }
                    ]
                },
                order: [['createdAt', 'DESC']],
                limit,
                offset
            });
            return {
                transactions: transactions.rows,
                totalCount: transactions.count,
                currentPage: page,
                totalPages: Math.ceil(transactions.count / limit)
            };
        });
    }
    getBalance(accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield Account_1.default.findOne({
                where: { accountNumber },
                attributes: ['balance']
            });
            if (!account) {
                throw new Error('Account not found');
            }
            return account.balance;
        });
    }
    getAccountDetails(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield Account_1.default.findByPk(accountId);
            if (!account) {
                throw new Error('Account not found');
            }
            return {
                accountNumber: account.accountNumber,
                firstName: account.firstName,
                lastName: account.lastName,
            };
        });
    }
    getTransactionDetails(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield Transaction_1.default.findByPk(transactionId);
            if (!transaction) {
                throw new Error('Transaction not found');
            }
            const [fromAccount, toAccount] = yield Promise.all([
                this.getAccountDetails(transaction.fromAccountId),
                this.getAccountDetails(transaction.toAccountId)
            ]);
            return Object.assign(Object.assign({}, transaction.toJSON()), { fromAccount,
                toAccount });
        });
    }
}
exports.AccountService = AccountService;

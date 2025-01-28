"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
// src/models/Transaction.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Transaction extends sequelize_1.Model {
}
exports.Transaction = Transaction;
Transaction.init({
    fromAccount: { type: sequelize_1.DataTypes.STRING(10), allowNull: false },
    toAccount: { type: sequelize_1.DataTypes.STRING(10), allowNull: false },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 100 }, // Minimum transfer amount is 1
    },
    referenceId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Prevent duplicate transactions
    },
}, { sequelize: db_1.default, modelName: 'Transaction' });
exports.default = Transaction;

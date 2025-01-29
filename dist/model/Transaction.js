"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Transaction extends sequelize_1.Model {
}
Transaction.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    fromAccountId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    toAccountId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    fromAccountNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    toAccountNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    reference: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'transactions',
    timestamps: true,
    updatedAt: false,
});
exports.default = Transaction;

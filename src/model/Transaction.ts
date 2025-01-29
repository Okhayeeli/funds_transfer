import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Transaction extends Model {
  public id!: number;
  public fromAccountId!: number;
  public toAccountId!: number;
  public fromAccountNumber!: string;
  public toAccountNumber!: string;
  public amount!: number;
  public type!: string;
  public status!: string;
  public reference!: string;
  public description?: string;
  public readonly createdAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    fromAccountId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    toAccountId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    fromAccountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    toAccountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'transactions',
    timestamps: true,
    updatedAt: false,
  }
);

export default Transaction;
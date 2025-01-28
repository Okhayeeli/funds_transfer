
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export class Transaction extends Model {
  public id!: number;
  public fromAccount!: string;
  public toAccount!: string;
  public amount!: number;
  public referenceId!: string;
}

Transaction.init(
  {
    fromAccount: { type: DataTypes.STRING(10), allowNull: false },
    toAccount: { type: DataTypes.STRING(10), allowNull: false },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 100 }, 
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
  },
  { sequelize, modelName: 'Transaction' }
);

export default Transaction;

import { Transaction } from 'sequelize';
import Account from '../model/Account';
import { sequelize } from '../config/db';
import {logger} from '../utils/logger';

export class AccountService {
  async transferFunds(
    fromAccountNumber: string,
    toAccountNumber: string,
    amount: number
  ): Promise<void> {
    const t: Transaction = await sequelize.transaction();

    try {
      const [fromAccount, toAccount] = await Promise.all([
        Account.findOne({
          where: { accountNumber: fromAccountNumber },
          transaction: t,
          lock: true,
        }),
        Account.findOne({
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

      await Promise.all([
        fromAccount.update(
          { balance: fromAccount.balance - amount },
          { transaction: t }
        ),
        toAccount.update(
          { balance: toAccount.balance + amount },
          { transaction: t }
        ),
      ]);

      await t.commit();
      logger.info(
        `Transfer of ${amount} from account ${fromAccountNumber} to account ${toAccountNumber} completed successfully`
      );
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getBalance(accountNumber: string): Promise<number> {
    const account = await Account.findOne({
      where: { accountNumber },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    return account.balance;
  }
}
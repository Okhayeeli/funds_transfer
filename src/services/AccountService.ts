import { Transaction as SequelizeTransaction, Op } from 'sequelize';
import Account from '../model/Account';
import Transaction from '../model/Transaction';
import { sequelize } from '../config/db';
import logger from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

export class AccountService {
  async transferFunds(
    fromAccountNumber: string,
    toAccountNumber: string,
    amount: number,
    description?: string
  ): Promise<void> {
    const t: SequelizeTransaction = await sequelize.transaction();

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

      
      const reference = uuidv4();
      await Transaction.create(
        {
          fromAccountId: fromAccount.id,
          toAccountId: toAccount.id,
          fromAccountNumber,
          toAccountNumber,
          amount,
          type: 'TRANSFER',
          status: 'PENDING',
          reference,
          description,
        },
        { transaction: t }
      );

    
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

    
      await Transaction.update(
        { status: 'SUCCESS' },
        { 
          where: { reference },
          transaction: t 
        }
      );

      await t.commit();
      logger.info(
        `Transfer of ${amount} from account ${fromAccountNumber} to account ${toAccountNumber} completed successfully. Reference: ${reference}`
      );
    } catch (error) {
      await t.rollback();
      logger.error(
        `Transfer failed: ${(error as Error).message}`,
        { fromAccountNumber, toAccountNumber, amount }
      );
      throw error;
    }
  }

  async getTransactionHistory(accountNumber: string, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    
    const transactions = await Transaction.findAndCountAll({
      where: {
        [Op.or]: [
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
  }
  async getBalance(accountNumber: string): Promise<number> {
    const account = await Account.findOne({
      where: { accountNumber },
      attributes: ['balance']
    });
  
    if (!account) {
      throw new Error('Account not found');
    }
  
    return account.balance;
  }

  async getAccountDetails(accountId: number) {
    const account = await Account.findByPk(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    return {
      accountNumber: account.accountNumber,
      firstName: account.firstName,
      lastName: account.lastName,
    };
  }

  async getTransactionDetails(transactionId: number) {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const [fromAccount, toAccount] = await Promise.all([
      this.getAccountDetails(transaction.fromAccountId),
      this.getAccountDetails(transaction.toAccountId)
    ]);

    return {
      ...transaction.toJSON(),
      fromAccount,
      toAccount
    };
  }
}
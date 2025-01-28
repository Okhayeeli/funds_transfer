import { Request, Response } from 'express';
import { AccountService } from '../services/AccountService';
import {logger} from '../utils/logger';

export class AccountController {
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
  }

  async transferFunds(req: Request, res: Response): Promise<Response> {
    try {
      const { fromAccountNumber, toAccountNumber, amount } = req.body;
      await this.accountService.transferFunds(
        fromAccountNumber,
        toAccountNumber,
        amount
      );
      return res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
      logger.error('Transfer error:', error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async getBalance(req: Request, res: Response): Promise<Response> {
    try {
      const { accountNumber } = req.query;
      if (typeof accountNumber !== 'string') {
        return res.status(400).json({ error: 'Invalid account number' });
      }
      const balance = await this.accountService.getBalance(accountNumber);
      return res.status(200).json({ balance });
    } catch (error) {
      logger.error('Balance check error:', error);
      return res.status(400).json({ error: error.message });
    }
  }
}
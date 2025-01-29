import { Request, Response } from 'express';
import { AccountService } from '../services/AccountService';
import logger from '../utils/logger';

export class AccountController {
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
  }

  async transferFunds(req: Request, res: Response): Promise<Response> {
    try {
      const { fromAccountNumber, toAccountNumber, amount, description } = req.body;
      await this.accountService.transferFunds(
        fromAccountNumber,
        toAccountNumber,
        amount,
        description
      );
      return res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
      logger.error('Transfer error:', error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async getTransactionHistory(req: Request, res: Response): Promise<Response> {
    try {
      const { accountNumber } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const history = await this.accountService.getTransactionHistory(
        accountNumber,
        page,
        limit
      );

      return res.status(200).json(history);
    } catch (error) {
      logger.error('Transaction history error:', error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async getBalance(req: Request, res: Response): Promise<Response> {
    try {
      const { accountNumber } = req.params;
      const balance = await this.accountService.getBalance(accountNumber);
      return res.status(200).json({ balance });
    } catch (error) {
      logger.error('Balance check error:', error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async getTransactionDetails(req: Request, res: Response): Promise<Response> {
    try {
      const { transactionId } = req.params;
      const details = await this.accountService.getTransactionDetails(
        parseInt(transactionId)
      );
      return res.status(200).json(details);
    } catch (error) {
      logger.error('Transaction details error:', error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
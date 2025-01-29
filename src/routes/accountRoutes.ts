import { Router, Request, Response } from 'express';
import { AccountController } from '../controllers/AccountController';
import { transferValidationRules, validateTransfer } from '../middlewares/validateTransfer';
import { checkDuplicateTransaction } from '../middlewares/duplicateTransactionCheck';

const router = Router();
const accountController = new AccountController();

router.post(
  '/transfer',
  transferValidationRules,
  validateTransfer,
  checkDuplicateTransaction,
  (req, res) => accountController.transferFunds(req, res)
);

router.get('/balance', (req, res) => accountController.getBalance(req, res));

router.get(
  '/transactions/:accountNumber',
  (req, res) => accountController.getTransactionHistory(req, res)
);

router.get(
  '/transactions/details/:transactionId',
  (req: Request, res: Response) => accountController.getTransactionDetails(req, res)
);

export default router;
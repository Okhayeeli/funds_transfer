import { Router } from 'express';
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

router.get('/balance', async (req, res) => await accountController.getBalance(req, res));

export default router;

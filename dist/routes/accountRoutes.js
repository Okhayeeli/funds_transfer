"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AccountController_1 = require("../controllers/AccountController");
const validateTransfer_1 = require("../middlewares/validateTransfer");
const duplicateTransactionCheck_1 = require("../middlewares/duplicateTransactionCheck");
const router = (0, express_1.Router)();
const accountController = new AccountController_1.AccountController();
router.post('/transfer', validateTransfer_1.transferValidationRules, validateTransfer_1.validateTransfer, duplicateTransactionCheck_1.checkDuplicateTransaction, (req, res) => accountController.transferFunds(req, res));
router.get('/balance', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield accountController.getBalance(req, res); }));
exports.default = router;

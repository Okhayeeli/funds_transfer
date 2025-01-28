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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const db_1 = require("./config/db");
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/accounts', accountRoutes_1.default);
const PORT = process.env.PORT || 3000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.sequelize.authenticate();
            logger_1.default.info('Database connection established successfully.');
            yield db_1.sequelize.sync();
            logger_1.default.info('Database synchronized successfully.');
            app.listen(PORT, () => {
                logger_1.default.info(`Server is running on port ${PORT}`);
            });
        }
        catch (error) {
            logger_1.default.error('Unable to start server:', error);
            process.exit(1);
        }
    });
}
startServer();

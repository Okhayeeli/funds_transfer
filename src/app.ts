import express from 'express';
import accountRoutes from './routes/accountRoutes';
import { sequelize } from './config/db';
import logger from './utils/logger';

const app = express();

app.use(express.json());
app.use('/api/accounts', accountRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');
   
    await sequelize.sync();
    logger.info('Database synchronized successfully.');

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();

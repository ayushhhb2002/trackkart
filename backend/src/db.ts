import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: './src/config/.env' });

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql', 
  }
);

export default sequelize;
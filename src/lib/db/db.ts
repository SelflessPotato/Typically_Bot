import env from 'dotenv';
import { Sequelize } from 'sequelize';

env.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLSTORE,
  logging: false,
});
export default sequelize;

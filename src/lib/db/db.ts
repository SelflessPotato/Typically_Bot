import env from 'dotenv';
import { Sequelize } from 'sequelize';

env.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLSTORE,
});
export default sequelize;

import {Sequelize} from "sequelize";
import env from 'dotenv';

env.config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SQLSTORE
});
export default sequelize
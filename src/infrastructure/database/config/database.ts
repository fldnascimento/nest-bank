import 'dotenv/config';
import { Options } from 'sequelize';

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = process.env;

const config: Options = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  port: +DB_PORT,
  dialect: 'mysql',
};

export = config;

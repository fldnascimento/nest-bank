import { Sequelize } from 'sequelize';
import * as config from '@infrastructure/database/config/database';

export default new Sequelize(config);

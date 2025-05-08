import * as pg from 'pg';

import { initModels } from '@/models/init-models';

import { Sequelize } from 'sequelize';
const isProduction = process.env.NODE_ENV === 'production';

let sequelize: Sequelize;

if (isProduction && process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: pg,
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'default_db_name',
    process.env.DB_USER || 'default_user',
    process.env.DB_PASS || 'default_pass',
    {
      dialect: 'postgres',
      dialectModule: pg,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      logging: false,
    }
  );
}

export const models = initModels(sequelize);

export default sequelize;

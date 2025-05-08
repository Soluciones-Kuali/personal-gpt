const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    directory: './src/models',
    port: process.env.DB_PORT,
    lang: 'ts',
    useDefine: true,
    additional: {
      timestamps: false,
    },
  }
);

auto.run();

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: `0.0.0.0`,
    dialect: 'mysql',
    port: process.env.PORT
  }
);

module.exports = sequelize;
const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.BD_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.BD_DATABASE,
  port: process.env.BD_PORT,
  logging: false,
});

module.exports = { db };

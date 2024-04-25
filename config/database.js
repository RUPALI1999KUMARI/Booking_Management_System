const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_CONNECTION_STRING, {}
);

module.exports = sequelize;

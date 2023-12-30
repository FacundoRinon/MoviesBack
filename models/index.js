const { Sequelize, DataTypes } = require("sequelize");

const sequelizeOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_CONNECTION,
  logging: false,
};
if (process.env.DB_CONNECTION === "postgres") {
  sequelizeOptions.dialectModule = require("pg");
}

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  sequelizeOptions,
);

const User = require("./User");
const Movies = require("./Movies");
const MovieUser = require("./MovieUser");
const Score = require("./Score");

User.initModel(sequelize);
Movies.initModel(sequelize);
MovieUser.initModel(sequelize);
Score.initModel(sequelize);

module.exports = {
  sequelize,
  User,
  Movies,
  MovieUser,
  Score,
};

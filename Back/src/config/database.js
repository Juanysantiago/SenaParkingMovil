
const { Sequelize } = require("sequelize");

const envFile =
  process.env.NODE_ENV === "test" ? ".env.test" : ".env";

require("dotenv").config({ path: envFile });

const isProduction = process.env.NODE_ENV === "production";
const useSSL = process.env.DB_SSL === "true";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: Number(process.env.DB_PORT || 3306),

    logging:
      isProduction || process.env.NODE_ENV === "test"
        ? false
        : console.log,

    ...(useSSL && {
      dialectOptions: {
        ssl: {
          minVersion: "TLSv1.2",
          rejectUnauthorized: true
        }
      }
    })
  }
);

module.exports = sequelize;

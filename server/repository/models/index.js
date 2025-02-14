require("dotenv").config();
require('pg').defaults.parseInt8 = true;
const { Sequelize, DataTypes } = require('sequelize');

const database = process.env.PGDATABASE;
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`;
const sequelize = new Sequelize(connectionString);

const User = require('./user')(sequelize, DataTypes);
const Account = require('./account')(sequelize, DataTypes);
const Transfer = require('./transfer')(sequelize, DataTypes);

// Define relationships
User.associate({ Account });
Account.associate({ User, Transfer });
Transfer.associate({ Account });

sequelize.sync({ force: true }).then(() => {
  console.log("Database synced");
});

module.exports = { sequelize, User, Account, Transfer };

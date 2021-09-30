'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js');
const db = {};

let sequelize;
if (env) {
  sequelize = new Sequelize(config.database);

} else {
  sequelize = new Sequelize(config.database.dbname, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: config.database.dialect,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}

db.userRegister = require("./register/userRegister.model.js")(sequelize, Sequelize);
db.adminRegister = require("./register/adminAccess.model.js")(sequelize, Sequelize);
db.userResponce = require("./dashboard/userResponce.model.js")(sequelize, Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;


const development = {
  database: {
    username: process.env.PROD_USER_NAME || 'root',
    password: process.env.PROD_USER_PASSWORD || '',
    database: process.env.PROD_DATABASE || 'incubator',
    host: process.env.PROD_HOST ||'127.0.0.1',
    port: process.env.PORT || 3306,
    dialect: 'mysql',
    operatorsAliases: 0,

  },

  jwtSecret: "incubator",
  passwordSalt: "incubator",
 

};

module.exports = global.process.env.NODE_ENV === 'production' ? production : development;

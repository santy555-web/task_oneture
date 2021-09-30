const express = require("express");
const app = express();
const db = require("./app/models");
var router = require("express").Router();
require('dotenv').config();
var cors = require('cors')

var corsOptions = {
  origin: "http://localhost:4200"
};

const PORT = process.env.PORT || 3000;

console.log("CURRENT PORT "+PORT);

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', require('./app/routes/userRegister.routes'));
app.use('/dashboard', require('./app/routes/userDashboard.routes'));

//app.listen(PORT,'192.168.0.104');

db.sequelize.authenticate().then(() => {
    // app.listen(PORT, '192.168.0.100');
      app.listen(PORT,() => {
       console.log(`listening on: http://localhost:${PORT}`);
      });
});

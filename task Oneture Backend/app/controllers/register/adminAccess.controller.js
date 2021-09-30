const db = require("../../models");
var config = require('../../config/config');
const fs = require('fs');
var jwt = require('jsonwebtoken'); 


const adminRegister = db.adminRegister;
const Op = db.Sequelize.Op;

exports.adminLogin = (req, res) => {
    var userName = req.body.userName;
    var password = req.body.password;
    adminRegister.findOne({where: {userName: userName}}).then(data => {
    
        if(data!=null){
          var DBpassword = data.password;
          var Id = data.id;
          if(DBpassword==password)
          {
            var token = jwt.sign({ Id }, config.jwtSecret, {
              expiresIn: '7d'
            });
            res.status(200).send({
              "status": true,
              "message": "Successfully Login!..",
              "token":token
            });

          }
          else
          {
            res.status(200).send({
              "status": false,
              "message": "Invalid Creditionals"
            });
          }

        }else{

          res.status(200).send({
            "status": "failed",
            "message": "Invalid User ID"
          });
        }

    }).catch(err => {
      res.status(200).send({
        "status": "failed",
        "message": "Something went wrong , Please try again"+err
      });
    });
};

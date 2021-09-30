const db = require("../../models");
var config = require('../../config/config');
var jwt = require('jsonwebtoken');
const fs = require('fs');


const userRegister = db.userRegister;
const idCounter = db.idCounter;
const Op = db.Sequelize.Op;


exports.userLogin = (req, res) => {

    var phoneNo = req.body.phoneNo;
   
    userRegister.findOne({where: {phoneNo: phoneNo}}).then(data => {
         
       console.log("DATA ", data);
       if(data!=null){

         var DBpassword = data.password;
         var userPassword = req.body.password;
         console.log(data.userID);
         var userID = data.userID;
         var sha1 = require('sha1');
         var md5 = require('md5');

         var hash = sha1(md5(config.passwordSalt+userPassword));
         if(DBpassword === hash){

            var token = jwt.sign({ userID }, config.jwtSecret, {
                  expiresIn: '7d'
            });

            res.status(200).send({
                "status": "success",
                "message": "Successfully Login",
                "userID": data.userID,
                "token": token
            });

         }else{

           res.status(200).send({
             "status": "failed",
             "message": "Invalid Password"
           });
         }

      }else{

        res.status(200).send({
          "status": "failed",
          "message": "Account Not found Please Register."
        });
      }

    }).catch(err => {
      res.status(200).send({
        "status": "failed",
        "message": "Something went wrong , Please try again 1"
      });
    });
};

const getThumbnailImage = async function(productID,userID,imageCategory) {

   return thumbnailImage = sellerStoreImages.findOne({where: {
     productID: productID,
     userID: userID,
     imageCategory: imageCategory
   }}).then(data => {

     if(data!=null){
       return data.imageName;
     }else{
       return false;
     }
   });
}

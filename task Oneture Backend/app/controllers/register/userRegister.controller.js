const db = require("../../models");
var jwt = require('jsonwebtoken');
var config = require('../../config/config');
const crypto = require("crypto");
var moment = require('moment');
const fs = require('fs');


var ACCESS_KEY_ID = 'AKIAW4K4OV6O4TID7PMV';
var SECRET_ACCESS_KEY = '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';
var AWS_REGION = 'me-south-1';
var S3_BUCKET = 'the-goldme-bucket';

const userRegister = db.userRegister;
const idCounter = db.idCounter;
const Op = db.Sequelize.Op;


exports.register = (req, res) => {

      var phoneNo = req.body.phoneNo;
      userRegister.findOne({where: {phoneNo: phoneNo}}).then(data => {

        if(data!=null){

          res.status(200).send({
            "status": "failed",
            "message": "Account already exist Please do Login"
          });

        }else{

          (async() => {

             let userIdCount = await generateUserID();
             if(userIdCount!=false){

                   var password = req.body.password;

                   var sha1 = require('sha1');
                   var md5 = require('md5');

                   var hash = sha1(md5(config.passwordSalt+password));

                   var currentDateTime = moment().format('ss');
                   var randomNum = Math.floor(Math.random() * 90 + 10);
                   var finalUserCount= userIdCount+1;
                   var userID = finalUserCount+currentDateTime;

                   var otpPin = Math.floor(Math.random()*(999-100+1)+1000);
                   var emailPin = Math.floor(Math.random()*(999-100+1)+1000);
                   var email = req.body.email;

                   var token = jwt.sign({ userID }, config.jwtSecret, {
                         expiresIn: '7d'
                   });

                   const registerFormData = {
                     userID: userID,
                     fullName: req.body.fullName,
                     email: req.body.email,
                     emailOtp: emailPin,
                     phoneNo: req.body.phoneNo,
                     password: hash,
                     countryCode: req.body.countryCode,
                     city: req.body.city,
                     currentLocation: req.body.currentLocation,
                     currentLatLong: req.body.currentLatLong,
                     country: req.body.country,
                     otpPin: otpPin
                   };

                   userRegister.create(registerFormData).then(data => {

                       updateIdCounter(finalUserCount);

                       var smsContent = 'Thanks for choosing us . Your one time password is '+otpPin;
                       //sendOTPSms(contactPersonMobile,smsContent);
                       //SendMail(email,emailPin);
                       res.status(200).send({
                           "status": "success",
                           "message" : "",
                           "token": token,
                           "userID" : userID
                       });

                   }).catch(err => {

                         res.status(200).send({
                           "status": "failed",
                           "message": "Something went wrong , Please try again 3"
                         });
                   });

                 }else{

                   res.status(200).send({
                     "status": "failed",
                     "message": "Something went wrong , Please try again 2"
                   });
                 }
          })();
        }
      }).catch(err => {

        res.status(200).send({
          "status": "failed",
          "message": "Something went wrong , Please try again 1"
        });
      });
};

const generateUserID = async function() {

  return idCounter.findOne().then(data => {
       if(data!=null){
         var userCount = data.userID;
         return userCount;
       }else{
         return false;
       }
   });
}

function updateIdCounter(currentCount){

    const userIdCounter = {
      userID: currentCount,
    };
    idCounter.update(userIdCounter, {where: { id: 1 }}).then(num => {
        if (num == 1) {
           console.log("Successfully Counter Updated");
        }else{
           console.log("Something went wrong while updating Counter.");
        }
      })
      .catch(err => {
        console.log("Something went wrong while updating Counter..");
      });
}

async function uploadImages(path,fileName,requestBody){

      var AWS = require('aws-sdk');

      // AWS.config.loadFromPath('./bucket_config.json');

      var randomKey = Math.floor(Math.random()*(999-100+1)+1000);


      var ACCESS_KEY_ID = 'AKIAW4K4OV6O4TID7PMV';
      var SECRET_ACCESS_KEY = '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';
      var AWS_REGION = 'me-south-1';
      var S3_BUCKET = 'the-goldme-bucket';

      AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION });
      var s3Bucket = new AWS.S3();

      const buff = new Buffer(requestBody,'base64');
      const params = {
         Bucket: S3_BUCKET,
         Key:  path+fileName,
         Body: buff,
         ACL: 'public-read',
         ContentEncoding: 'base64',
         ContentType: 'image/png' // required. Notice the back ticks
       }

       s3Bucket.putObject(params, function(err, data){
            if (err) {
               return false;
            } else {
              return true;
              //console.log('successfully uploaded the image! ',data);
            }
       });

}

function sendOTPSms(mobilenumber,message){

   var request = require('request');
   var options = {
     'method': 'POST',
     'url': 'http://www.smscountry.com/SMSCwebservice_Bulk.aspx?User=Thegoldme&passwd=83107271&mobilenumber='+mobilenumber+'&message='+message+'&sid=The Goldme&mtype=N&DR=Y',
     'headers': {
       'Cookie': 'ASP.NET_SessionId=vfutz51ibqbpripks3sbrlay'
     }
   };
   request(options, function (error, response) {
     if (error){
       console.log("SMS ERROR ",error);
     }
    //console.log("SMS RESPONSE ",response.body);
   });
}

function SendMail(storeEmail,emailPin){

  var mailer = require("nodemailer");

  const CLIENT_ID = '1095745451384-fpfqhgtvuck930f0iq9s1tjhh5lg7iq8.apps.googleusercontent.com';
  const CLIENT_SECRET = 'UAUEo0mZFYdLNhp4yO3Smb27';
  const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
  const REFRESH_TOKEN = '1//04jfRbHhZstU1CgYIARAAGAQSNwF-L9IrUJh08Ofn3-Vz3UpFf4XfrHRok6Pxy5SuSU1tha7VjJlvf1Fo-6r2PcbbdMbXstwyfcA';


  var smtpTransport = mailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
        type: 'OAuth2',
        user: 'info@thegoldme.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: 'ya29.a0AfH6SMCoJ4nnuxAmy3gW_QTUUh-LJe0I4EtL4PJE3hA8UgbxnCmdvMxvzungh-_w7-fHc8HpM4-2lOAxDc_bY7o8QdmgVtzyVcLVEH6hnhtWVsiEkcBJ2oSdleDKA7Lyywbph_Z4xevKeU-C6wZYkFWdkiZMDJoI3EXk65ur5BA',
        expires: 1484314697598
  }
 });

  var mail = {
      from: "Gold Me <from@gmail.com>",
      to: storeEmail,
      subject: "Goldme Email Verification",
      text: "Node.js New world for me this is kundan using google smtp",
      html: "Welcome to Goldme , Thanks for choosing us . <br><br>Your one time password is <b>"+emailPin+"</b>"
  }

  smtpTransport.sendMail(mail, function(error, response){
      if(error){
          console.log("Something went wrong");
      }else{
          console.log("Message sent");
      }

      smtpTransport.close();
  });
}

async function insertSellerImage(sellerID,imageCategory,imagesType,imageName){

    const sellerImageStr = {
      userID: sellerID,
      productID: '0',
      storeID: '0',
      imageCategory: imageCategory,
      imagesType: imagesType,
      imageName: imageName
    };

   return sellerStoreImages.create(sellerImageStr)
    .then(data => {
        return true;
    })
    .catch(err => {
        return false;
    });
}

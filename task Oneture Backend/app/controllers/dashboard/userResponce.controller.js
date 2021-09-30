const db = require("../../models");
var jwt = require('jsonwebtoken');
var config = require('../../config/config');
const crypto = require("crypto");
var moment = require('moment');
const fs = require('fs');

const userResponceList = db.userResponce;
const Op = db.Sequelize.Op;

 const getuUserResponceList = (req, res) => {

  userResponceList.findAll().then(data => {
          
         if(data!=null){ 
                  
          (async() => {
          
             let userResponce = data;
                        
                 res.status(200).send({
                   "status": "success",
                    "message":"",
                    "userResponce":userResponce
                        });
                   })();
          
                 }else{
                    res.status(200).send({
                        "status": "Failed!...",
                        "message":"Something went wrong , Please try again!.."
                      });
                 }
             });
  } 


  const getUserResponceListById = (req, res) => {
    var id = req.params.id;
    userResponceList.findAll({where: {id: id}}).then(data => {
         
        if(data!=null){ 
                 
         (async() => {
         
            let userResponce = data;
                       
                res.status(200).send({
                  "status": "success",
                   "userResponce":userResponce
                       });
                  })();
         
                }else{
                   res.status(200).send({
                       "status": "Failed!...",
                       "message":"Something went wrong , Please try again!.."
                     });
                }
            });
 } 


  const updateUserResponceList = (req, res) => {

    var id = req.body.id;

    userResponceList.findOne({where: {id: id}}).then(data => {

        if(data!=null){

           const Str =   {
                 "id" : req.body.id,
                "title": req.body.title,
                 "name": req.body.name, 
                 "address": req.body.address,
                 "gender": req.body.gender, 
                 "dob": req.body.dob,
                 "age": req.body.age,
                 "mobile": req.body.mobile,
                 "personal_email": req.body.personal_email,
                 "official_email": req.body.official_email,
                 "ideaDescription": req.body.ideaDescription,
                 "componyRevenues": req.body.componyRevenues,
                 "teamDescription": req.body.teamDescription,
                 "productDescription": req.body.productDescription,
                 "customerDescription": req.body.customerDescription,
                 "CompetitorsDescription": req.body.CompetitorsDescription,
                 "advantegesDescription": req.body.advantegesDescription,
                 "selfDecision": req.body.selfDecision
            }
            userResponceList.update(Str, {where: { id: id }}).then(num => {

                  res.status(200).send({
                    "status": "success",
                    "message": "userResponce List Updated Successfully"
                  });
              })
              .catch(err => {
                  res.status(200).send({
                    "status": "failed",
                    "message": "Something went wrong , Please try again"
                  });
            });

        }else{

          res.status(200).send({
            "status": "failed",
            "message": "Invalid ID"
          });
        }

    }).catch(err => {
      res.status(200).send({
        "status": "failed",
        "message": err+"Something went wrong , Please try again"
      });
    });
};

const adduserResponceList = (req, res) => {

        (async() => {

                 const ResponceData = {
                   title: req.body.title,
                   name: req.body.name, 
                   address: req.body.address,
                   gender: req.body.gender, 
                   dob: req.body.dob,
                   age: req.body.age,
                   mobile: req.body.mobile,
                   personal_email: req.body.personal_email,
                   official_email: req.body.official_email,
                   ideaDescription: req.body.ideaDescription,
                   componyRevenues: req.body.componyRevenues,
                   teamDescription: req.body.teamDescription,
                   productDescription: req.body.productDescription,
                   customerDescription: req.body.customerDescription,
                   CompetitorsDescription: req.body.CompetitorsDescription,
                   advantegesDescription: req.body.advantegesDescription,
                   selfDecision: req.body.selfDecision
                 };

                 userResponceList.create(ResponceData).then(data => {
                     res.status(200).send({
                         "status": "success",
                         "message" : "user Responce Added Successfully "
                     });
                 }).catch(err => {
                       res.status(200).send({
                         "status": "failed",
                         "message": err+"Something went wrong , Please try again"
                       });
                 });
        })();
  
};

const deletuserResponceList = function(req, res) {
    var id = req.params.id;
    userResponceList.destroy({ where: { id:id } }).then(() => {
     res.status(200).send({
        "status": "Success",
        "message": "Banner Deleted Successfully"
      });
    }).catch((err) => {
     console.log(err);
     res.status(500).send({
        "status": "failed",
        "message": "Something went wrong , Please try again"
      });
    });
   }
    
  module.exports = {
   getuUserResponceList,
   getUserResponceListById,
   updateUserResponceList,
   adduserResponceList,
   deletuserResponceList
  };

  const userRegister = require("../controllers/register/userRegister.controller.js");
  const adminAccessCntlr = require("../controllers/register/adminAccess.controller.js");

  const validation = require("./validation/validation");
  const tokenValidation = require("../auth/verifyToken");

  var router = require("express").Router();
  router.get('/', function(req, res) {
      res.send('Index Page');
  });
  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post("/register",validation.validateRegister,userRegister.register);
  router.post("/login",validation.validateLogin,adminAccessCntlr.adminLogin);
  
  
  module.exports = router;

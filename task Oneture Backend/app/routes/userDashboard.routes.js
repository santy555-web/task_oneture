
 const userResponceCntlr = require("../controllers/dashboard/userResponce.controller.js");
  var router = require("express").Router();
  //app.use('/', router);
  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    router.post('/addUserResponce',userResponceCntlr.adduserResponceList);
    router.get('/getUserResponce',userResponceCntlr.getuUserResponceList);
    router.get('/getUserResponce/:id',userResponceCntlr.getUserResponceListById);
    router.get('/deleteUserResponce/:id',userResponceCntlr.deletuserResponceList);
  module.exports = router;

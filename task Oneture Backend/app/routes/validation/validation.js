
const validateRegister = (req, res,next) => {

    if(!req.body.fullName) {
      return res.status(200).send({
        status: "failed",
        message: 'Please enter full name'
      });
    }

    if(!req.body.phoneNo) {
      return res.status(200).send({
        status: "failed",
        message: 'Please enter phone number'
      });
    }

    if(!req.body.email) {
      return res.status(200).send({
        status: "failed",
        message: 'Please enter email-id'
      });
    }

    if(!req.body.password) {
      return res.status(200).send({
        status: "failed",
        message: 'Please enter password'
      });
    }
    next();
};

const validateLogin = (req, res,next) => {
  console.log("user id",req.body.userName);
    if (!req.body.userName) {
      return res.status(200).send({
        status: "failed",
        message: 'Please enter user Name'
      });
    }

    if (!req.body.password) {
      console.log("password",req.body.password);
      return res.status(200).send({
        status: "failed",
        message: 'Please enter valid password'
      });
    }
    next();
};


module.exports = {
    validateRegister,
    validateLogin,
};

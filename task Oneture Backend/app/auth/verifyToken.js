// get our mongoose model
var jsonWebToken = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config'); // get our config file


exports.isBearerAuthenticated = function isBearerAuthenticated(req, res, next) {
	//console.log(req);
	//console.log(req);
	if(req.headers['authorization']==null && req.headers['x-access-token']==null){

			return res.status(403).send({
			success: "faild",
			message: 'No token provided',
		  });
	}
	var token = req.headers['x-access-token'] || req.headers['authorization'];
	
	if(token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); // Remove Bearer from string
		console.log(token);
    }

	if (token) {
	  jsonWebToken.verify(token, config.jwtSecret, (err, decoded) => {
		if (err) {
		  return res.json({ success: false, message: 'Invalid token' });
		}
		req.decoded = decoded;
		return next();
	  });
	} else {
	  return res.status(403).send({
		success: false,
		message: 'No token provided',
	  });
	}
  };

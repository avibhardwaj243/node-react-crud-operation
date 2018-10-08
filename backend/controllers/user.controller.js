const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Constants = require('../Environment/Constants.js');

exports.index = function(req, res, next){
  res.send('respond with a resource');
};

// Upload New POST ACTION
exports.user_upload = function(req, res, next){
    // req.assert('filename', 'filename is required').notEmpty();
    //
    // var errors = req.validationErrors()
    //
    // if( !errors ) {   //No errors were found.  Passed Validation!
      let imageFile = req.files.file;
    	imageFile.mv(Constants.BACKEND_URL_RELATIVE_PATH + `${req.body.filename}.jpg`, err => {
    		if (err) {
          console.log(err);
    			return res.status(500).send(err);
    		}
    		res.json({ file: `public/${req.body.filename}.jpg` });
    		console.log(res.json);
    	});

    // } else {   //Display errors to user
    //     var error_msg = ''
    //     errors.forEach(function(error) {
    //         error_msg += error.msg + '<br>'
    //     })
    //
    //     req.flash('error', error_msg)
    //     res.render('user/add', {
    //         title: 'Add New User',
    //         name: req.body.filename
    //     })
    // }
};

// user_login New POST ACTION
exports.user_login = function(req, res, next){
//    req.body.username = "test";
//    req.body.password = "123456";
//    console.log(req.body);

    const token = jwt.sign(
        {
            username : req.body.username,
            password : req.body.password,
        }, 
        Constants.SECRET_KEY, 
        {
            expiresIn : "1h"
        }
    );
    res.json({ token: token });
    //console.log(req.json);
    //res.send('respond with a resource');
};
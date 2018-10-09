const jwt = require('jsonwebtoken');
const nJwt = require('njwt');//decode token
var constant = require('../Environment/constant');
const UserModel = require('../models/user.model');
var redis = require('redis').createClient();


exports.index = function (req, res, next) {
    if (req.headers.xtoken != undefined && req.headers.xtoken !== null) {
        var loginTokenKey = constant.LOGIN_TOKEN_KEY_NAME + constant.GLOBAL_SEPRATOR + req.headers.xtoken;
        redis.get(loginTokenKey, function (error, result) {
            if (error) {
                res.send({title: 'Main Page', message: 'Welcome to main page, Please login'});
            } else {
                if (req.headers.xtoken === result) {
                    var decryptSecert = nJwt.verify(req.headers.xtoken, constant.SECRET_KEY, 'HS256');
                    var decryptSecertString = JSON.parse(JSON.stringify(decryptSecert));
                    res.send({title: 'Main Page', message: 'Welcome to main page ' + decryptSecertString.body.customer_name + ', Logout'});
                } else {
                    res.send({title: 'Main Page', message: 'Welcome to main page, Please login'});
                }
            }
        });
    } else {
        res.send({title: 'Main Page', message: 'Welcome to main page, Please login : xtoken missing in header'});
    }
};

// Upload New POST ACTION
exports.user_upload = function(req, res, next){
    // req.assert('filename', 'filename is required').notEmpty();
    //
    // var errors = req.validationErrors()
    //
    // if( !errors ) {   //No errors were found.  Passed Validation!
      let imageFile = req.files.file;
    	imageFile.mv(constant.BACKEND_URL_RELATIVE_PATH + `${req.body.filename}.jpg`, err => {
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
exports.user_login = function (req, res, next) {
    req.getConnection(function (error, conn) {
        var userModelObj = new UserModel(conn);
        var searchWhere = " username = '"+req.body.username+"'";
        var orderByColumn = "id";
        var orderBy = "desc";
        
        var query = 'SELECT * FROM users WHERE ' + searchWhere + ' ORDER BY ' + orderByColumn + ' ' + orderBy + " LIMIT 0,1";
        userModelObj.executeQuery(query, function (err, rows) {
            if (err) {
                res.send({title: 'User List', message : 'Some Error Has occured : ' + err, data: ''});
            } else {
                if(rows === undefined){
                    res.send({title: 'User List', message : 'auth fail : '});
                } else {
                    const token = jwt.sign(
                        {
                            username: req.body.username,
                            customer_name: rows[0].name,
                        },
                        constant.SECRET_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    redis.set(constant.LOGIN_TOKEN_KEY_NAME+constant.GLOBAL_SEPRATOR+token, token);
                    res.send({title: 'User Login', message : 'Welcome '+rows[0].name, token : token});
                }
            }
        });
    });
};


exports.user_logout = function (req, res, next) {
    if (req.headers.xtoken != undefined && req.headers.xtoken !== null) {
        var loginTokenKey = constant.LOGIN_TOKEN_KEY_NAME + constant.GLOBAL_SEPRATOR + req.headers.xtoken;
        redis.del(loginTokenKey);
        res.send({title: 'Main Page', message: 'Logout Succesfully'});
    } else {
        res.send({title: 'Main Page', message: 'xtoken missing in header'});
    }
};

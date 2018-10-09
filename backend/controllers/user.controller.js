const jwt = require('jsonwebtoken');
var constant = require('../Environment/constant');
const UserModel = require('../models/user.model');

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
                            password: req.body.password,
                        },
                        constant.SECRET_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    res.json({token: token});
                }
            }
        });
    });
};
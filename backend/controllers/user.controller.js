const User = require('../models/user.model');

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
    	imageFile.mv(`/var/www/html/node-react-crud-operation/backend/public/${req.body.filename}.jpg`, err => {
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
    console.log(req.body);
    res.json({ file: 'asdas' });
    //console.log(req.json);
    //res.send('respond with a resource');
};
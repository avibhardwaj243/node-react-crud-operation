const Index = require('../models/index.model');

//Simple version, without validation or sanitation
exports.index = function(req, res){
   res.render('index', {title: 'My Node.js Application'})
}

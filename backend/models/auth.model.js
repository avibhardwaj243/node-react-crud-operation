const nJwt = require('njwt');//decode token
var redis = require('redis').createClient();
var constant = require('../Environment/constant');

class AuthModel{
    
    constructor(varKeyToken){
        this.keyToken = varKeyToken;
    }
    
    verifyTokenLoginUser(req, callback){
        redis.get(this.keyToken, function (error, result) {
            var arrReturnMessage = {};
            if (error) {
                arrReturnMessage["message"] = 'Welcome to main page, Please login';
                arrReturnMessage["error"] = error;
                arrReturnMessage["status"] = 0;
                return callback(arrReturnMessage);
            } else {
                if (req.headers.xtoken === result) {
                    var decryptSecert = nJwt.verify(req.headers.xtoken, constant.SECRET_KEY, 'HS256');
                    var decryptSecertString = JSON.parse(JSON.stringify(decryptSecert));                    
                    arrReturnMessage["message"] = 'Welcome to main page ' + decryptSecertString.body.customer_name + ', Logout';
                    arrReturnMessage["error"] = '';
                    arrReturnMessage["token"] = decryptSecertString;
                    arrReturnMessage["status"] = 1;
                    return callback(null, arrReturnMessage);
                } else {
                    arrReturnMessage["message"] = 'Welcome to main page, Please login';
                    arrReturnMessage["error"] = '';
                    arrReturnMessage["status"] = 0;
                    return callback(arrReturnMessage);
                }
            }
        });        
    }
}

module.exports = AuthModel;
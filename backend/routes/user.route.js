const express = require('express');
const router = express.Router();

//Require the Controller

const user_controller = require('../controllers/user.controller');

//CRUD
router.get('/', user_controller.index);//R
router.post('/upload', user_controller.user_upload);//C
router.post('/login', user_controller.user_login);//C

module.exports = router;

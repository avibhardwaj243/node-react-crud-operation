const express = require('express');
const router = express.Router();

//Require the Controller

const user_controller = require('../controllers/user.controller');

router.get('/', user_controller.index);
router.post('/upload', user_controller.user_upload);
router.post('/login', user_controller.user_login);
router.get('/logout', user_controller.user_logout);

module.exports = router;

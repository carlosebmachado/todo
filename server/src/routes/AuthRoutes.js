const express = require('express');
const UserValidation = require('../middlewares/UserValidation');
const AuthController = require('../controller/AuthController');

const router = express.Router();

router.post('/register', UserValidation, AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;

const express = require('express');
const UserController = require('../controller/UserController');
const UserValidation = require('../middlewares/UserValidation');

const router = express.Router();

router.post('/register', UserValidation, UserController.create);
router.post('/login', UserController.create);

module.exports = router;

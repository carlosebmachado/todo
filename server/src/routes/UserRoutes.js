const express = require('express');
const UserController = require('../controller/UserController');
const AuthValidation = require('../middlewares/AuthValidation');

const router = express.Router();

router.put('/:id', AuthValidation, UserController.update);
router.get('/:id', AuthValidation, UserController.show);

module.exports = router;

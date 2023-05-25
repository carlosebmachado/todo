const express = require('express');
const UserController = require('../controller/UserController');

const router = express.Router();

router.put('/:id', UserController.update);
router.get('/:id', UserController.show);

module.exports = router;

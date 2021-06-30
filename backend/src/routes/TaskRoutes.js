import express from 'express';
import TaskConstroller from '../controller/TaskController'

const router = express.Router();
router.post('/task', TaskConstroller.create);

module.exports = router;

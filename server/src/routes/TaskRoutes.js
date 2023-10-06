const express = require('express');
const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');
const AuthValidation = require('../middlewares/AuthValidation');

const router = express.Router();

router.post('/', AuthValidation, TaskValidation, TaskController.create);

router.put('/:id', AuthValidation, TaskValidation, TaskController.update);
router.patch('/:id/:done', AuthValidation, TaskController.done);

router.delete('/:id', AuthValidation, TaskController.delete)

router.get('/:id', AuthValidation, TaskController.show);
router.get('/filter/all', AuthValidation, TaskController.all);
router.get('/filter/late', AuthValidation, TaskController.late);
router.get('/filter/today', AuthValidation, TaskController.today);
router.get('/filter/week', AuthValidation, TaskController.week);
router.get('/filter/month', AuthValidation, TaskController.month);
router.get('/filter/year', AuthValidation, TaskController.year);

module.exports = router;

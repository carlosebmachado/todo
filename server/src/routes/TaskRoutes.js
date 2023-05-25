const express = require('express');
const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

const router = express.Router();

router.post('/', TaskValidation, TaskController.create);

router.put('/:id', TaskValidation, TaskController.update);
router.patch('/:id/:done', TaskController.done);

router.delete('/:id', TaskController.delete)

router.get('/:id', TaskController.show);
router.get('/all', TaskController.all);
router.get('/filter/late', TaskController.late);
router.get('/filter/today', TaskController.today);
router.get('/filter/week', TaskController.week);
router.get('/filter/month', TaskController.month);
router.get('/filter/year', TaskController.year);

module.exports = router;

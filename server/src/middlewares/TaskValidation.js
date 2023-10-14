const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskValidation = async (req, res, next) => {
  const { type, title, when } = req.body;


  if (!type) {
    res.status(400).json({ error: 'missing type' });
    return;
  }

  if (!title) {
    res.status(400).json({ error: 'missing title' });
    return;
  }

  let exists;
  if (when) {

    var query = {
      userId: { '$in': req.userId },
      when: { '$eq': new Date(when) }
    };

    if (req.params.id) {
      query._id = { '$ne': req.params.id };
      exists = await TaskModel.findOne(query);
    } else {
      if (isPast(new Date(when))) {
        res.status(400).json({ error: 'date in the past' });
        return;
      }
      exists = await TaskModel.findOne(query);
    }
  }

  if (exists) {
    res.status(400).json({ error: 'aready exists a task in this date and time' });
    return;
  }

  next();
};

module.exports = TaskValidation;

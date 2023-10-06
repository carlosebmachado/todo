const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskValidation = async (req, res, next) => {
    const { type, title, description, when } = req.body;


    if (!type) {
        res.status(400).json({ error: 'missing type' });
        return;
    }

    if (!title) {
        res.status(400).json({ error: 'missing title' });
        return;
    }

    if (!description) {
        res.status(400).json({ error: 'missing description' });
        return;
    }

    if (!when) {
        res.status(400).json({ error: 'missing date' });
        return;
    }

    let exists;

    if (req.params.id) {
        exists = await TaskModel.findOne({
            '_id': { '$ne': req.params.id },
            'when': { '$eq': new Date(when) },
            'userId': { '$in': req.userId }
        });
    } else {
        if (isPast(new Date(when))) {
            res.status(400).json({ error: 'date in the past' });
            return;
        }
        exists = await TaskModel.findOne({
            'when': { '$eq': new Date(when) },
            'userId': { '$in': req.userId }
        });
    }

    if (exists) {
        res.status(400).json({ error: 'aready exists a task in this date and time' });
        return;
    }

    next();
};

module.exports = TaskValidation;

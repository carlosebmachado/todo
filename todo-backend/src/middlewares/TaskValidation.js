const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskValidation = async (req, res, next) => {
    const { macaddress, type, title, description, when } = req.body;

    if (!macaddress)
        return res.status(400).json({error: 'missing macaddress'});
    else if (!type)
        return res.status(400).json({error: 'missing type'});
    else if (!title)
        return res.status(400).json({error: 'missing title'});
    else if (!description)
        return res.status(400).json({error: 'missing description'});
    else if (!when)
        return res.status(400).json({error: 'missing date'});
    else {
        let exists;
        if (req.params.id) {
            exists = await TaskModel.findOne({
                '_id': {'$ne': req.params.id},
                'when': {'$eq': new Date(when)},
                'macaddress': {'$in': macaddress}
            });
        } else {
            if (isPast(new Date(when)))
                return res.status(400).json({error: 'date in the past'});
            exists = await TaskModel.findOne({
                'when': {'$eq': new Date(when)},
                'macaddress': {'$in': macaddress}
            });
        }
        if (exists)
            return res.status(400).json({error: 'aready exists a task in this date and time'});
        next();
    }
};

module.exports = TaskValidation;

const { ca } = require('date-fns/locale');
const TaskModel = require('../model/TaskModel');
const {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear
} = require('date-fns');

const current = new Date();

class TaskController {

  async create(req, res) {
    const { type, title, description, when } = req.body;

    const task = new TaskModel({ userId: req.userId, type, title, description, when: new Date(when) });

    try {
      task.save();
      res.status(201).json(task.toJSON());
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    await TaskModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async delete(req, res) {
    await TaskModel.deleteOne({ '_id': req.params.id })
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async show(req, res) {
    try {
      const taks = await TaskModel.findById(req.params.id);

      if (!taks) {
        res.status(404).json({ error: 'task not found' });
        return;
      }
      res.status(200).json(taks);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async all(req, res) {
    await TaskModel.find({ userId: { '$in': req.userId } })
      .sort('when')
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async done(req, res) {
    try {
      const task = await TaskModel.findByIdAndUpdate(req.params.id, { 'done': req.params.done }, { useFindAndModify: false, new: true });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async late(req, res) {
    await TaskModel.find({
      'when': { '$lt': current },
      'done': { '$eq': false },
      'userId': { '$in': req.userId }
    })
      .sort('when')
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async today(req, res) {
    await TaskModel.find({
      'userId': { '$in': req.userId },
      'when': { '$gte': startOfDay(current), '$lte': endOfDay(current) }
    })
      .sort('when')
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async week(req, res) {
    await TaskModel.find({
      'userId': { '$in': req.userId },
      'when': { '$gte': startOfWeek(current), '$lte': endOfWeek(current) }
    })
      .sort('when')
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async month(req, res) {
    await TaskModel.find({
      'userId': { '$in': req.userId },
      'when': { '$gte': startOfMonth(current), '$lte': endOfMonth(current) }
    })
      .sort('when')
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async year(req, res) {
    await TaskModel.find({
      'userId': { '$in': req.userId },
      'when': { '$gte': startOfYear(current), '$lte': endOfYear(current) }
    })
      .sort('when')
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }
}

module.exports = new TaskController();

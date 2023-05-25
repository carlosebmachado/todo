const UserModel = require('../model/UserModel');
const SessionController = require('./SessionController');

class UserController {

  async update(req, res) {
    var user = SessionController.checkUser(req.headers['authorization']);
    if (!user) {
      res.status(401).json({ error: 'invalid auth' });
      return;
    }

    await UserModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async show(req, res) {
    var user = SessionController.checkUser(req.headers['authorization']);
    if (!user) {
      res.status(401).json({ error: 'invalid auth' });
      return;
    }

    await UserModel.findById(req.params.id)
      .then(response => {
        if (response)
          return res.status(200).json(response);
        else
          return res.status(404).json({ error: 'task not found' });
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

}

module.exports = new UserController();

const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');
const bcrypt = require('bcrypt');

class AuthController {

  async register(req, res) {
    const { username, password, name } = req.body;

    var hash;
    try {
      hash = await bcrypt.hash(password, 10)
    } catch (err) {
      res.status(500).send(err.message);
      return;
    }

    const user = new UserModel({ username, password: hash, name });

    try {
      await user.save();
      var token = jwt.sign(user._id.toString(), process.env.JWT_SECRET);
      res.status(201).json({ userId: user._id, name, token });
    } catch (error) {
      res.status(500).json(error);
    }

  }

  async login(req, res) {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      res.status(401).json({ error: 'invalid auth' });
      return;
    }

    var samePwd = await bcrypt.compare(password, user.password);

    if (!samePwd) {
      res.status(401).json({ error: 'invalid auth' });
      return;
    }

    try {
      var token = jwt.sign(user._id.toString(), process.env.JWT_SECRET);
      res.status(200).json({ userId: user._id, name: user.name, token });
    } catch (error) {
      res.status(500).json(error);
    }

  }

  async checkUser(authorization) {
    try {
      const token = authorization.split(' ')[1];
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

}

module.exports = new AuthController();
